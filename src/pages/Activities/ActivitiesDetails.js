export const employees = [
    {
        _id:"1",
        name:"Mohammed",
        subname:"BEN YAHIA",
        matricule:"M010254",
        service:"Service ingenierie",
        timesheet:"Cadres",
        timesheetDetails:["1","1","1","1","1","2","3"],
    },
    {
        _id:"2",
        name:"Bouthaina",
        subname:"BOUHOULI",
        matricule:"M010255",
        service:"Service commercial",
        timesheet:"Administratif",
        timesheetDetails:["1","1","1","1","1","3","3"],
    }
]

export const presence = [
    {
        _id:"1",
        employee_id:"1",
        date:"18/10/2021",
        firstIn:8,
        lastOut:17,
        comment:"rien à signaler"
    },
    {
        _id:"2",
        employee_id:"1",
        date:"23/10/2021",
        firstIn:8,
        lastOut:12,
        comment:"Sortie anticipée via autorisation verbale"
    },
    {
        _id:"3",
        employee_id:"1",
        date:"19/10/2021",
        firstIn:8,
        lastOut:19,
        comment:"extra work"
    },
]

export const timesheet = [
    {
        _id:"1",
        name:"H. Cadres",
        firstIn:8,
        lastOut:17,
        theorical:8,
        break:1
    },
    {
        _id:"2",
        name:"Demi Repos",
        firstIn:8,
        lastOut:13,
        theorical:5,
        break:0
    },
    {
        _id:"3",
        name:"Jours Repos",
        firstIn:0,
        lastOut:0,
        theorical:0,
        break:0
    }
]