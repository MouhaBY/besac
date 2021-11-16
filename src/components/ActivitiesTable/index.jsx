//import { useState } from 'react';
import './ActivitiesTable.css';


function calculateWorkParams(firstIn, lastOut, breakTime, theorical){
    
    const workTime = (lastOut || breakTime || 0) - (firstIn || 0) - (breakTime || 0)

    const difference = -1 * (theorical - ((lastOut || (breakTime || 0)) - (firstIn || 0) - (breakTime || 0)));
    
    var workState = "OK";
    if (difference < 0){
        if (difference + theorical === 0) { workState = "Absence" }
        else  { workState = "Anomalie" }
    } 
    else if (difference > 0) { workState = "H. supplémentaires" } 
    
    return({ workTime, difference, workState })
}


function ActivitiesTable({ selectedWeek, employee, dateInterval, daysInterval, userPresence }){
    //const [theoricalTotal, setTheoricalTotal] = useState(0);

    return(
        <div>
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
                         dateInterval && dateInterval.map((d) =>{
                            var presence_day = userPresence.find(element => element.date === d);
                            var WorkParams = calculateWorkParams(presence_day?.firstIn, presence_day?.lastOut, employee?.timesheetDetails[dateInterval.indexOf(d)]?.break, employee?.timesheetDetails[dateInterval.indexOf(d)]?.theorical); 
                            //setTheoricalTotal(theoricalTotal + employee?.timesheetDetails[dateInterval.indexOf(d)]?.theorical);
                            return(
                                <tr key={d}>
                                    <td className="activitiestablerowcell">{ daysInterval[dateInterval.indexOf(d)] + " " + d || "" }</td>
                                    <td className="activitiestablerowcell">{ employee?.timesheetDetails[dateInterval.indexOf(d)].name || "" }</td>
                                    <td className="activitiestablerowcell">{ presence_day?.firstIn  || "00:00" }</td>
                                    <td className="activitiestablerowcell">{ presence_day?.lastOut  || "00:00" }</td>
                                    <td className="activitiestablerowcell">{ WorkParams?.workState }</td>
                                    <td className="activitiestablerowcell">{ employee?.timesheetDetails[dateInterval.indexOf(d)]?.theorical }</td>
                                    <td className="activitiestablerowcell">{ WorkParams?.workTime   || "0" }</td>
                                    <td className="activitiestablerowcell">{ WorkParams?.difference || "0" }</td>
                                    <td className="activitiestablerowcell">{ presence_day?.comment  || ""  }</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <th colSpan="2">{"Total de la Semaine N°" + selectedWeek}</th>
                        <th colSpan="3"></th>
                        <th>{400}</th>
                        <th>250</th>
                        <th>150</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default ActivitiesTable;