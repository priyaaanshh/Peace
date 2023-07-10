import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './Context/authContext';
import { VolumeProvider } from './Context/volumeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthContextProvider>
            <VolumeProvider>
                <App />
            </VolumeProvider>
        </AuthContextProvider>
    </React.StrictMode>
);
