import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toyService } from '../services/toy.service.js'
import { ToyList } from '../cmp/ToyList.jsx'
import { ToyFilter } from '../cmp/ToyFilter.jsx'
import { removeToy, loadToys } from '../store/actions/toy.actions.js'

export function ToyIndex() {
    const toys = useSelector((state) => state.toyModule.toys)
    const [filterBy, setFilterBy] = useState(toyService.getDefaultFilter())
    const [sort, setSort] = useState(toyService.getDefaultSort())

    useEffect(() => {
        loadToys(filterBy, sort)
            .catch((err) => {
                console.log('Oops.. something went wrong, try again', err)
            })
    }, [filterBy, sort])

    function onDelete(toyId) {
        removeToy(toyId)
            .catch(err => {
                console.log('Cant remove toy, try again.', err)
            })
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        if (target.type === 'checkbox') value = target.checked
        if (target.type === 'select-multiple') value = Array.from(target.selectedOptions, (option) => option.value)
        setFilterBy({ ...filterBy, [field]: value })
    }

    function onSetSort(sort) {
        setSort(sort)
    }

    return (
        <main className="toy-store">
            <h2 className="toy-store-header">Find your next toy for the family!</h2>
            <div className="toy-filter-container">
                <ToyFilter sort={sort} onSetSort={onSetSort} filterBy={filterBy} handleChange={handleChange} />
            </div>
            <div className="toy-list-container">
                <ToyList toys={toys} onDelete={onDelete} />
            </div>
        </main>
    )
}