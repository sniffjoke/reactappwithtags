import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {State} from "./models/state/State";
import Store from "./store/store";

const store = new Store()

export const Context = createContext<State>({
    store
})

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    // <React.StrictMode>
        <Context.Provider value={{
            store
        }}>
            <App/>
        </Context.Provider>
    // </React.StrictMode>
);

