import * as React from 'react';
import { render } from 'react-dom';
import './css/app.css';
import App from './js/app';

const rootEl = document.getElementById('app');
render(<App />, rootEl);
