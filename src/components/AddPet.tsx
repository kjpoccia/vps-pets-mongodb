interface AddPetProps {
    showModalNew: () => void;
}

const AddPet = ({ showModalNew }: AddPetProps ) => {
    return (
        <label htmlFor="new_pet" onClick={() => showModalNew()}>
            <h3>Add new pet</h3><img src="images/plus.png" alt="Add Pet" />
            
        </label>
    )
}

export default AddPet;