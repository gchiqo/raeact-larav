import {Link, useNavigate, useParams} from "react-router-dom";
import {createRef, useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function FilmForm() {
    const navigate = useNavigate()
    const nameRef = createRef()
    const categoryRef = createRef()
    const ratingRef = createRef()
    const [errors, setErrors] = useState(null)
    const [photo, setPhoto] = useState(null)
    const [avatar, setAvatar] = useState(true)



    const {setNotification} = useStateContext()

    const changeHendaler = (e) => {

        let file = e.target.files[0]
        let reader = new FileReader()
        reader.onload = e => {
            setAvatar(false);
            setPhoto(e.target.result)
        }
        reader.readAsDataURL(file)
    }

    const onSubmit = ev => {
        ev.preventDefault()
        const payload = {
            name: nameRef.current.value,
            category: categoryRef.current.value,
            rating: ratingRef.current.value,
            image: photo,
            // liked:false,
        }
        axiosClient.post('/addFilm', payload)
            .then(({data}) => {
                setNotification('Film was successfully added')
                navigate('/films')
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors)
                }
            })
    }

    return (
        <div>
            <h1>Add Film</h1>
            {errors &&
                <div className="alert">
                    {Object.keys(errors).map(key => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>
            }
            <form onSubmit={onSubmit}>
                <input ref={nameRef} placeholder="Name"/>
                <input ref={categoryRef} placeholder="Category"/>
                <input ref={ratingRef} placeholder="rating" type="number"/>
                <div className="media">
                    <ul className="images_list">
                        <li className="image_item">
                            <div className="image_item-img">
                                <img src={avatar === true ? `/upload/${photo}` : photo} width="117px" height="100px"/>
                            </div>
                        </li>
                        <li className="image_item">
                            <label className="image_item-form--label">Add Image</label>
                            <input type="file" className="image_item-form--input"
                                   onChange={(event) => changeHendaler(event)}/>
                        </li>
                    </ul>
                </div>
                {/*<input value={image} onChange={(e)=>setImage(e.target.value)} placeholder="image" type="file" accept="image/*"/>*/}
                <button className="btn">Save</button>
            </form>

        </div>
    )
}
