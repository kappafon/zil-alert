import { ActionTypeEnum, ContractActions, ReducerState } from '../model/models';
import { UserAlertContracts } from '../service';

export default function appReducer(state: ReducerState, action: ContractActions) {
    switch (action.type) {
        case ActionTypeEnum.ADD_CONTRACT:
            return {
                ...state,
                contracts: [...state.contracts, action.payload]
            };

        case ActionTypeEnum.EDIT_CONTRACT:
            const updatedContract = action.payload;

            const updatedContracts = state.contracts.map((contract: UserAlertContracts) => {
                if (contract.id === updatedContract.id) {
                    return updatedContract;
                }
                return contract;
            });

            return {
                ...state,
                contracts: updatedContracts
            };

        case ActionTypeEnum.REMOVE_CONTRACT:
            return {
                ...state,
                contracts: state.contracts.filter(
                    (contract: UserAlertContracts) => contract.id !== action.payload
                )
            };

        case ActionTypeEnum.SET_INITIAL_USER_CONTRACTS:
            return {
                ...state,
                contracts: action.payload
            };

        default:
            const exhaustiveCheck: never = action;
            return exhaustiveCheck;
    }
}
