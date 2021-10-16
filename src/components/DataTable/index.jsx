import React, { useEffect, useState } from 'react';
import './DataTable.css';
import checked from '../../assets/check.png';
import unchecked from '../../assets/uncheck.png';

const rowPerPage = 5

function calculatePage(datas){
    let totalPages = Math.floor((datas.length)/rowPerPage);
    let remainder = (datas.length) % rowPerPage;
    if (remainder>0){totalPages++}
    let pagesNumbers=[];
    for (let i=0; i< totalPages; i++){
        pagesNumbers.push(i+1)
    }
    return pagesNumbers
}

function filterData(pageNumber, datas, setFunction){
    var filtered_datas = []
    for (let i=((pageNumber*rowPerPage)-rowPerPage); (i< (pageNumber*rowPerPage)&& i<datas.length); i++){
        filtered_datas.push(datas[i])
    }
    setFunction(filtered_datas);
}

function DataTable({ title, headers, datas, edit, editFunction, deletion, deleteFunction, view, viewFunction }){
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [dataToShow, setDataToShow] = useState([])
    
    useEffect(() => {
        let pagesNumbers = calculatePage(datas);
        setPages(pagesNumbers);
        filterData(currentPage,datas,setDataToShow)
    }, [currentPage,datas])

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
                 {dataToShow && dataToShow.map((data) => (
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
            <div className="buttonpages">
                    <input className="backPageButton" type="button" value="Précedent" onClick={() => { if(currentPage>1){setCurrentPage(currentPage-1)} }}/>
                    {
                        pages && pages.map((page)=>(
                        <input className={currentPage === page ? "SelectedPageNumberButton" : "PageNumberButton"} type="button" value={page} onClick={()=>{ setCurrentPage(page) }}/>))
                    }
                    <input className="nextPageButton" type="button" value="Suivant" onClick={()=>{ if(currentPage<pages.length){setCurrentPage(currentPage+1)} }}/>
                </div>
        </div>
    )
}

export default DataTable;