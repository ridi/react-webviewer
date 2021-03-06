import React from 'react';
import { connect } from 'react-redux';
import ReaderPageScreen from './screen/HtmlPageScreen';
import ReaderScrollScreen from './screen/HtmlScrollScreen';
import { selectReaderContentFormat, selectReaderSetting } from '../redux/selector';
import PropTypes, { SettingType } from './prop-types';
import { ContentFormat } from '../constants/ContentConstants';
import { ViewType } from '../constants/SettingConstants';
import DOMEvents from '../constants/DOMEventConstants';
import Connector from '../service/connector';
import { addEventListener, removeEventListener } from '../util/EventHandler';
import ReaderImageScrollScreen from './screen/ImageScrollScreen';
import ReaderImagePageScreen from './screen/ImagePageScreen';
import ContentFooter from './footer/ContentFooter';
import EventBus, { Events } from '../event';

class Reader extends React.Component {
  static defaultProps = {
    footer: null,
    contentFooter: null,
    selectable: false,
    annotationable: false,
    annotations: [],
    children: null,
  };

  static propTypes = {
    setting: SettingType,
    footer: PropTypes.node,
    contentFooter: PropTypes.node,
    contentFormat: PropTypes.oneOf(ContentFormat.toList()).isRequired,
    selectable: PropTypes.bool,
    annotationable: PropTypes.bool,
    annotations: PropTypes.array,
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);
    Connector.calculations.hasFooter = !!props.footer;

    this.onUnmount = this.onUnmount.bind(this);
  }

  componentDidMount() {
    EventBus.emit(Events.MOUNTED);
    addEventListener(window, DOMEvents.BEFORE_UNLOAD, this.onUnmount);
  }

  componentWillUnmount() {
    removeEventListener(window, DOMEvents.BEFORE_UNLOAD, this.onUnmount);
    this.onUnmount();
  }

  onUnmount() {
    EventBus.emit(Events.UNMOUNTED);
    // EventBus.completeAll();
  }

  getScreen() {
    const { viewType } = this.props.setting;
    const { contentFormat } = this.props;

    if (viewType === ViewType.SCROLL) {
      if (contentFormat === ContentFormat.HTML) {
        return ReaderScrollScreen;
      }
      return ReaderImageScrollScreen;
    }

    if (contentFormat === ContentFormat.HTML) {
      return ReaderPageScreen;
    }
    return ReaderImagePageScreen;
  }

  render() {
    const {
      footer,
      contentFooter,
      selectable,
      annotationable,
      annotations,
      children,
    } = this.props;

    const props = {
      footer,
      contentFooter,
      selectable,
      annotationable,
      annotations,
    };

    if (contentFooter) {
      props.contentFooter = <ContentFooter content={contentFooter} />;
    }
    const Screen = this.getScreen();
    return <Screen {...props}>{children}</Screen>;
  }
}

const mapStateToProps = state => ({
  setting: selectReaderSetting(state),
  contentFormat: selectReaderContentFormat(state),
});

export default connect(mapStateToProps)(Reader);
