import './styles/index.scss';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './components/App';

const initApp = () => {
    ReactDOM.render(
        <App/>,
        document.getElementById('appRootDiv')
    );
};

initApp();