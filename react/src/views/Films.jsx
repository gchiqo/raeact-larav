import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link, useNavigate} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";

let VITE_API_BASE_URL = "http://localhost:8000";

export default function films() {
    const navigate = useNavigate()
    const [films, setFilms] = useState([])
    const [loading, setLoading] = useState(false)
    const {setNotification} = useStateContext();


    useEffect(() => {
        getFilms()
    }, [])
    const getFilms = (category = null) => {
        setLoading(true)
        const payload = {
            category: category,
        }
        axiosClient.post('/films', payload)
            .then(({data}) => {
                setLoading(false)
                setFilms(data.data)
                console.log(data);
            })
            .catch(() => {
                setLoading(false)
                setNotification("racxa veraa kargd")
            })
    }

    const Like = (f) => {
        console.log('ravi', f)
        axiosClient.post('/like/' + f.id)
            .then(({data}) => {
                getFilms()
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
                {!loading &&
                    <div className="top-thing">
                        <button className="left btn-add"><Link to="/add">Add film</Link></button>
                        <div className="categ" onClick={() => getFilms("ანიმე")}>ანიმე</div>
                        <div className="categ" onClick={() => getFilms("დრამა")}>დრამა</div>
                        <div className="categ" onClick={() => getFilms("ფანტასტიკა")}>ფანტასტიკა</div>
                        <div className="categ" onClick={() => getFilms("სათავგადასავლო")}>სათავგადასავლო</div>
                        <div className="categ" onClick={() => getFilms()}>ყველა</div>
                    </div>
                }
                <br/>

                <div className="main-cont">
                {films.map(f => (
                    <div key={f.id} className="sing">
                        <Link to={"/single/" + f.id}>
                            <div>
                                <img src={VITE_API_BASE_URL + "/upload/" + f.image} width="100%" alt=""/>
                            </div>
                        </Link>
                        <table>
                            <tbody>
                            <tr>
                                <td>{f.name}</td>
                                <td>{f.rating}</td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="categ" onClick={() => getFilms(f.category)}>{f.category}</div>
                                </td>
                                <td>
                                    {!!f.liked && <div onClick={() => Like(f)} className="hart">💜</div>}
                                    {!f.liked && <div className="hart" onClick={() => Like(f)}>🤍</div>}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
}




