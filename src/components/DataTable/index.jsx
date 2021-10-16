import React, { useEffect, useState } from 'react';
import './DataTable.css';
import checked from '../../assets/check.png';
import unchecked from '../../assets/uncheck.png';

const rowPerPage = 5;

function createPagesNumbersArray(datas){
    let totalPages = Math.floor((datas.length)/rowPerPage);
    let remainder = (datas.length) % rowPerPage;
    if (remainder>0){ totalPages++ }
    let pagesNumbers=[];
    for (let i=0; i< totalPages; i++){
        pagesNumbers.push(i+1)
    }
    return pagesNumbers
}

function filterDataPerPage(pageNumber, datas, setFunction){
    var page_datas = []
    for (let i=((pageNumber*rowPerPage)-rowPerPage); (i< (pageNumber*rowPerPage)&& i<datas.length); i++){
        page_datas.push(datas[i])
    }
    setFunction(page_datas);
}

function DataTable({ title, headers, datas, edit, editFunction, deletion, deleteFunction, view, viewFunction }){
    const [pagesNumbers, setPagesNumber] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [dataToShow, setDataToShow] = useState([])

    function nextPage(){
        if(currentPage < pagesNumbers.length){ 
            setCurrentPage(currentPage+1) 
        }
    }

    function previousPage(){
        if(currentPage > 1){ 
            setCurrentPage(currentPage-1) 
        }
    }

    useEffect(() => {
        let pagesNumbersArray = createPagesNumbersArray(datas);
        setPagesNumber(pagesNumbersArray);
    }, [datas])

    useEffect(() => {
        filterDataPerPage(currentPage, datas, setDataToShow)
    }, [currentPage, datas])

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
                    <input className="backPageButton" type="button" value="Précedent" onClick={previousPage}/>
                    {
                        pagesNumbers && pagesNumbers.map((pageNumber)=>(
                        <input className={currentPage === pageNumber ? "SelectedPageNumberButton" : "PageNumberButton"} type="button" value={pageNumber} onClick={()=>{ setCurrentPage(pageNumber) }}/>))
                    }
                    <input className="nextPageButton" type="button" value="Suivant" onClick={nextPage}/>
                </div>
        </div>
    )
}

export default DataTable;