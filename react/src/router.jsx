import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Signup from "./views/Signup";
import Films from "./views/Films";
import Favs from "./views/Favs";
import Single from "./views/Single";
import FilmForm from "./views/FilmForm.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/films',
                element: <Films />
            },
            {
                path: '/favs',
                element: <Favs />
            },
            {
                path: '/add',
                element: <FilmForm />
            },
            {
                path: '/single/:id',
                element: <Single />
            },
        ]
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

export default router
