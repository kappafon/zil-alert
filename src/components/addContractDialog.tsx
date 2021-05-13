import React, { useContext } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab,
    makeStyles,
    useMediaQuery,
    useTheme
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ContractForm from './contractForm';
import { GlobalContext } from '../context/globalState';
import { CreateNewAlertContractRequestDTO } from '../service';
import useAddContract from './hooks/useAddContract';

const useStyles = makeStyles({
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto'
    }
});

const AddContractDialog: React.FC = () => {
    const theme = useTheme();
    const classes = useStyles();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const { addContract } = useContext(GlobalContext);
    const [open, setOpen] = React.useState(false);
    const { createNewAlertContractApi, value, loading, error } = useAddContract();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = async (data: CreateNewAlertContractRequestDTO) => {
        setOpen(false);
        const newContract: CreateNewAlertContractRequestDTO = {
            tokenId: data.tokenId,
            priceTarget: +data.priceTarget,
            targetType: data.targetType,
            trend: data.trend,
            throttling: data.throttling
        };

        const newContractResult = await createNewAlertContractApi(newContract);

        if (addContract) {
            addContract(newContractResult);
        }
    };

    console.log({ value, loading, error });

    return (
        <div>
            <Fab
                color="primary"
                aria-label="add"
                className={classes.fabButton}
                onClick={handleClickOpen}
            >
                <AddIcon />
            </Fab>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{`Add Contract`}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Add a contract (condition) that will trigger an alert, on a set interval,
                        every time when the desired token is over/under the target price.
                    </DialogContentText>
                    <ContractForm onAddContractClick={handleConfirm} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button form="contract-form" type="submit" variant="contained" color="primary">
                        Add Contract
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default AddContractDialog;
