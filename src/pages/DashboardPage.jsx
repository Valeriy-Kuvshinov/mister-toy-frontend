import React, { useState, useEffect } from 'react'
import {
    Chart as ChartJS, ArcElement, LinearScale, BarElement, CategoryScale
    , LineController, LineElement, PointElement, Tooltip, Legend
} from 'chart.js'
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import { toyService } from '../services/toy.service.js'
ChartJS.register(ArcElement, CategoryScale, LineController, LinearScale
    , LineElement, PointElement, BarElement, Tooltip, Legend)

export function DashboardPage() {
    const [labelPrices, setLabelPrices] = useState({})
    const [inventoryByLabel, setInventoryByLabel] = useState({})
    const [lineChartData, setLineChartData] = useState({})
    const filterBy = toyService.getDefaultFilter()
    const sort = toyService.getDefaultSort()

    useEffect(() => {
        async function fetchData() {
            try {
                const initialToys = await toyService.query(filterBy, sort)

                // Calculate average prices per label
                let labelPriceCount = {}
                initialToys.forEach(toy => {
                    toy.labels.forEach(label => {
                        labelPriceCount[label] = (labelPriceCount[label] || { sum: 0, count: 0 })
                        labelPriceCount[label].sum += toy.price
                        labelPriceCount[label].count += 1
                    })
                })
                const avgLabelPrices = Object.entries(labelPriceCount).reduce((acc, [label, data]) => {
                    acc[label] = data.sum / data.count
                    return acc
                }, {})
                setLabelPrices(avgLabelPrices)

                // Calculate inventory by label
                let labelInventoryCount = {}
                initialToys.forEach(toy => {
                    toy.labels.forEach(label => {
                        labelInventoryCount[label] = (labelInventoryCount[label] || { inStock: 0, outOfStock: 0 })
                        if (toy.inStock) labelInventoryCount[label].inStock += 1
                        else labelInventoryCount[label].outOfStock += 1
                    })
                })
                setInventoryByLabel(labelInventoryCount)

                // Generate random numbers for line chart
                const dates = [...Array(7)].map((_, i) => {
                    const d = new Date()
                    d.setDate(d.getDate() - i)
                    return d.toISOString().split('T')[0]
                }).reverse()
                const values = [...Array(7)].map(() => Math.floor(Math.random() * 1000))
                setLineChartData({ dates, values })
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData()
        return () => {
            ChartJS.unregister(ArcElement, CategoryScale, LineController, LineElement
                , PointElement, BarElement, LinearScale)
        }
    }, [])
    return (
        <main className="dashboard-container">
            <div className='dashboard-container-header'>
                <h1>Welcome dear manager!</h1>
                <h2>Here is our most updated business performance:</h2>
            </div>
            <h3>Current average price per label</h3>
            <Bar
                data={{
                    labels: Object.keys(labelPrices),
                    datasets: [{
                        label: 'Average Price',
                        data: Object.values(labelPrices),
                        backgroundColor: '#42a5f5',
                    }]
                }}
            />
            <h3>Current amount of toys in-stock per label</h3>
            <Doughnut
                data={{
                    labels: Object.keys(inventoryByLabel),
                    datasets: [{
                        data: Object.values(inventoryByLabel).map(labelData => labelData.inStock),
                        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#c45850', '#8e5ea2', '#3cba9f', '#e8c3b9'],
                    }]
                }}
            />
            <h3>Weekly overall toy sales</h3>
            <Line
                data={{
                    labels: lineChartData.dates,
                    datasets: [{
                        label: 'Random Data',
                        data: lineChartData.values,
                        borderColor: '#3e95cd',
                        fill: false,
                    }]
                }}
            />
        </main>
    )
}