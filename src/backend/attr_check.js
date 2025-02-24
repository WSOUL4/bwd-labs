
function getParameterByName(name, url) {
    name = name.replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function api_check_id(request) {
    let id=getParameterByName('id',request.url);
    let id_num = undefined;
    id_num=Number(id);
    return id_num;
}
function api_check_user_creation(request){
    //name, email, "createdAt"
    let name= getParameterByName('name',request.url);
    let email= getParameterByName('email',request.url);
    let createdAt= getParameterByName('createdAt',request.url);
    //console.log(name,email,createdAt);
    if (email){

        var date_mass = createdAt.split('-');
        if(date_mass.length===3 && date_mass[0].length===4 && date_mass[1].length===2 && date_mass[2].length===2){
            if (Number(date_mass[0]) && Number(date_mass[1]) && Number(date_mass[2]) ){
                return {'name': name,'email': email,'createdAt': createdAt};
            }
        }

    } else {
        return undefined;
    }
}
export{api_check_id,getParameterByName,api_check_user_creation}