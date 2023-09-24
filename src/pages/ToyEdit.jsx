import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { saveToy } from '../store/actions/toy.actions.js'
import { toyService } from '../services/toy.service.js'

export function ToyEdit() {
    const labels = toyService.getLabels()

    const { toyId } = useParams()
    const navigate = useNavigate()

    const [toy, setToy] = useState({
        _id: '',
        name: 'New Toy',
        price: 60,
        labels: [],
        createdAt: Date.now(),
        inStock: true,
    })

    useEffect(() => {
        if (toyId) {
            toyService.getById(toyId).then((existingToy) => {
                setToy(existingToy)
            })
        }
    }, [toyId])

    const handleChange = (e) => {
        const { name, value } = e.target
        setToy({ ...toy, [name]: value })
    }

    const handleLabelChange = (e) => {
        const label = e.target.value
        if (toy.labels.includes(label)) {
            setToy({ ...toy, labels: toy.labels.filter((lbl) => lbl !== label) })
        } else {
            setToy({ ...toy, labels: [...toy.labels, label] })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        saveToy(toy)
            .then((savedToy) => {
                navigate(`/toy/${savedToy._id}`)
            })
            .catch((error) => {
                console.error('Error saving toy:', error)
            })
    }

    return (
        <div className='toy-edit'>
            <form className="toy-edit-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Toy Name:</label>
                    <input id="name" type="text" name="name" value={toy.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input id="price" type="number" name="price" value={toy.price} onChange={handleChange} />
                </div>
                <fieldset className="labels-fieldset">
                    <legend>Labels</legend>
                    <div className="checkbox-group">
                        {labels.map((label, index) => (
                            <label key={index} className="checkbox-label">
                                <input
                                    type="checkbox"
                                    value={label}
                                    checked={toy.labels.includes(label)}
                                    onChange={handleLabelChange}
                                />
                                {label}
                            </label>
                        ))}
                    </div>
                </fieldset>
                <button className="submit-btn" type="submit">{toyId ? 'Update' : 'Add Toy'}</button>
            </form>
        </div>
    )
}