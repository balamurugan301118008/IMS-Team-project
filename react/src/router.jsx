import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./views/Login.jsx";
import Signup from "./views/Signup.jsx";
import NotFound from "./views/NotFound.jsx";
import { DefaultLayout, Integrations, InventoryFun, Inviteusers, ReportsDetails, Orders, Settings,LowStocks } from "./components/DefaultLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import Products from "./components/Products.jsx";
import Category from "./components/Category.jsx";
import { Vendors } from "./components/Vendors.jsx";
const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        // children: [
        //     {
        //         path: '/',
        //         element: <Navigate to="/dashboard" />
        //     },
        //     {
        //         path: '/dashboard',
        //         element: <Navigate to="/dashboard" />
        //     },
        // {
        //     path: '/inventory',
        //     element: <InventoryFun />
        // },
        //     // {
        //     //     path: '/integrations',
        //     //     element : <Integrations />
        //     // }
        // ]
    },
    {
        path: '/dashboard',
        element: <DefaultLayout />
    },
    {
        path: '/inventory',
        element: <Products />
    },
    {
        path: '/category',
        element: <Category />
    },
    {
        path: '/integrations',
        element: <Integrations />
    },
    {
        path: "/vendors",
        element: <Vendors />
    },
    {
        path: '/Orders',
        element: <Orders />
    },
    {
        path: '/invite-users',
        element: <Inviteusers />
    },
    {
        path: '/reports',
        element: <ReportsDetails />
    },
    {
        path: '/low-stocks',
        element: <LowStocks />
    },
    {
        path: 'settings',
        element: <Settings />
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
        ]
    },


    {
        path: '*',
        element: <NotFound />
    },

])

export default router;
