import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Loading from './components/loading/Loading';
import { initialize } from './keycloak';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Loading message="Connecting to Keycloak..." />)
initialize()
    .then(() => { // If No Keycloak Error occurred - Display the App
        root.render(

                <App />

        );
    })
    .catch(() => {
        root.render(

                <p>Could Not Connect To Keycloak.</p>

        );
    });



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
