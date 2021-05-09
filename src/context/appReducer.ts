import { ActionTypeEnum, UserAlertContracts, ContractActions, ReducerState } from '../model/models';

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

        default:
            return state;
    }
}
