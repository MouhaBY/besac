import { useState, useEffect } from 'react';
import './Activities.css';
import rightArrow from "../../assets/right-arrow.png";
import cross from "../../assets/cross.png";
import searching from "../../assets/searching.png";
import {presence, employees, timesheet} from "./ActivitiesDetails";

const criterias = [
    {value:"matricule", name:"Matricule"}, 
    {value:"name", name:"Nom"}, 
    {value:"subname",name:"Prénom"}, 
    {value:"service",name:"Service"} 
]

const employeesHeaders = [{reference:"name", name:"Nom"}, {reference:"subname", name:"Prénom"}, {reference:"matricule", name:"Matricule"}, {reference:"service", name:"Service"}, {reference:"timesheet", name:"Feuille de temps"}, ]

function getYearsOptions(thisYear){
    var years = []
    for (let i = thisYear-5; i <= thisYear+5; i++) {
        years.push(i);
    }
    return years
}

function getThisWeek(currentdate){
    var oneJan = new Date(currentdate.getFullYear(),0,1);
    var numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
    var result = Math.ceil(( currentdate.getDay() + 1 + numberOfDays) / 7);
    return result
}

function getWeeksNumberOptions(year){
    var lastDay = new Date(year,11,31);
    let lasWeek = getThisWeek(lastDay);
    const weeks = Array.from({length: lasWeek}, (v, k) => k+1);
    return weeks
}

function getDateCorrectFormat(date){
    if(date){
        let thisDate = date.getFullYear() + "-" + date.toLocaleDateString('fr-FR', { month: '2-digit',}) + "-" + date.toLocaleDateString('fr-FR', { day: '2-digit',});
        return thisDate
    }
    else return "----/--/--"
}

function getSunday(selected_date){
    let weekday = selected_date.toLocaleDateString('en-EN', { weekday: 'long' });

    switch (weekday) {
        case 'Monday':
            return ( d => new Date( d.setDate(selected_date.getDate()+6)) )(new Date());
        case 'Tuesday':
            return ( d => new Date( d.setDate(selected_date.getDate()+5)) )(new Date());
        case 'Wednesday':
            return ( d => new Date( d.setDate(selected_date.getDate()+4)) )(new Date());
        case 'Thursday':
            return ( d => new Date( d.setDate(selected_date.getDate()+3)) )(new Date());
        case 'Friday':
            return ( d => new Date( d.setDate(selected_date.getDate()+2)) )(new Date());
        case 'Saturday':
            return ( d => new Date( d.setDate(selected_date.getDate()+1)) )(new Date());
        case 'Sunday':
            return ( d => new Date( d.setDate(selected_date.getDate())) )(new Date());
        default: 
            return ( d => new Date());
    }
}

function getMonday(selected_date){

    let weekday = selected_date.toLocaleDateString('en-EN', { weekday: 'long' });

    switch (weekday) {
        case 'Monday':
            return ( d => new Date( d.setDate(selected_date.getDate())) )(new Date());
        case 'Tuesday':
            return ( d => new Date( d.setDate(selected_date.getDate()-1)) )(new Date());
        case 'Wednesday':
            return ( d => new Date( d.setDate(selected_date.getDate()-2)) )(new Date());
        case 'Thursday':
            return ( d => new Date( d.setDate(selected_date.getDate()-3)) )(new Date());
        case 'Friday':
            return ( d => new Date( d.setDate(selected_date.getDate()-4)) )(new Date());
        case 'Saturday':
            return ( d => new Date( d.setDate(selected_date.getDate()-5)) )(new Date());
        case 'Sunday':
            return ( d => new Date( d.setDate(selected_date.getDate()-6)) )(new Date());
        default: 
            return ( d => new Date());
    }
}

function calculatePresenceState(difference, theorical){

    if (difference < 0){
        if (difference + theorical === 0) return "Absence"
        else return " Anomalie "
    } 
    else return "OK"
}


function Activities(){
    const [employeeCardOpened, setEmployeeCardOpened] = useState(true);
    const [periodCardOpened, setPeriodCardOpened] = useState(true);
    const [activitiesCardOpened, setActivitiesCardOpened] = useState(true);
    
    const [searchEmployee, setSearchEmployee] = useState("");
    const [criteria, setCriteria] = useState();
    const [employee, setEmployee] = useState();
    const [filteredEmployees, setFilteredEmployees] = useState([]);

    const [thisTenYears, setThisTenYears] = useState([])
    const [thisYearWeeks, setThisYearWeeks] = useState([])
    
    const [selectedYear, setSelectedYear] = useState();
    const [selectedWeek, setSelectedWeek] = useState();
    const [selectedDate, setSelectedDate] = useState();

    const [dateFrom, setDateFrom] = useState();
    const [dateTo, setDateTo] = useState();
    const [dateInterval, setDateInterval] = useState([]);

    const [userPresence, setUserPresence] = useState([]);

    useEffect(() => {
        let today = new Date();

        setThisTenYears( getYearsOptions(today.getFullYear()) );
        setThisYearWeeks( getWeeksNumberOptions(today.getFullYear()) );

        setSelectedYear( today.getFullYear() );
        setSelectedWeek( getThisWeek(today) );
        setSelectedDate(today);
        setDateFrom( getMonday(today) );
        setDateTo( getSunday(today) );
    }, []);

    useEffect(() => {
        let employee_presence = presence.filter((present)=>(employee?._id === present.employee_id))
        setUserPresence(employee_presence)
    }, [employee]);

    useEffect(() => {
        let dates = ["18/10/2021", "19/10/2021", "20/10/2021", "21/10/2021", "22/10/2021", "23/10/2021", "24/10/2021"]
        setDateInterval(dates)
    }, [dateFrom, dateTo]);

    function filterEmployees(){ setFilteredEmployees(employees) }

    const handleSubmit = (evt) =>{ evt.preventDefault(); }

    function clearEmployee(){
        setEmployee({});
        setSearchEmployee("");
        setFilteredEmployees([]);
        setCriteria();
    }

    function calculateDates(evt){
        let date_value = new Date(evt.target.value);
        setSelectedDate( date_value );
        setDateFrom( getMonday(date_value) );
        setDateTo( getSunday(date_value) );
        setSelectedWeek( getThisWeek(date_value) );
    }

    return(
        <div className="activitiescontainer">
            <h2 className="maintitle">Exploitation / Temps & Activités</h2>
            <div className= "cardcomponent">
                <div className="cardtitlecontainer">
                    <h2 className="cardtitle">Employé</h2>
                    <img src={rightArrow} alt='fleche' id={employeeCardOpened ? "arrow" : "rotate-arrow"} onClick={()=>{setEmployeeCardOpened(!employeeCardOpened)}}/>
                </div>
                {employeeCardOpened &&
                <form className="rowsubcardcomponent" onSubmit={handleSubmit}>
                    <input className="searchinput" type="text" name="searchEmployee" id="searchEmployee" onChange={e=>setSearchEmployee(e.target.value)} value={searchEmployee} />
                    <select className="selectinput" onChange={(e)=>setCriteria(e.target.value)} name="criteria" id="criteria" defaultValue="" value={criteria}>
                        <option disabled  value=""> Critère </option>
                        { criterias.map((criteria_data)=>
                        <option value={criteria_data.value} key={criteria_data.value}>{criteria_data.name}</option>
                        )}
                    </select>
                    <div className="searchbuttons">
                        <img src={cross} alt='clear' id="clearimg" onClick={clearEmployee} />
                        <img src={searching} alt='search' id="searchimg" onClick={filterEmployees} />
                    </div>
                </form>
                }   
                <div className="subcardemployeecomponent">
                    <label className="employeeDatalabel">Nom
                    <input className="employeeData" type="text" name="employeeName" id="employeeName" value={employee?.name || ""} disabled />
                    </label>
                    <label className="employeeDatalabel">Prénom
                    <input className="employeeData" type="text" name="employeeSubName" id="employeeSubName" value={employee?.subname || ""} disabled />
                    </label>
                    <label className="employeeDatalabel">Matricule
                    <input className="employeeData" type="text" name="employeeMatricule" id="employeeMatricule" value={employee?.matricule || ""} disabled />
                    </label>
                    <label className="employeeDatalabel">Service
                    <input className="employeeData" type="text" name="employeeService" id="employeeService" value={employee?.service || ""} disabled />
                    </label>
                    <label className="employeeDatalabel">Feuille de temps
                    <input className="employeeData" type="text" name="employeeTimesheet" id="employeeTimesheet" value={employee?.timesheet || ""} disabled />
                    </label>
                </div>
                {employeeCardOpened &&
                <div className="subcardcomponent">
                <table className="table">
                    <thead className="tablehead">
                        <tr>
                        {employeesHeaders.map((head) => (
                            <th key={head.reference} className="headcell">{head.name}</th>))}
                        </tr>
                    </thead>
                    <tbody>
                    {filteredEmployees && filteredEmployees.map((employee_data) => (
                        <tr className={employee_data === employee ? "selectedtablerow" : "tablerow"} key={employee_data._id} onClick={()=>setEmployee(employee_data)}>
                            {employeesHeaders.map((head) => (
                                <td key={head.reference} className="tablerowcell">{employee_data[head.reference]}</td>
                            ))}
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>}
            </div>
            <div className= "cardcomponent">
                <div className="cardtitlecontainer">
                    <h2 className="cardtitle">Periode d'affichage</h2>
                    <img src={rightArrow} alt='fleche' id={periodCardOpened ? "arrow" : "rotate-arrow"} onClick={()=>{setPeriodCardOpened(!periodCardOpened)}}/>
                </div>
                {periodCardOpened &&
                <form className="rowsubcardcomponent">
                    <label className="periodlabel" >Année </label>
                    <select className="selectinput" onChange={(e)=>setSelectedYear(e.target.value)} name="year" id="year" value={selectedYear}>
                        { thisTenYears.map((year_from_ten, index)=>
                        <option value={year_from_ten} key={`year_from_ten${index}`}>{year_from_ten}</option>
                        )}
                    </select>
                    <label className="periodlabel">Semaine </label>
                    <select className="selectinput" onChange={(e)=>setSelectedWeek(e.target.value)} name="week" id="year" value={selectedWeek}>
                        { thisYearWeeks.map((week_from_table, index)=>
                        <option value={week_from_table} key={`week_from_table${index}`}>{week_from_table}</option>
                        )}
                    </select>
                    <label className="periodlabel">Date </label>
                    <input className="dateinput" type="date" onChange={calculateDates} name="date" id="date" value={ getDateCorrectFormat(selectedDate) }/>
                </form>
                }
                <div className="subcardemployeecomponent">
                    <label className="employeeDatalabel">Semaine N° / Année
                    <input className="employeeData" type="text" name="employeeName" id="employeeName" value={ (selectedWeek + " / " + selectedYear) || "" } disabled />
                    </label>
                    <label className="employeeDatalabel">Date du
                    <input className="employeeData" type="date" name="employeeSubName" id="employeeSubName" value={ getDateCorrectFormat(dateFrom) || "" } disabled />
                    </label>
                    <label className="employeeDatalabel">Date au
                    <input className="employeeData" type="date" name="employeeMatricule" id="employeeMatricule" value={ getDateCorrectFormat(dateTo) || "" } disabled />
                    </label>
                </div>
            </div>
            <div className= "cardcomponent">
                <div className="cardtitlecontainer">
                    <h2 className="cardtitle">Temps & Activités</h2>
                    <img src={rightArrow} alt='fleche' id={activitiesCardOpened ? "arrow" : "rotate-arrow"} onClick={()=>{setActivitiesCardOpened(!activitiesCardOpened)}}/>
                </div>
                {activitiesCardOpened &&
                <div className="subcardcomponent">
                    <table className="activitiestable">
                        <thead>
                            <tr>
                                <th className="activitiestableheadcell" colSpan="2" rowSpan="2">{"Semaine N°" + selectedWeek}</th>
                                <th className="activitiestableheadcell" colSpan="2">Présence</th>
                                <th className="activitiestableheadcell" rowSpan="2">Etat</th>
                                <th className="activitiestableheadcell" colSpan="3">Résultat</th>
                                <th className="activitiestableheadcell" rowSpan="2">Commentaire</th>
                            </tr>
                            <tr>
                                <th className="activitiestableheadcell" >Entrée 1</th>
                                <th className="activitiestableheadcell" >Sortie 1</th>
                                <th className="activitiestableheadcell" >Théorique</th>
                                <th className="activitiestableheadcell" >Effectué</th>
                                <th className="activitiestableheadcell" >Différence</th>
                            </tr>
                        </thead>
                    <tbody>
                        {
                          employee && dateInterval && dateInterval.map((date) =>{
                            var presence_day = userPresence.find(element => element.date === date);
                            let timeSheet = timesheet.find(element => element._id === employee?.timesheetDetails[dateInterval.indexOf(date)])
                            return(
                                <tr key={date}>
                                    <td className="activitiestablerowcell">{date || ""}</td>
                                    <td className="activitiestablerowcell">{timeSheet?.name || ""}</td>
                                    <td className="activitiestablerowcell">{presence_day?.firstIn || "00:00"}</td>
                                    <td className="activitiestablerowcell">{presence_day?.lastOut || "00:00"}</td>
                                    <td className="activitiestablerowcell">{calculatePresenceState((-1 * (timeSheet?.theorical - ((presence_day?.lastOut || (timeSheet?.break || 0)) - (presence_day?.firstIn|| 0) - (timeSheet?.break || 0)))), timeSheet?.theorical) || ""}</td>
                                    <td className="activitiestablerowcell">{timeSheet?.theorical}</td>
                                    <td className="activitiestablerowcell">{((presence_day?.lastOut || (timeSheet?.break || 0)) - (presence_day?.firstIn || 0) - (timeSheet?.break || 0)) }</td>
                                    <td className="activitiestablerowcell">{-1 * (timeSheet?.theorical - ((presence_day?.lastOut || (timeSheet?.break || 0)) - (presence_day?.firstIn|| 0) - (timeSheet?.break || 0))) }</td>
                                    <td className="activitiestablerowcell">{presence_day?.comment || ""}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan="2">{"Total de la Semaine N°" + selectedWeek}</th>
                            <th colSpan="3"></th>
                            <th>400</th>
                            <th>250</th>
                            <th>150</th>
                        </tr>
                    </tfoot>
                </table>
                </div>}
            </div>
        </div>
    )
}

export default Activities;