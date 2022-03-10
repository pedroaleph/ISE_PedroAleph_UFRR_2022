import { PlugVariables } from 'core/types/Plug';
import './styles.scss';

type Props = {
    selectedTag: (item: string) => void;
}

const ChartInputRadio = ({ selectedTag }: Props) => {

    return (
       <div className='chart-input-radio-container'>
           <h5>variáveis: </h5>
           { PlugVariables.map(item => (
               <div className="form-check" key={item.id}>
                <input 
                    className="form-check-input"
                    type="radio"
                    name="VariablesInputRadio"
                    value={item.tag}
                    onChange={value => selectedTag(value.target.value)}
                    defaultChecked={ item.tag === 'corrente_mA' }
                />
                <label className="form-check-label">
                    { item.name }
                </label>
             </div>
           )) }
       </div>
    );
}

export default ChartInputRadio;