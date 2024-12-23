import axios from "axios";
import { apiBaseUrl } from "../constants";
import { NewPet } from "../types"

const getAllPets = async () => {
  const { data } = await axios.get<[]>(`${apiBaseUrl}/pets`);
  console.log(typeof data);
  return data;
};

const updatePet = async (id: string, updates: NewPet) => {
  const { data } = await axios.put(`${apiBaseUrl}/pets/${id}`, updates)
  return data;
}

const addNewPet = async (pet: NewPet) => {
  const { data } = await axios.post(`${apiBaseUrl}/pets`, pet)
  return data;
}

const deletePet = async (id: string) => {
  const { data } = await axios.delete(`${apiBaseUrl}/pets/${id}`)
  return data;
}

export default {
  getAllPets,
  updatePet,
  addNewPet,
  deletePet,
};