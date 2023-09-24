import { httpService } from './http.service.js'

const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

export const toyService = {
    query,
    getById,
    save,
    remove,
    getToysByLabel,
    getLabels,
    getDefaultFilter,
    getDefaultSort,
}

function query(filterBy = {}, sort = {}) {
    return httpService.get('toy', { params: { filterBy, sort } })
}

function getById(toyId) {
    return httpService.get(`toy/${toyId}`)
}

function remove(toyId) {
    return httpService.delete(`toy/${toyId}`)
}

function save(toy) {
    if (toy._id) return httpService.put(`toy/${toy._id}`, toy)
    else return httpService.post('toy', toy)
}

function getToysByLabel(label) {
    return query()
        .then(toys => toys.filter(toy => toy.labels.includes(label)))
        .catch(err => { throw err })
}

function getLabels() {
    return [...labels]
}

function getDefaultFilter() {
    return { name: '', labels: [], inStock: '', minPrice: 0 }
}

function getDefaultSort() {
    return {
        by: 'name',
        asc: true
    }
}