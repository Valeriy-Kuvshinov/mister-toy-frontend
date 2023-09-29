import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { saveToy } from '../store/actions/toy.actions.js'
import { toyService } from '../services/toy.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { TextField, Checkbox, Button, FormControlLabel, FormGroup } from '@mui/material'
import toysImage from '../assets/img/toys1.jpeg'

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
        const updatedValue = name === 'price' ? +value : value
        setToy({ ...toy, [name]: updatedValue })
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
                showSuccessMsg('Toy saved successfully')
            })
            .catch((error) => {
                console.error('Error saving toy:', error)
                showErrorMsg('Error saving toy')
            })
    }

    return (
        <div className='toy-edit flex'>
            <img src={toysImage} alt="Toys" />
            <form className="toy-edit-form flex flex-column" onSubmit={handleSubmit}>
                <div className="form-group flex flex-row">
                    <TextField
                        label="Toy Name"
                        name="name"
                        value={toy.name}
                        onChange={handleChange}
                    />

                    <TextField
                        label="Price"
                        name="price"
                        type="number"
                        className="price-input"
                        InputProps={{ inputProps: { min: 10 } }}
                        value={toy.price}
                        onChange={handleChange}
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={toy.inStock}
                                onChange={(e) => setToy({ ...toy, inStock: e.target.checked })}
                                name="inStock"
                            />
                        }
                        label="In Stock"
                    />
                </div>
                <fieldset className="labels-fieldset">
                    <legend>Labels</legend>
                    <FormGroup className="checkbox-group">
                        {labels.map((label, index) => (
                            <FormControlLabel
                                key={index}
                                control={
                                    <Checkbox
                                        value={label}
                                        checked={toy.labels.includes(label)}
                                        onChange={handleLabelChange}
                                    />
                                }
                                label={label}
                            />
                        ))}
                    </FormGroup>
                </fieldset>
                <Button className="submit-btn" type="submit" variant="contained" color="primary">
                    {toyId ? 'Update 🧸' : 'Add Toy 🧸'}
                </Button>
            </form>
        </div>
    )
}