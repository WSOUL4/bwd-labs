/*

*/
$('#DialogInputBtn').click(AddTask);
function AddTask(){
    //var par=$(el).parent().attr('id');
    //var children = par.querySelectorAll('#DialogInput');
    let text=document.getElementById("DialogInput").value;

    //console.log(text);
    let table= document.getElementById("task_table");

    let row = document.createElement('tr');
    Text_td = document.createElement('td');
    Mark1_td = document.createElement('td');
    Mark2_td = document.createElement('td');

    Text_td.innerHTML=text;

    Text_td.innerHTML=Text_td.innerHTML+`<button class="del" onclick="DeleteTask(this)">Удалить задачу</button>`;
    /*b_del= document.createElement('button');
    b_del.className="del";
    b_del.innerHTML=`Удалить задачу`;
    b_del.onclick="DeleteTask();";*/



    Mark1_td.innerHTML=`<input type="checkbox" onclick="toInWork(this)" name="В работе" class="cb cbrab">`;
    Mark2_td.innerHTML=`<input type="checkbox" onclick="toDone(this)" name="Выполнена" class="cbdone">`;

    //Text_td.appendChild(b_del);
    row.appendChild(Text_td);
    row.appendChild(Mark1_td);
    row.appendChild(Mark2_td);

    table.appendChild(row);
    let dialog = document.getElementById('DialogTask'); 
    let bg = document.getElementById('darkenBg');
    $('.del').click(DeleteTask);
    $('.cbrab').click(toInWork);
    $('.cbdone').click(toDone);
    dialog.close();
    hide(bg);
    saveTable(document.getElementById("task_table"));
}
function toInWork(){
        if ($(this).is(':checked')) {
            p_td=getParent(this,'td');
            p_tr=getParent(p_td,'tr');
            let children = p_tr.querySelectorAll('td');
            //console.log(children);
            children[1].innerHTML=children[0].innerHTML;
            children[0].innerHTML="";
            $('.del').click(DeleteTask);
          //console.log("Checkbox is checked..")
            //this.remove();
        } else {
          //console.log("Checkbox is unchecked..")
        }

        saveTable(document.getElementById("task_table"));
      }


function toDone(){
    if ($(this).is(':checked')) {
        p_td=getParent(this,'td');
        p_tr=getParent(p_td,'tr');
        let children = p_tr.querySelectorAll('td');
       // console.log(children);


        if ( children[0].innerHTML==""){
        children[2].innerHTML=children[1].innerHTML;
        children[1].innerHTML="";
        $('.del').click(DeleteTask);
        
    } else if ( children[1].innerHTML==`<input type="checkbox" name="В работе" class="cb cbrab">`){
        children[2].innerHTML=children[0].innerHTML;
        children[1].innerHTML="";
        children[0].innerHTML="";
        $('.del').click(DeleteTask);
        }
       
      //console.log("Checkbox is checked..")
        //this.remove();
    } else {
      //console.log("Checkbox is unchecked..")
    }
    saveTable(document.getElementById("task_table"));
}
function toInWork(el){
    if ($(el).is(':checked')) {
        p_td=getParent(el,'td');
        p_tr=getParent(p_td,'tr');
        let children = p_tr.querySelectorAll('td');
        //console.log(children);
        children[1].innerHTML=children[0].innerHTML;
        children[0].innerHTML="";
        $('.del').click(DeleteTask);
      //console.log("Checkbox is checked..")
        //this.remove();
    } else {
      //console.log("Checkbox is unchecked..")
    }

    saveTable(document.getElementById("task_table"));
  }


function toDone(el){
if ($(el).is(':checked')) {
    p_td=getParent(el,'td');
    p_tr=getParent(p_td,'tr');
    let children = p_tr.querySelectorAll('td');
   // console.log(children);


    if ( children[0].innerHTML==""){
    children[2].innerHTML=children[1].innerHTML;
    children[1].innerHTML="";
    $('.del').click(DeleteTask);
    
} else if ( children[1].innerHTML==`<input type="checkbox" onclick="toInWork(this)" name="В работе" class="cb cbrab">`){
    children[2].innerHTML=children[0].innerHTML;
    children[1].innerHTML="";
    children[0].innerHTML="";
    $('.del').click(DeleteTask);
    }
   
  //console.log("Checkbox is checked..")
    //this.remove();
} else {
  //console.log("Checkbox is unchecked..")
}
saveTable(document.getElementById("task_table"));
}
function DeleteTask(){
    p_td=getParent(this,'td');
    p_tr=getParent(p_td,'tr');
   // console.log(p_tr);
   // console.log(this);
    p_tr.remove();
    saveTable(document.getElementById("task_table"));
}
function DeleteTask(el){
    p_td=getParent(el,'td');
    p_tr=getParent(p_td,'tr');
   // console.log(p_tr);
   // console.log(this);
    p_tr.remove();
    saveTable(document.getElementById("task_table"));
}

function saveTable(data){
      //const data = { key: "ваши данные" }; // Ваши данные
      localStorage.setItem("Table", JSON.stringify(data.innerHTML));
       // console.log(JSON.parse(localStorage.getItem("Table")));
}
function clearLocalTable(){
    localStorage.setItem("Table", JSON.stringify(""));
}