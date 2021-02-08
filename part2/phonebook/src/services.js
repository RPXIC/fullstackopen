import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

const getPersons = () => {
	return axios.get(baseURL)
}

const addPerson = newPerson => {
	return axios.post(baseURL, newPerson)
}

const deletePerson = id => {
	return axios.delete(`${baseURL}/${id}`)
}

const updatePerson = (person, newPerson) => {
	return axios.put(`${baseURL}/${person.id}`, newPerson)
}

export {getPersons, addPerson, deletePerson, updatePerson}
