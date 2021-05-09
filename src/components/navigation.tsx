import React from 'react';
import { AppBar, Toolbar, IconButton, Box, makeStyles } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import AddContractDialog from './addContractDialog';
import { Link } from 'react-router-dom';
const useStyles = makeStyles({
    appBar: {
        top: 'auto',
        bottom: 0
    }
});

interface Props {}

const Navigation: React.FC<Props> = () => {
    const classes = useStyles();

    return (
        <Box component="nav">
            <AppBar position="fixed" color="default" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        component={Link}
                        to="/info"
                    >
                        <InfoIcon />
                    </IconButton>
                    <AddContractDialog />
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navigation;
