import { useAsyncFn } from 'react-use';
import { CreateNewAlertContractRequestDTO } from '../../service';
import serviceApi from '../../service/service';

export default function useAddContract() {
    const [state, createNewAlertContractApi] = useAsyncFn(
        async (data: CreateNewAlertContractRequestDTO) => {
            const response = await serviceApi.createNewAlertContract(data, {
                mode: 'cors',
                credentials: 'omit'
            });
            return response;
        },
        []
    );

    return {
        ...state,
        createNewAlertContractApi
    };
}
