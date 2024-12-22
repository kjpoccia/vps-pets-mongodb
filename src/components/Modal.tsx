import { Pet, NewPet } from '../types'
import { useState } from 'react'

interface ModalProps {
  hideModal: () => void;
  showModal: boolean;
  pet?: Pet | NewPet;
  onSubmit: (pet: Pet | NewPet) => void;
}

const Modal = ({ hideModal, showModal, pet, onSubmit }: ModalProps) => {
  if (!pet) {
    pet = {
      name: '',
      type: '',
    }
  }
  const [editPet, setEditPet] = useState(pet);

    return (
        <>
        <div className="modal" id="modal_layer" onClick={hideModal} 
              style={showModal ? {display: "block"} : {display: "none"}}>
        </div>
        <div className="modal" id="form_modal"
              style={showModal ? {display: "block", top: "200px"} : {display: "none"}}>
          <form action="" method="post" onSubmit={(e) => {
            e.preventDefault();
            onSubmit(editPet)}
          }>
            <fieldset>
              <ul>
                <li>
                  <label htmlFor="Name">Name</label>
                  <input type="text" 
                          name="name" 
                          id="name" 
                          placeholder="Fluffy"
                          value={ editPet.name || '' }
                          onChange={(e) => setEditPet({...editPet, name: e.target.value})}
                          />
                </li>
                <li>
                  <label htmlFor="type">Type</label>
                  <input type="text"
                         id="type" 
                         name="type"
                         placeholder="Jumping spider"
                         value={ editPet.type || '' }
                         onChange={(e) => setEditPet({...editPet, type: e.target.value})}
                         />
                </li>
                  <input type="submit" value="Save" />
              </ul>
            </fieldset>
          </form>
        </div>
        </>
    )
}

export default Modal;