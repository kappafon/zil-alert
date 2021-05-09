import { Box, makeStyles } from '@material-ui/core';
import React, { useContext } from 'react';
import SingleContract from '../components/singleContract';
import { GlobalContext } from '../context/globalState';

const useStyles = makeStyles((theme) => ({
    box: {
        marginTop: theme.spacing(10)
    }
}));

const Contracts: React.FC = () => {
    const { contracts } = useContext(GlobalContext);
    const classes = useStyles();

    return (
        <Box className={classes.box}>
            {contracts.map((contract) => {
                return <SingleContract key={contract.id} contract={contract} />;
            })}
        </Box>
    );
};

export default Contracts;
