import React from 'react';
import { AppBar, Button, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { APP_TITLE } from '../utils/constants';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'fixed'
    },
    h5: {
        fontWeight: 'bold',
        flexGrow: 1,
        margin: theme.spacing(2),
        textDecoration: 'none',
        '&:focus, &:hover, &:visited, &:link, &:active': {
            color: 'white'
        }
    },
    connectButton: {
        borderRadius: theme.spacing(3)
    }
}));

const Header: React.FC = () => {
    const classes = useStyles();

    return (
        <AppBar
            className={classes.appBar}
            position="fixed"
            color={'default'}
            onClick={() => window.scroll(0, 0)}
        >
            <Toolbar>
                <Typography variant="h5" className={classes.h5} component={Link} to="/">
                    {APP_TITLE}
                </Typography>
                <Button variant="outlined" color="primary" className={classes.connectButton}>
                    Connect Wallet
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
