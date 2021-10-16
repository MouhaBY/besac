import './DataTable.css';
import checked from '../../assets/check.png';
import unchecked from '../../assets/uncheck.png';

function DataTable({ title, headers, datas, edit, editFunction, deletion, deleteFunction, view, viewFunction }){
    return(
        <div className="DataTableContainer">
            <h2 className="DataTabletitle">{title}</h2>
            <table className="Table">
                <thead>
                    <tr>
                    {headers && headers.map((head) => (
                        <th key={head.reference} className="Cell">{head.name}</th>))}
                    </tr>
                 </thead>
                 <tbody>
                 {datas && datas.map((data) => (
                    <tr className="datatablerow" key={data._id}>
                        {headers.map((head) => (
                            (head?.type === "actions") ?
                            <div key={data._id} className="datatablebuttons">
                                { view &&
                                <input id="viewButton" type="button" value="Consuler" onClick={()=>{ viewFunction(data) }}/>}
                                { edit && 
                                <input id="editButton" type="button" value="Modifier" onClick={()=>{ editFunction(data) }}/>}
                                { deletion &&
                                <input id="deleteButton" type="button" value="Supprimer" onClick={() => { deleteFunction(data) }}/>}
                            </div> :
                            <td key={head.reference} className="Cell">{
                                head.type === "bool" ? <img id="checked" src={ data[head.reference] ? checked : unchecked } alt="checked" />
                                : data[head.reference]
                            }</td>
                        ))}
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default DataTable;