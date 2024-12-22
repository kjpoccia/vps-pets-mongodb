import { useState, useEffect } from 'react'
import './App.css'
import { Pet, NewPet } from './types'
import petService from './services/pets'
import List from './components/List'
import Modal from './components/Modal'
import AddPet from './components/AddPet'

function App() {

  const [currentList, setCurrentList] = useState<Pet[] | []>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [viewInModal, setViewInModal] = useState<NewPet>({ name: '' })

  useEffect(() => {
    const getListData = async () => {
      try {
        let list: Pet[] = await petService.getAllPets();
        setCurrentList(list);
      } catch (error) {
        console.log("Error fetching list: ", error);
      }
    }

    void getListData();
  }, [])

  const handleDelete = async (id: string) => {
    let pet = findLocalPet(id);
    if (!pet) return;
    try {
      await petService.deletePet(id);
      let newList = currentList.filter(pet => pet.id !== id);
      setCurrentList(newList);
    } catch (error) {
      console.log('Error deleting pet: ', error)
    }
  }

  const validatePet = (pet: Pet | NewPet) => {
    if (!pet.name) {
      alert('Must provide a name')
      return false;
    } else if (pet.type && pet.type.length < 2) {
      alert('Type, if provided, must be at least 2 characters long')
      return false;
    } 

    return true;
  }

  const handleUpdate = async (pet: Pet) => {
    let localPet = findLocalPet(pet.id);
    if (!localPet) return;
    const changedPet = {...localPet, ...pet}
    try {
      await petService.updatePet(localPet.id, changedPet)
      setCurrentList(currentList => currentList.map((p) => {
        if (changedPet.id === p.id) {
          return { ...changedPet};
        } else {
          return p
        }
      }))
      setShowModal(false);
    } catch (error) {
      console.log("Error updating pet: ", error)
    }
  }

  const handleSubmit = async (pet: Pet | NewPet) => {
    if (!validatePet(pet)) return;

    if ("id" in pet) { // means it's an existing pet
      handleUpdate(pet)
    } else {
      try {
        const newPet = await petService.addNewPet(pet)
        let newList = currentList.concat(newPet);
        setCurrentList(newList);
        setShowModal(false);
      } catch (error) {
        console.log("Error adding pet: ", error)
        setCurrentList([]);
      }
    }
  }

  const showModalWithId = (id: string) => {
    let pet = findLocalPet(id);
    if (!pet) return;
    setShowModal(true);
    setViewInModal(pet);
  }

  const showModalNew = () => {
    setShowModal(true);
    setViewInModal({ name: '' })
  }

  const hideModal = () => {
    setShowModal(false);
  }

  const findLocalPet = (id: string) => {
    if (!Array.isArray(currentList)) {
      console.log('currentList is not an Array')
      console.log(typeof currentList)
    }
    return currentList.find(pet => pet.id === id);
  }

  return (
    <>
      <h1>Great Pets</h1>
      <List 
            currentList={currentList} 
            showModalWithId={showModalWithId}
            onDelete={handleDelete}
          />{
            showModal ? <Modal hideModal={hideModal} 
                               showModal={showModal} 
                               pet={viewInModal}
                               onSubmit={handleSubmit}/> : <></>
          }
    <AddPet showModalNew={showModalNew}/>
    </>
    
  )
}

export default App
