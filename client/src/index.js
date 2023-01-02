import React from 'react'
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';
import App from './App'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { StateContextProvider } from './context'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render (
    <ThirdwebProvider desiredChainId={ChainId.Goerli}>
        <Router>
            <ChakraProvider>
                <StateContextProvider>
            <App />
            </StateContextProvider>
            </ChakraProvider>
        </Router>
    </ThirdwebProvider>
)