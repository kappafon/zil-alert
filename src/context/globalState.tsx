import React, { createContext, useEffect, useReducer } from 'react';
import { ActionTypeEnum, ReducerState } from '../model/models';
import { UserAlertContracts } from '../service';
import appReducer from './appReducer';
import useGetUserContracts from './hooks/useGetUserContracts';

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
    const { getUserContractsApi, contracts } = useGetUserContracts();

    // TODO: we need real initialization and status checks!
    useEffect(() => {
        getUserContractsApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (contracts) {
            dispatch({
                type: ActionTypeEnum.SET_INITIAL_USER_CONTRACTS,
                payload: contracts.alertContracts
            });
        }
    }, [contracts]);

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
