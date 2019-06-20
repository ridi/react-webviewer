import * as React from 'react';
import { ComicCalculationAction, ComicCalculationState, ComicCurrentAction, ComicCurrentState, ComicSettingAction, ComicSettingState, ComicStatusAction } from './contexts';
export interface ImageData {
    fileSize: number;
    index: number;
    path: string;
    uri: string;
    width?: number;
    height?: number;
}
export interface ComicParsedData {
    type: 'comic';
    images?: Array<ImageData>;
    unzipPath: string;
}
interface ComicServiceProperties {
    dispatchSetting: React.Dispatch<ComicSettingAction>;
    dispatchStatus: React.Dispatch<ComicStatusAction>;
    dispatchCalculation: React.Dispatch<ComicCalculationAction>;
    dispatchCurrent: React.Dispatch<ComicCurrentAction>;
    settingState: ComicSettingState;
    currentState: ComicCurrentState;
    calculationState: ComicCalculationState;
}
export declare class ComicService {
    private static instance;
    private readonly dispatchSetting;
    private readonly dispatchStatus;
    private readonly dispatchCalculation;
    private readonly dispatchCurrent;
    private settingState;
    private currentState;
    private calculationState;
    static init(props: ComicServiceProperties): void;
    static get(): ComicService;
    static updateState({ settingState, currentState, calculationState, }: {
        settingState: ComicSettingState;
        currentState: ComicCurrentState;
        calculationState: ComicCalculationState;
    }): void;
    private constructor();
    private setReadyToRead;
    private restoreCurrent;
    private calculate;
    invalidate: () => Promise<void>;
    private initialCalculate;
    load: (metadata: ComicParsedData) => Promise<void>;
    goToPage: (page: number) => Promise<void>;
    updateSetting: (setting: Partial<ComicSettingState>) => Promise<void>;
    updateCurrent: () => Promise<any>;
}
export {};