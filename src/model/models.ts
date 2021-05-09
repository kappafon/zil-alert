export enum ActionTypeEnum {
    ADD_CONTRACT = 0,
    EDIT_CONTRACT,
    REMOVE_CONTRACT
}
export interface AddAction {
    type: ActionTypeEnum.ADD_CONTRACT;
    payload: UserAlertContracts;
}

export interface EditAction {
    type: ActionTypeEnum.EDIT_CONTRACT;
    payload: UserAlertContracts;
}

export interface RemoveAction {
    type: ActionTypeEnum.REMOVE_CONTRACT;
    payload: string;
}

export type ContractActions = AddAction | EditAction | RemoveAction;

export interface ReducerState {
    contracts: Array<UserAlertContracts>;
}

// from BE

export interface UserAlertContracts {
    id: string;
    /** user that defined the contract */
    userId: string;
    tokenId: string;
    priceTarget: number;
    targetType: 'exact' | 'percentage';
    trend: 'lower' | 'higher';
    throttling: AlertThrottleEnum;
    isDisabled?: boolean;

    //#region Populated after first trigger
    lastDetected?: Date;
    lastDetectionPrice?: number;
    //#endregion Populated after first trigger
}

export interface GetUserContractsResponseDTO {
    alertContracts: Array<UserAlertContracts>;
}

export interface CreateNewAlertContractRequestDTO {
    tokenId: string;
    priceTarget: number;
    targetType: 'exact' | 'percentage';
    trend: 'lower' | 'higher';
    throttling: AlertThrottleEnum;
}

export interface CreateNewAlertContractResponseDTO {
    id: string;
    tokenId: string;
    priceTarget: number;
    targetType: 'exact' | 'percentage';
    trend: 'lower' | 'higher';
    throttling: AlertThrottleEnum;
}

export enum AlertThrottleEnum {
    once = 'once',
    oncePerHour = 'oncePerHour',
    reccuring = 'recurring'
}
