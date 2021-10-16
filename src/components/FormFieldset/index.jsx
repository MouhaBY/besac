import './FormFieldset.css';

function nothingToDo(){}

function FormFieldset ({ value, setValue={nothingToDo}, choiceslist, type="text", title="", id, required=false, hasError=false, disabled=false }){
    return(
        type === "checkbox" ?
            <fieldset className="checkBoxContainer">
                <label className="formTitle">{title}</label>
                <input className="checkboxInput" type="checkbox" name={id} id={id} onChange={setValue} defaultChecked={value} disabled={disabled ? "disabled" : null} />
            </fieldset>
        :
            <fieldset className="forminputs">
                <label className="formTitle">{title}{required && <span className="requiredinput">*</span>}</label>
                {type === "select" ?
                    <select className={hasError  ? "errorselectorforminput" : "selectorforminput"} onChange={setValue} name={id} id={id} value={value} disabled={disabled ? "disabled" : null}>
                        <option disabled selected value> -- Choisir une valeur -- </option>
                        {choiceslist && choiceslist.map(choice => (                    
                        <option /*selected={choice._id === value ? "selected" : ""}*/ value={choice._id} key={choice._id}>{choice.name}</option>))}
                    </select>
                :
                    <input className={hasError  ? "errorformInput" : disabled ? "disabledformInput" : "formInput"} type={type} name={id} id={id} value={value} onChange={setValue} disabled={disabled ? "disabled" : null}/>
                }
            </fieldset>
    )
}

export default FormFieldset;