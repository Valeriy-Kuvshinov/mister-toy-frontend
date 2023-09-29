import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toyService } from '../services/toy.service.js'
import toysImage from '../assets/img/toys1.jpeg'

export function ToyDetails() {
    const { toyId } = useParams()
    const [toy, setToy] = useState(null)

    useEffect(() => {
        toyService.getById(toyId)
            .then(fetchedToy => setToy(fetchedToy))
            .catch(err => console.error(err))
    }, [toyId])

    if (!toy) return <div>Loading...</div>

    const { name, price, labels, createdAt, inStock } = toy

    return (
        <div className='toy-details-wrapper'>
            <img src={toysImage} />
            <div className="toy-details">
                <div className="toy-header">
                    <h1>{name}</h1>
                    <p className="toy-price">Price: ${price}</p>
                </div>
                <div className='toy-info'>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <p>Omnis culpa deleniti laudantium vitae?</p>
                    <p>Corporis fugit placeat veritatis ratione repellat, eaque repudiandae, fuga perferendis corrupti rerum, maxime cumque dolores numquam suscipit.</p>
                </div>
                <div className="toy-info">
                    <p><span className="label">Labels:</span> {labels.join(', ')}</p>
                    <p><span className="label">Created At:</span> {new Date(createdAt).toLocaleDateString()}</p>
                    <p><span className="label">In Stock:</span> {inStock ? 'Yes' : 'No'}</p>
                </div>
                <div className="toy-actions">
                    <button>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}