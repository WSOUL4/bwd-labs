document.getElementById('Main').onclick = OpenMain;
document.getElementById('TaskTable').onclick = OpenTaskTable;
document.getElementById('Projects').onclick = OpenProjects;
document.getElementById('About').onclick = OpenAbout;
document.getElementById('enter_task').onclick = OpenTaskDialog;
//document.getElementById('hide').onclick = CloseTaskDialog();
document.getElementById('Burger').onclick = OpenNavigation();


function OpenNavigation(){
    
    let menu = document.getElementById('BurgerMenu'); 
    let menubtn = document.getElementById('Burger'); 
    let bg = document.getElementById('darkenBg');
    //menu.style.animationName= 'NavPhones';
    //menu.style.animationDuration= '0.2s';
   // menu.style.animationTimingFunction= 'ease';
   //class="shpkatel"
  // bg.className='darkenBg vis';
    menu.className='shpkatel animated';
    menu.style.visibility='visible';
    show(bg);
    menubtn.className='trans openned';
    //bg.className='darkenBg vis';
    
    menubtn.addEventListener('click', (event) => {
        
        
            if(menubtn.classList.contains('openned')){
                //document.getElementById('darkenBg').className='darkenBg hid'; 
                hide(bg);

                menu.style.visibility='hidden'; 
                menu.className='shpkatel';
                menubtn.className='trans closed';
               
                
            }
                else if(menubtn.classList.contains('closed')){
                    menu.style.visibility='visible';
                    show(bg);
                    menubtn.className='trans openned';
                    menu.className='shpkatel animated';
                    
                }
    });
    window.addEventListener('click',(event)=>{
       // let bg = document.getElementById('darkenBg');
        if (!['Burger'].includes(event.target.id)) {

            if(menubtn.classList.contains('openned')){
                menu.style.visibility='hidden';
                menu.className='shpkatel';
                //bg.className='darkenBg hid'; 
                hide(bg);
                menubtn.className='trans closed';
        }
        }
        else {
            //bg.style.visibility='visible';
            //bg.style.display='block';
        }
    });
    




}










function OpenTaskDialog(){
    let dialog = document.getElementById('DialogTask'); 
    dialog.show();
    let el= document.getElementById('enter_task');
    let table=document.getElementById('task_table');
   // let menubtn = document.getElementsByClassName('shpkatelbtn shpkatel');
   // menubtn.style.zIndex='1';
    let bg = document.getElementById('darkenBg');
    bg.style.visibility='visible';
    bg.style.display='block';
    window.addEventListener('click', (event) => {


        if (!['DialogTask', 'enter_task','DialogH1','DialogForm','DialogInput','DialogInputBtn','Burger','DialogInputBtn','DialogPriority','DialogH2','DialogH3'].includes(event.target.id)) {

           // menubtn.style.zIndex='3';
            hide(bg);
            dialog.close();
            
        }
    });
}
function OpenMain() {
    let element = document.getElementById("Main"); // Найти элемент с id=

    window.open("./Main.html", "_self");
    /*
    document.getElementById("Main").setAttribute('disabled', true);
    document.getElementById("TaskTable").setAttribute('disabled', false);
    document.getElementById("Projects").setAttribute('disabled', false);
    document.getElementById("About").setAttribute('disabled', false);
   // let now = new Date();    // Получить текущее время
   // element.innerHTML = now.toLocaleTimeString(); // Отобразить время
   // setTimeout(displayTime, 1000);    // Вызывать функцию каждую секунду*/
}
function OpenTaskTable() {
    let element = document.getElementById("TaskTable"); // Найти элемент с id=
    window.open("./f1.html", "_self");
    /*
    document.getElementById("TaskTable").setAttribute('disabled', true);
    document.getElementById("Main").setAttribute('disabled', false);
    document.getElementById("Projects").setAttribute('disabled', false);
    document.getElementById("About").setAttribute('disabled', false);*/

}
function OpenProjects() {
    let element = document.getElementById("Projects"); // Найти элемент с id=
    window.open("./Projects.html", "_self");
    /*
    document.getElementById("Projects").setAttribute('disabled', true);
    document.getElementById("TaskTable").setAttribute('disabled', false);
    document.getElementById("Main").setAttribute('disabled', false);
    document.getElementById("About").setAttribute('disabled', false);*/

}
function OpenAbout() {
   // let element = document.getElementById("About"); // Найти элемент с id=
    window.open("./About.html", "_self");
    /*
    document.getElementById("About").setAttribute('disabled', true);
    document.getElementById("TaskTable").setAttribute('disabled', false);
    document.getElementById("Projects").setAttribute('disabled', false);
    document.getElementById("Main").setAttribute('disabled', false);*/

}