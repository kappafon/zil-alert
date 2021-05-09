import React, { createContext, useReducer } from 'react';
import { ActionTypeEnum, ReducerState, UserAlertContracts } from '../model/models';
import appReducer from './appReducer';

const initialState: ReducerState = {
    contracts: []
};

interface GlobalContextType {
    contracts: Array<UserAlertContracts>;
    addContract?: (contract: UserAlertContracts) => void;
    editContract?: (contract: UserAlertContracts) => void;
    removeContract?: (id: string) => void;
}

export const GlobalContext = createContext<GlobalContextType>(initialState);

export const GlobalProvider: React.FC = (props) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    const addContract = (contract: UserAlertContracts) => {
        dispatch({
            type: ActionTypeEnum.ADD_CONTRACT,
            payload: contract
        });
    };

    const editContract = (contract: UserAlertContracts) => {
        dispatch({
            type: ActionTypeEnum.EDIT_CONTRACT,
            payload: contract
        });
    };

    const removeContract = (id: string) => {
        dispatch({
            type: ActionTypeEnum.REMOVE_CONTRACT,
            payload: id
        });
    };

    return (
        <GlobalContext.Provider
            value={{
                contracts: state.contracts,
                addContract,
                editContract,
                removeContract
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
};
