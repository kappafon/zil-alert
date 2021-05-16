import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Contracts from './pages/contracts';
import Info from './pages/info';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { theme } from './theme';
import { GlobalProvider } from './context/globalState';
import Layout from './components/layout';

interface Props {}

const App: React.FC<Props> = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <GlobalProvider>
                    <Layout>
                        <Route path="/" component={Contracts} exact />
                        <Route path="/info" component={Info} exact />
                    </Layout>
                </GlobalProvider>
            </Router>
        </ThemeProvider>
    );
};

export default App;
