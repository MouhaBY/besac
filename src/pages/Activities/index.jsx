import { useState, useEffect } from 'react';
import { getISOWeek, nextSunday, previousMonday, isMonday, isSunday, formatISO, add, getDay } from 'date-fns';
import ActivitiesTable from '../../components/ActivitiesTable';
import './Activities.css';
import rightArrow from "../../assets/right-arrow.png";
import cross from "../../assets/cross.png";
import searching from "../../assets/searching.png";
import { presence, employees } from "./ActivitiesDetails";


const criterias = [
    {value:"matricule", name:"Matricule"}, 
    {value:"name", name:"Nom"}, 
    {value:"subname",name:"Prénom"}, 
    {value:"service",name:"Service"} 
]

const employeesHeaders = [{reference:"name", name:"Nom"}, {reference:"subname", name:"Prénom"}, {reference:"matricule", name:"Matricule"}, {reference:"service", name:"Service"}, {reference:"timesheet", name:"Feuille de temps"}, ]

function getYearsOptions(thisYear){
    const years = Array.from({length: 5}, (v, k) => thisYear-5+k+1);
    return years
}

function getWeeksNumberOptions(year){
    const lastDayWeekNumber = getISOWeek(new Date(year, 11, 28));
    const weeks = Array.from({length: lastDayWeekNumber}, (v, k) => k+1);
    return weeks
}

// Copié de la communauté
function getDateOfISOWeek(w, y) {
    var simple = new Date(y, 0, 1 + (w - 1) * 7);
    var dow = simple.getDay();
    var ISOweekStart = simple;
    if (dow <= 4)
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    return ISOweekStart;
}

function whatDay(day){
    switch(day){
        case 0 : return "Di.";
        case 1 : return "Lu.";
        case 2 : return "Ma.";
        case 3 : return "Me.";
        case 4 : return "Je.";
        case 5 : return "Ve.";
        case 6 : return "Sa.";
        default : return "error";
    }
}

function getDateCorrectFormat(date){
    if(date){
        let thisDate = date.getFullYear() + "-" + date.toLocaleDateString('fr-FR', { month: '2-digit',}) + "-" + date.toLocaleDateString('fr-FR', { day: '2-digit',});
        return thisDate
    }
    else return "----/--/--"
}


function Activities(){
    const [employeeCardOpened, setEmployeeCardOpened] = useState(true);
    const [periodCardOpened, setPeriodCardOpened] = useState(true);
    const [activitiesCardOpened, setActivitiesCardOpened] = useState(true);
    
    const [searchEmployee, setSearchEmployee] = useState("");
    const [criteria, setCriteria] = useState();
    const [employee, setEmployee] = useState();
    const [filteredEmployees, setFilteredEmployees] = useState([]);

    const [yearsOptions, setYearsOptions] = useState([])
    const [thisYearWeeks, setThisYearWeeks] = useState([])
    
    const [selectedYear, setSelectedYear] = useState();
    const [selectedWeek, setSelectedWeek] = useState();
    const [selectedDate, setSelectedDate] = useState();

    const [dateFrom, setDateFrom] = useState();
    const [dateTo, setDateTo] = useState();
    const [dateInterval, setDateInterval] = useState([]);
    const [daysInterval, setDaysInterval] = useState([]);

    const [userPresence, setUserPresence] = useState([]);


    useEffect(() => {
        let today = new Date();
        setYearsOptions( getYearsOptions(today.getFullYear()) );
        setSelectedDate(today);
    }, []);


    useEffect(() => {
        setThisYearWeeks( getWeeksNumberOptions(selectedYear) );
    }
    ,[selectedYear]);


    useEffect(() => {
        if (selectedYear && selectedWeek){
            let dateFromWeek = getDateOfISOWeek(selectedWeek,selectedYear);
            if (isMonday(dateFromWeek)){ setDateFrom(dateFromWeek)} else { setDateFrom(previousMonday(dateFromWeek)) }
            if (isSunday(dateFromWeek)){ setDateTo(dateFromWeek)} else { setDateTo(nextSunday(dateFromWeek)); }
        }
    }, [selectedYear,selectedWeek]);


    useEffect(() => {
        if(selectedDate){
            setSelectedYear( selectedDate.getFullYear() );
            setSelectedWeek( getISOWeek(selectedDate) );
        }
    }
    ,[selectedDate]);


    useEffect(() => {
        if (dateFrom){
            console.log(dateFrom)
            var date = dateFrom;
            var dates = [];
            var days = [];
            for(let i=0;i<7;i++){
                days.push(whatDay(getDay(date)));
                dates.push(formatISO(date, { representation: 'date' }));
                date = add(date, { days: 1 });
            }
            setDaysInterval(days);
            setDateInterval(dates);
        }
    }, [dateTo,dateFrom]);


    useEffect(() => {
        let employee_presence = presence.filter((present)=>(employee?._id === present.employee_id))
        setUserPresence(employee_presence)
    }, [employee]);


    function filterEmployees(){ setFilteredEmployees(employees) }

    const handleSubmit = (evt) =>{ evt.preventDefault(); }

    function clearEmployee(){
        setEmployee();
        setSearchEmployee("");
        setFilteredEmployees([]);
        setCriteria();
    }

    function calculateDates(evt){
        let date_value = new Date(evt.target.value);
        setSelectedDate( date_value );
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
                        { yearsOptions.map((year, index)=>
                        <option value={year} key={`year${index}`}>{year}</option>
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
                    <ActivitiesTable selectedWeek={selectedWeek} employee={employee} dateInterval={dateInterval} daysInterval={daysInterval} userPresence={userPresence} />
                </div>}
            </div>
        </div>
    )
}

export default Activities;