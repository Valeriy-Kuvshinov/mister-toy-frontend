import React from 'react'
import { toyService } from '../services/toy.service.js'
import { FormControl, InputLabel, Select, MenuItem, TextField, Box } from '@mui/material'

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

            <Box className='filter-grid-one'>
                <TextField
                    fullWidth
                    id="name"
                    label="Search by toy name"
                    variant="outlined"
                    name="name"
                    value={filterBy.name}
                    onChange={handleChange}
                />
            </Box>

            <Box className="filter-grid-two">
                <TextField
                    type="number"
                    id="minPrice"
                    label="Min Price"
                    variant="outlined"
                    name="minPrice"
                    InputProps={{ inputProps: { min: 0 } }}
                    onChange={handleChange}
                />
                <TextField
                    type="number"
                    id="maxPrice"
                    label="Max Price"
                    variant="outlined"
                    name="maxPrice"
                    InputProps={{ inputProps: { min: 10 } }}
                    onChange={handleChange}
                />
                <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="inStock">In Stock</InputLabel>
                    <Select id="inStock" name="inStock" value={String(filterBy.inStock) || ''} onChange={handleChange}>
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="true">Yes</MenuItem>
                        <MenuItem value="false">No</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Box className='filter-grid-three'>
                <FormControl variant="outlined" fullWidth className="full-height">
                    <InputLabel htmlFor="labels">Find by labels</InputLabel>
                    <Select
                        multiple
                        id="labels"
                        name="labels"
                        value={filterBy.labels || []}
                        onChange={handleChange}
                        renderValue={(selected) => (
                            <div className='flex flex-column'>
                                {selected.map((value) => (
                                    <span key={value}>{value}</span>
                                ))}
                            </div>
                        )}
                    >
                        {labels.map((label, index) => (
                            <MenuItem key={index} value={label}>{label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <Box className='filter-grid-four'>
                <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="sortBy">Sort By</InputLabel>
                    <Select id="sortBy" name="sortBy" value={sort.by} onChange={(e) => handleSortChange(e.target.value)}>
                        <MenuItem value="name">Name</MenuItem>
                        <MenuItem value="price">Price</MenuItem>
                        <MenuItem value="createdAt">Created</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="sortOrder">Order</InputLabel>
                    <Select id="sortOrder" name="sortOrder" value={sort.asc ? 'asc' : 'desc'} onChange={handleToggleDirection}>
                        <MenuItem value="asc">Ascending</MenuItem>
                        <MenuItem value="desc">Descending</MenuItem>
                    </Select>
                </FormControl>
            </Box>

        </section>
    )
}