export const profiles_list = [
    {_id:"superadmin"   ,name:"Super administrateur", isActive:true}, 
    {_id:"admin"        ,name:"Administrateur",       isActive:true}, 
    {_id:"hrsecurtyhead",name:"Resp. Sécurité & RH",  isActive:true}, 
    {_id:"hrsecurity"   ,name:"Fonct. Sécurité & RH", isActive:true}, 
    {_id:"employee"     ,name:"Employé",              isActive:true}, 
    {_id:"guest"        ,name:"Visiteur",             isActive:false}
];

export const getProfileName = (id) => {
    const myProfile = profiles_list.find((profile) => (
        profile._id === id
    ));
    return myProfile?.name
}