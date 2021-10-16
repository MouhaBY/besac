export const bare_profiles_list = [
    {_id:"superadmin"   ,name:"Super administrateur", isActive:true}, 
    {_id:"admin"        ,name:"Administrateur",       isActive:true}, 
    {_id:"hrsecurtyhead",name:"Resp. Sécurité & RH",  isActive:true}, 
    {_id:"hrsecurity"   ,name:"Fonct. Sécurité & RH", isActive:true}, 
    {_id:"employee"     ,name:"Employé",              isActive:true}, 
    {_id:"guest"        ,name:"Visiteur",             isActive:false}
];

export const active_profiles_list = bare_profiles_list.filter(profile => profile.isActive)

export const getProfileName = (id) => {
    const myProfile = bare_profiles_list.find((profile) => (
        profile._id === id
    ));
    return myProfile?.name
}