import { Pet } from '../types'

interface ListProps {
    currentList: Pet[];
    showModalWithId: (id: string) => void;
    onDelete: (id: string) => void;
}

const List = ({currentList, showModalWithId, onDelete}: ListProps) => {

    return (
        <table cellSpacing="0">
            <tbody>
                {currentList.map(pet => {
                    return (
                        <tr key={pet.id}>
                            <td className="list_item">
                                <label htmlFor={`item_${pet.id}`} onClick={() => showModalWithId(pet.id)}>{pet.name} - {pet.type}</label>
                            </td>
                            <td className="delete" onClick={() => onDelete(pet.id)}><img src="images/trash.png" alt="Delete"/></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default List;