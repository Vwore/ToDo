    var curid=1;
    var tasks= new Map();
    const forms=document.getElementById("addform");
    var data=document.getElementById('user_name');
    console.log(forms.one.value);
    forms.addEventListener('submit',submits);
    //subtask
    var subtask_count=1;
    var add_subtask=document.getElementById("add_subtask");
    add_subtask.addEventListener('click',addsubtask);

    //catergory
    var catergory=["general"];
    catergory_form();
    var form_id=document.getElementById('filter_form');
    form_id.addEventListener('submit',rerender)

    //sort
    document.getElementById('sort_form').addEventListener('submit',sort_submit);


function sort_submit(e)
{
    e.preventDefault();
    console.log('sort');
    var sortby=document.getElementById('sort_by').value;
    if(sortby =='deadline')  {  console.log('by deadline'); sortTasksByDeadline();}
    else if(sortby == 'priority')    { console.log('by deadline');  sortTasksBypriority();}
};

function sortTasksByDeadline() {
    
    var tasksArray = Array.from(tasks.entries());
    tasksArray.sort(function(a, b) {
      var deadlineA = new Date(a[1][1]);
      var deadlineB = new Date(b[1][1]);
      return deadlineA - deadlineB;
    });
    document.getElementById('task_list').innerHTML = '';
    tasksArray.forEach(function(pair) {
      create_task(pair[1], pair[0]);
    });
  }

function sortTasksBypriority()  {
    var tasksArray= Array.from(tasks.entries());
    tasksArray.sort(function (a,b) {
        var priority_1=a[1][5];
        var priority_2=b[1][5];
        return priority_2-priority_1;
    });
    document.getElementById('task_list').innerHTML = '';
    tasksArray.forEach(function(pair) {
        console.log(pair[0]);
      create_task(pair[1], pair[0]);
    });
}

// search
 let timer;
 function search_value_changed()
 {
    clearTimeout(timer);
    timer =setTimeout(search,500);
 }
  function search(){
    var search_value=document.getElementById('search_input').value;
    document.getElementById('task_list').innerHTML="";
    tasks.forEach(function (value,key) {
        //0 2
        if(value[0].includes(search_value))
        {
            create_task(value,key);
            return;
        }
        value[2].forEach(function (x) {
            if(x.includes(search_value)){
                create_task(value,key);
            return;
            }
        })
    })
  }



function catergory_form() {
    var select_option = document.getElementById("catergory");
    select_option.innerHTML="";
    catergory.forEach(function (catergory_name){
        var x=document.createElement("option");
        var y=document.createTextNode(catergory_name);
        x.value=catergory_name;
        x.appendChild(y);
        select_option.appendChild(x);
    });
};

function addsubtask(e)
{
    e.preventDefault();
    subtask_count++;
    var x=document.getElementById("Subtask");
    var div_x=document.createElement("input");
    div_x.id="subtask"+subtask_count;
    x.appendChild(div_x);
    console.log("subtask count is "+ subtask_count);
}
function submits(e){
	e.preventDefault();
    if(document.getElementById('one').value == "") {alert("Please enter the task");}
    else
    {   
        //task ={curid(key), [main task, date, subtask ,catergory,completed,priority}
        tasks.set(curid,[document.getElementById('one').value,document.getElementById('date').value,[]]);
        var array=tasks.get(curid);
            
        if(document.getElementById('subtask'+1).value!=""){
                for(let i=1;i<=subtask_count;i++)
                {
                // subtask element
                // console.log(document.getElementById("subtask"+i).value);
                array[2].push(document.getElementById("subtask"+i).value);
                }
        }
        let cat_value=document.getElementById("Catergory").value;
        if(cat_value!="")  {
            array.push(cat_value); 
            if (!catergory.includes(cat_value)) {
            catergory.push(cat_value);
            }
        }
        else    {array.push("general")};
        array.push(false);
        array.push(document.getElementById('priority').value);
        // console.log(array[3]);
        tasks.set(curid,array);
        // console.log((tasks.get(curid))[1]);
        create_task(tasks.get(curid),curid);
        document.getElementById('one').value = "";
        document.getElementById("Catergory").value="";
        subtask_count=1;
        catergory_form();
        curid++;
        var x= document.getElementById("Subtask");
        x.innerHTML="<div><label>Enter Subtask:</label> <input id='subtask1'></input> <button id='add_subtask' type='button'>+</button></div>";
        add_subtask=document.getElementById("add_subtask");    
        add_subtask.addEventListener('click',addsubtask);
  
    }
}

function edit_submit(e){
    e.preventDefault();
    var x=document.getElementById('editinput');
    // console.log(e.target.parentElement.id);
    var y=tasks.get((Number)(e.target.parentElement.id));
    y[0]=x.value;
    y[1]=document.getElementById("editdate").value;
    y[3]=document.getElementById("editCatergory").value;
    
    let cat_value=document.getElementById("editCatergory").value;
    console.log(cat_value+ "hi");
    if(cat_value!="")  {
        if (!catergory.includes(cat_value)) {
            console.log("itempushed");
        catergory.push(cat_value);
        }
    }
    document.getElementById('catergory').value=cat_value;
    tasks.set((Number)(e.target.parentElement.id),y);
    catergory_form();
    rerender(e);
}
function edit(id)
{
    // console.log('edit '+id);
    var x=document.getElementById(id);
    var y=document.getElementById(id+'1').textContent;
    console.log(y);
    // x.innerHTML="<form id='editform'><label>Enter the event</label><input id='editinput' }></input><input type='submit' value='SAVE' style='background-color: rgb(4, 105, 114); height: 35px; border-radius: 20px; color: white;' ></form>"; 
    x.innerHTML="<form id='editform' action='todo.js' class='form'><div style='display: flex;'><label id='user_name' for='main_task'>Enter the event:  </label><input type='text' id='editinput' name='main_task' style='width: 500px; height: 40px; '></div><div><label>Deadline:  </label><input type='date' id='editdate'></input> <label style='padding-left: 20px;'>Add Catergory:  </label><input  id='editCatergory'></input> </div><div id='editSubtask' style='display: flex; flex-direction: column;'><div><label>Enter Subtask:</label> <input id='editsubtask1'></input> <button id='editadd_subtask' type='button'>+</button></div></div><input type='submit' id='editsubmit' value='SAVE' style='background-color: rgb(4, 105, 114); height: 35px; border-radius: 20px; color: white;' ></form>"
    var edit_task=document.getElementById('editform');
    edit_task.addEventListener('submit',edit_submit);
}

function delete_task(id){
    // console.log(id);
   console.log(tasks.delete((Number)(id)));
   console.log(tasks.size);
   rerender();
}


function create_task(value,key)
{
    // tasklist->div_x->(div_y->(div_maintask,div),editbuton,delbutton)
    console.log(value[1]);
    
    const tasklist=document.getElementById("task_list");
    var div_x=document.createElement("div");
    var div_y=document.createElement("div");
    div_y.className="task_div";
    
    //maintask
    var div_maintask=document.createElement("div");
    div_maintask.style="display:flex; padding-right: 20px; align-items: center; font-size: 25px; font-weight:600;"
    var para= document.createElement("p");
    var text= document.createTextNode(value[0]);
    para.className="task_text";
    para.id=key+"1";
    para.appendChild(text);
    div_maintask.appendChild(para);
    var date=document.createElement("p");
    var date_text=document.createTextNode(value[1]);
    date.appendChild(date_text);
    date.style="font-size: 15px";
    var checkbox=document.createElement("input");
    var checkbox_label=document.createElement("label");
    var checkbox_text= document.createTextNode("completed");
    checkbox_label.appendChild(checkbox_text);
    checkbox_label.for="4"+key;
    checkbox_label.style="font-size: 15px;";
    checkbox.type="checkbox";
    checkbox.id=key+"4";

    checkbox.onchange= function(e)  {checkbox_changed(e);};
    div_maintask.appendChild(date);
    div_y.appendChild(div_maintask);
    
    
    //subtask
    for(let i=0;i<value[2].length;i++)
    {
        let subtask_p=document.createElement("li");
        subtask_p.className="subtask";
        let subtask_text=document.createTextNode(value[2][i]);
        subtask_p.appendChild(subtask_text);
        div_y.appendChild(subtask_p);
    }

    div_x.appendChild(div_y);
    div_x.appendChild(checkbox_label);
    div_x.appendChild(checkbox);
    div_x.id=key;
    //delete button
    var delbut = document.createElement("button");
    delbut.id=key+"2";
    var del_text=document.createTextNode("delete");
    delbut.className="del_button";
    delbut.appendChild(del_text);
    delbut.onclick= function (e) {delete_task(e.target.parentElement.id); };

    //edit button
    var editbut = document.createElement("button");
    editbut.id=key+"3";
    var edit_text=document.createTextNode("edit");
    editbut.className="del_button";
    editbut.appendChild(edit_text);
    editbut.onclick=function (e){ edit(e.target.parentElement.id); };

    div_x.appendChild(editbut);
    div_x.appendChild(delbut);
    div_x.className="task_element";
    tasklist.appendChild(div_x);

    // drag
    div_x.draggable = true; // Make the task element draggable
    div_x.addEventListener('dragstart', function (event) {
      // Set the data being dragged (in this case, the task ID)
      event.dataTransfer.setData('text/plain', key);
    });
}

function checkbox_changed(e){
    e.preventDefault();
    var id=e.target.id;
    var parentid=(Number)(e.target.parentElement.id);
    var x=document.getElementById(id);
    if(x.checked){
        (tasks.get(parentid))[4]=true;
        var bgcolor=document.getElementById((String)(parentid));
        bgcolor.style.backgroundColor="rgb(2, 83, 92)";
    }
    else{
        console.log("unchecked");
        (tasks.get(parentid))[4]=false;
        var bgcolor=document.getElementById((String)(parentid));
        bgcolor.style.backgroundColor="rgb(0, 150, 167)";
        // tasks[parentid][4]=false;
    }
}

function rerender(e)
{
    if(e!=null)   {e.preventDefault();}
    console.log('rerender '+ document.getElementById('catergory').value);
    document.getElementById('task_list').innerHTML="";
    tasks.forEach(function(value,key) 
    {
        var catergory=document.getElementById('catergory').value;
        var priority=document.getElementById('priority_filter').value;
        task_date=value[1].toString()
        var date1=document.getElementById('filter_date1').value;
        var date2=document.getElementById('filter_date2').value;
        console.log('date1 '+date1+'date2 '+date2);
        var date=true;
        console.log("date"+date);
        if(date2=="" && date1!="")    {date=(value[1]>=date1); console.log(1); }
        else if(date2!="" && date1=="")    {date=(value[1]<=date2); console.log(2);}
        else if(date2!="" && date1!="")    {date=(value[1]<=date2 && value[1]>=date1); console.log(4+" "+date);}
        if((catergory==value[3] || catergory=="all") && (priority=='none' || priority==value[5]) && date)
        {create_task(value,key);}
    })

}
