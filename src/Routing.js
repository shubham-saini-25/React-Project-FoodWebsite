import React from 'react'
import Home from './pages/Home';
import Category from './pages/Category';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Home />
        ),
    },
    {
        path: "category/:category",
        element: (
            <Category />
        ),
    },
]);

const Routing = () => {
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default Routing