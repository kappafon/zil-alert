import { Box, makeStyles } from '@material-ui/core';
import React from 'react';
import Header from './header';
import Navigation from './navigation';

const useStyles = makeStyles((theme) => ({
    box: {
        marginTop: theme.spacing(10)
    }
}));

const Layout: React.FC = ({ children }) => {
    const classes = useStyles();

    return (
        <Box className={classes.box}>
            <Header />
            {children}
            <Navigation />
        </Box>
    );
};

export default Layout;
