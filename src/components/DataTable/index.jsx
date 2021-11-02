import React, { useEffect, useState } from 'react';
import './DataTable.css';
import checked from '../../assets/check.png';
import unchecked from '../../assets/uncheck.png';


function createPagesNumbersArray(datas, rowPerPage){
    let totalPages = Math.floor((datas.length)/rowPerPage);
    let remainder = (datas.length) % rowPerPage;
    if (remainder>0){ totalPages++ }
    //let pagesNumbers=[];
    let pagesNumbers = Array.from({length: totalPages}, (v, k) => k+1);
    /*for (let i=0; i< totalPages; i++){
        pagesNumbers.push(i+1)
    }*/
    return pagesNumbers
}

function filterDataPerPage(pageNumber, datas, setFunction, rowPerPage){
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
    const [rowPerPage, setRowPerPage] = useState(5)

    function nextPage(){
        if(currentPage < pagesNumbers.length){ setCurrentPage(currentPage+1) }
    }

    function previousPage(){ 
        if(currentPage > 1){  setCurrentPage(currentPage-1) }
    }

    useEffect(() => {
        let pagesNumbersArray = createPagesNumbersArray(datas, rowPerPage);
        setPagesNumber(pagesNumbersArray);
    }, [datas, rowPerPage])

    useEffect(() => {
        filterDataPerPage(currentPage, datas, setDataToShow, rowPerPage)
    }, [currentPage, datas, rowPerPage])

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
                            <input className={currentPage === pageNumber ? "SelectedPageNumberButton" : "PageNumberButton"} type="button" value={pageNumber} onClick={()=>{ setCurrentPage(pageNumber) }}/>
                        ))
                    }
                    <input className="nextPageButton" type="button" value="Suivant" onClick={nextPage}/>
                    <select className="numberPerPage" onChange={(e)=>setRowPerPage(e.target.value)} name="numberPerPage" id="numberPerPage" value={rowPerPage} >
                        <option value={5}            key={1}>5</option>
                        <option value={10}           key={2}>10</option>
                        <option value={50}           key={3}>50</option>
                        <option value={datas.length} key={4}>All</option>
                    </select>
                </div>
        </div>
    )
}

export default DataTable;