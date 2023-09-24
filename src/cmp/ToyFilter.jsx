import React from 'react'
import { toyService } from '../services/toy.service.js'

export function ToyFilter({ sort, onSetSort, filterBy, handleChange }) {
    const labels = toyService.getLabels()

    function handleSortChange(by) {
        const updatedSort = { ...sort, by }
        onSetSort(updatedSort)
    }

    function handleToggleDirection() {
        const updatedSort = { ...sort, asc: !sort.asc }
        onSetSort(updatedSort)
    }
    return (
        <section className="toy-filter">
            <div className='filter-grid-one'>
                <div className="search-filter-option">
                    <input
                        type="text"
                        id="name"
                        placeholder="Search by toy name"
                        name="name"
                        value={filterBy.name}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="filter-grid-two">
                <div className="minPrice-filter-option">
                    <label className="filter-label" htmlFor="minPrice">Min Price:</label>
                    <input
                        type="number"
                        min={0}
                        placeholder='0'
                        id="minPrice"
                        name="minPrice"
                        onChange={handleChange}
                    />
                </div>
                <div className="inStock-filter-option">
                    <label className="filter-label" htmlFor="inStock">In Stock:</label>
                    <select id="inStock" name="inStock" value={filterBy.inStock || ''} onChange={handleChange}>
                        <option value="">All</option>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                </div>
            </div>
            <div className='filter-grid-three'>
                <div className="label-filter-option">
                    <label className="filter-label" htmlFor="labels">Find by labels:</label>
                    <select
                        multiple
                        id="labels"
                        name="labels"
                        size="4"
                        value={filterBy.labels || []}
                        onChange={handleChange}
                    >
                        {labels.map((label, index) => (
                            <option key={index} value={label}>{label}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className='filter-grid-four'>
                <div className="sort-filter-option">
                    <label className="filter-label" htmlFor="sortBy">Sort By:</label>
                    <select id="sortBy" name="sortBy" value={sort.by} onChange={(e) => handleSortChange(e.target.value)}>
                        <option value="name">Name</option>
                        <option value="price">Price</option>
                        <option value="createdAt">Created</option>
                    </select>
                    <label className="filter-label" htmlFor="sortOrder">Order:</label>
                    <select id="sortOrder" name="sortOrder" value={sort.asc ? 'asc' : 'desc'} onChange={handleToggleDirection}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
            </div>
        </section>
    )
}