import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { pexelsService } from '../services/pexels.service'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import toys1Image from '../assets/img/toys3.jpg'

export function ToyPreview({ toy, onDelete }) {
    const [toyImageUrl, setToyImageUrl] = useState(toys1Image);

    useEffect(() => {
        async function fetchImage() {
            const imageUrl = await pexelsService.getToyImage(toy.name)
            if (imageUrl) setToyImageUrl(imageUrl)
        }
        fetchImage()
    }, [toy.name])

    const handleDelete = async () => {
        try {
            await onDelete(toy._id)
            showSuccessMsg('Toy successfully deleted!')
        } catch (err) {
            console.error('error deleting: ', err)
            showErrorMsg('Failed to delete the toy')
        }
    }

    return (
        <li className="toy-card">
            <h3>{toy.name}</h3>
            <p>Price: {toy.price}</p>
            <img src={toyImageUrl} alt="Toy Preview" className="toy-image" />
            <div className='toy-card-actions'>
                <Link to={`/toy/${toy._id}`}>
                    <button><i className="fa-solid fa-circle-question"></i></button>
                </Link>
                <Link to={`/toy/edit/${toy._id}`}>
                    <button><i className="fa-solid fa-pen-to-square"></i></button>
                </Link>
                <button onClick={handleDelete}><i className="fa-solid fa-trash-can"></i></button>
            </div>
        </li>
    )
}