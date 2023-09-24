import React from 'react'
import { ToyPreview } from './ToyPreview.jsx'

export function ToyList({ toys, onDelete }) {
    return (
        <div>
            <ul className="toy-list">
                {toys.map(toy => (
                    <ToyPreview key={toy._id} toy={toy} onDelete={onDelete} />
                ))}
            </ul>
        </div>
    )
}