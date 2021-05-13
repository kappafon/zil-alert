import { UserAlertContracts } from '../service';

export enum ActionTypeEnum {
    ADD_CONTRACT = 0,
    EDIT_CONTRACT,
    REMOVE_CONTRACT,
    SET_INITIAL_USER_CONTRACTS
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

export interface SetInitialUserContracts {
    type: ActionTypeEnum.SET_INITIAL_USER_CONTRACTS;
    payload: UserAlertContracts[];
}

export type ContractActions = AddAction | EditAction | RemoveAction | SetInitialUserContracts;

export interface ReducerState {
    contracts: Array<UserAlertContracts>;
}
