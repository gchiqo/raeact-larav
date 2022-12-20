import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";

let VITE_API_BASE_URL = "http://localhost:8000";

export default function films() {
    const [film, setFilm] = useState([])
    const [loading, setLoading] = useState(false)
    const {setNotification} = useStateContext();
    const {id} = useParams()


    useEffect(() => {
        getFilm()
    }, [])
    const getFilm = () => {
        setLoading(true)
        axiosClient.get('/single/' + id)
            .then(({data}) => {
                setLoading(false)
                setFilm(data.data)
                console.log(data);
            })
            .catch(() => {
                setLoading(false)
                setNotification("racxa veraa kargd")
            })
    }

    const Like = (e, f) => {
        console.log('ravi', f)
        axiosClient.post('/like/' + f.id)
            .then(({data}) => {
                getFilm()
                console.log(data);
            })
            .catch(() => {
                setNotification("racxa veraa kargd")
            })
    }

    return (
        <div>
            <div className="card animated fadeInDown">
                {loading &&
                    <p className="text-center loading">
                        Loading...
                    </p>
                }
                <br/>

                <div className="isa">
                    <div>
                        <img src={VITE_API_BASE_URL + "/upload/" + film.image} width="60%" alt=""/>
                    </div>
                    <table>
                        <tbody>
                        <tr>
                            <td>{film.name}</td>
                            <td>{film.rating}</td>
                        </tr>
                        <tr>
                            <td>
                                <div className="categ">{film.category}</div>
                            </td>
                            <td>
                                {!!film.liked && <div onClick={(e) => Like(e, film)} className="hart">💜</div>}
                                {!film.liked && <div className="hart" onClick={(e) => Like(e, film)}>🤍</div>}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}




