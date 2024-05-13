export declare const types: {
    INCREASE: string;
    DECREASE: string;
    TIMESTAMP: string;
};
export declare const increaseAction: () => {
    type: string;
};
export declare const timestampAction: () => {
    type: string;
};
export declare const recreateCounterStoreRedux: () => Record<string, Function>;
export declare const recreateCounterStoreReduxConnect: () => Record<string, Function>;
