import React, { useContext } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    useMediaQuery
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import ContractForm from './contractForm';
import { GlobalContext } from '../context/globalState';
import { UserAlertContracts, CreateNewAlertContractRequestDTO } from '../model/models';

interface Props {
    id: string;
}

const EditContractDialog: React.FC<Props> = ({ id }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const { editContract, contracts } = useContext(GlobalContext);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = (data: CreateNewAlertContractRequestDTO) => {
        setOpen(false);
        const newContract: UserAlertContracts = {
            id: id,
            userId: 'test',
            tokenId: data.tokenId,
            priceTarget: +data.priceTarget,
            targetType: data.targetType,
            trend: data.trend,
            throttling: data.throttling
        };

        editContract!(newContract);
    };

    const formData: UserAlertContracts | undefined = React.useMemo(() => {
        if (contracts.length > 0) {
            const contract = contracts.find((contract) => {
                return contract.id === id;
            });
            if (contract) {
                return {
                    id: id,
                    userId: 'test',
                    tokenId: contract.tokenId,
                    priceTarget: contract.priceTarget,
                    targetType: contract.targetType,
                    trend: contract.trend,
                    throttling: contract.throttling
                };
            }
        }
        return;
    }, [contracts, id]);

    return (
        <div>
            <IconButton color="inherit" aria-label="open drawer" onClick={handleClickOpen}>
                <EditIcon />
            </IconButton>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="dialog-title"
            >
                <DialogTitle id="dialog-title">Edit Contract</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Update the existing contract (condition) that will trigger an alert, on a
                        set interval, every time when the desired token is over/under the target
                        price.
                    </DialogContentText>
                    <ContractForm onAddContractClick={handleConfirm} defaultData={formData} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button form="contract-form" type="submit" variant="contained" color="primary">
                        Update Contract
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default EditContractDialog;
