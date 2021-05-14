import { useAsyncFn } from 'react-use';
import serviceApi from '../../service/service';

export default function useGetUserContracts() {
    const [state, getUserContractsApi] = useAsyncFn(async () => {
        const response = await serviceApi.getUserContracts({ mode: 'cors', credentials: 'omit' });
        return response;
    }, []);

    return {
        error: state.error,
        loading: state.loading,
        contracts: state.value,
        getUserContractsApi
    };
}
