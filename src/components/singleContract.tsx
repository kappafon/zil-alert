import { Paper, Box, IconButton, makeStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useContext } from 'react';
import { GlobalContext } from '../context/globalState';
import { UserAlertContracts } from '../model/models';
import EditContractDialog from './editContractDialog';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2)
    },
    box: {
        display: 'flex'
    }
}));

interface Props {
    contract: UserAlertContracts;
}

const SingleContract: React.FC<Props> = ({ contract }) => {
    const { removeContract } = useContext(GlobalContext);
    const classes = useStyles();

    const onRemoveClick = () => {
        removeContract!(contract.id);
    };
    return (
        <Paper key={contract.id} className={classes.paper} elevation={3}>
            <div>{contract.tokenId}</div>
            <div>
                {contract.trend} target is {contract.priceTarget}
            </div>
            {contract.lastDetectionPrice && (
                <div>
                    {contract.lastDetectionPrice} detected on{' '}
                    {contract.lastDetected?.toDateString() ?? 'N/A'}
                </div>
            )}
            <Box className={classes.box}>
                <EditContractDialog id={contract.id} />
                <IconButton color="inherit" aria-label="open drawer" onClick={onRemoveClick}>
                    <DeleteIcon />
                </IconButton>
            </Box>
        </Paper>
    );
};

export default SingleContract;
