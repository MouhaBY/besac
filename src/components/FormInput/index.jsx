import './FormInput.css';

function FormInput ({ value, setValue, choiceslist, type="text", title="", id, required=false, hasError=false, disabled=false }){

    return(
        type === "checkbox" ?
            <div className="checkBoxContainer">
                <label className="formTitle" for={id}>{title}</label>
                <input className="checkboxInput" type="checkbox" name={id} id={id} defaultChecked={value} disabled= {disabled ? "disabled" : null} />
            </div>
        :
            <div className="forminputs">
                <label className="formTitle" for={id}>{title}{required && <span className="requiredinput">*</span>}</label>
                {type === "select" ?
                <select className="selectorforminput" onChange={e => setValue(e.target.value)}>
                    {choiceslist && choiceslist.map(choice => (                    
                        <option selected={choice._id === value ? "selected" : ""} value={choice._id}>{choice.name}</option>))}
                </select>
                :
                <input className={hasError  ? "errorformInput" : "formInput"} type={type} name={id} id={id} value={value} onChange={e => setValue(e.target.value)} disabled= {disabled ? "disabled" : null}/>
                }
                </div>
    )
}

export default FormInput;