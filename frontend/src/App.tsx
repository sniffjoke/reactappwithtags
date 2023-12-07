import React from 'react';
import Layout from "./components/Layout";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import Dashboard from "./pages/Dashboard";
import {observer} from "mobx-react-lite";

function App() {
    const router = createBrowserRouter([
        {
            element: <Layout/>,
            children: [
                {
                    path: '/',
                    element: <Dashboard/>
                },
                {
                    path: '/login',
                    element: <LoginForm/>
                },
                {
                    path: 'register',
                    element: <RegisterForm/>
                }
            ]
        },
    ])
    return (
        <>
            <RouterProvider router={router}/>
        </>
    );
}

export default observer(App);
