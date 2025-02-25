
function getParameterByName(name, url) {
    name = name.replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function isPostgreDate(date) {
    var date_mass = date.split('-');
    if(date_mass.length===3 && date_mass[0].length===4 && date_mass[1].length===2 && date_mass[2].length===2){
        if (Number(date_mass[0]) && Number(date_mass[1]) && Number(date_mass[2]) ){
            return true;
        } else {return false;}
    }else {return false;}

}
function api_check_id(request) {
    let id=getParameterByName('id',request.url);
    let id_num = undefined;
    id_num=Number(id);
    //console.log(id);
    return id_num;
}
function api_check_user_creation(request){
    //name, email, "createdAt"
    let name= getParameterByName('name',request.url);
    let email= getParameterByName('email',request.url);
    let createdAt= getParameterByName('createdAt',request.url);
    //console.log(name,email,createdAt);
    if (email){
        if (isPostgreDate(createdAt)){
            return {'name': name,'email': email,'createdAt': createdAt};
    } else {
        return undefined;
    }
}else {
        return undefined;
    }
}
function api_cheack_event_creation(request) {
    //title, description, date, "createdBy"
    let title= getParameterByName('title',request.url);
    let description= getParameterByName('description',request.url);
    let date= getParameterByName('date',request.url);
    let createdBy= getParameterByName('createdBy',request.url);
    if (title && Number(createdBy)){
        return {'title': title,'description': description,'date': date,'createdBy': createdBy};
    }else{
        return undefined;
    }

}

function api_cheack_event_change(request) {
    //title, description, date, "createdBy"
    let id =getParameterByName('id',request.url);
    let title= getParameterByName('title',request.url);
    let description= getParameterByName('description',request.url);
    let date= getParameterByName('date',request.url);
    let createdBy= getParameterByName('createdBy',request.url);
    if (id){
        if (title,description,isPostgreDate(date), Number(createdBy)){
        return {'id': id, 'title': title, 'description': description, 'date': date, 'createdBy': createdBy};
        }else{
        return undefined;}
    }else{
        return undefined;}
    }
    function api_check_events_date_between(request) {
    let startDate=getParameterByName('startDate',request.url);
    let endDate=getParameterByName('endDate',request.url);
    if (startDate && endDate){
        return {'startDate': startDate, 'endDate': endDate};
    }else{
        return undefined;}

    }
export{api_check_id,getParameterByName,api_check_user_creation,api_cheack_event_creation,api_cheack_event_change,api_check_events_date_between}