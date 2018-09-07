
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css'

import App from './App';

const app = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
)

// https://react.semantic-ui.com/views/card/

ReactDOM.render(app, document.getElementById('root'));
