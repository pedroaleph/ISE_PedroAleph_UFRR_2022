import { useState } from 'react';
import './styles.scss';

type Props = {
    name: string;
    onChangeName: (name: string) => void;
    onCheck: () => void;
}

const PlugCard = ({ name, onChangeName, onCheck }: Props) => {

    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className='plug-card-container'>
            <input
                type="checkbox"
                className='form-check-input'
                onClick={onCheck}
            />
            <input
                type="text"
                className='plug-name'
                defaultValue={ name }
                disabled={!isEditing}
                onChange={ event => onChangeName(event.target.value) }
            />
            <button
                type="button"
                className='btn btn-primary'
                onClick={() => setIsEditing(!isEditing) }
            >
                { isEditing ? 'salvar' : 'editar' }
            </button>
        </div>
    );
}

export default PlugCard;