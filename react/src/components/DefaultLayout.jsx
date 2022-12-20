import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider";
import {useEffect} from "react";
import axiosClient from "../axios-client.js";


export default function DefaultLayout() {
    const {user, token, notification, setUser, setToken,} = useStateContext();

    if (!token) {
        return <Navigate to={'/login'}/>
    }

    const onLogout = (ev) => {
        ev.preventDefault()
        axiosClient.post('/logout')
            .then(() => {
                setUser({})
                setToken(null);
            })
    }

    useEffect(() => {
        axiosClient.get('/user')
            .then(({data}) => {
                setUser(data)
            })
    }, [])

    return (
        <div id="defaultLayout">
            <div className="content">
                <header>
                    <Link  className="btn-logout" to="/favs">Favorites</Link>
                    <Link  className="btn-logout" to="/films">All</Link>
                    <div>
                        {/*{user.name}*/}
                        <a href="#" onClick={onLogout} className="btn-logout">Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet/>
                </main>
            </div>
            {notification &&
                <div className="notification">
                    {notification}
                </div>
            }
        </div>
    )
}
