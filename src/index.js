import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { HelsingProvider } from './contexts/HelsingContext'
import App from './components/App/App'
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <HelsingProvider>
      <App />
    </HelsingProvider>
</BrowserRouter>, document.getElementById('root'));