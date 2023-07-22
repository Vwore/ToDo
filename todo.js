    var curid=1;
    var tasks= new Map();
    const forms=document.getElementById("addform");
    var data=document.getElementById('user_name');
    console.log(forms.one.value);
    forms.addEventListener('submit',submits);
    var subtask_count=1;
    var add_subtask=document.getElementById("add_subtask");
    add_subtask.addEventListener('click',addsubtask);

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
        //task ={curid(key), [main task, date, subtask count,subtasks]}
        tasks.set(curid,[document.getElementById('one').value,document.getElementById('date').value,subtask_count]);
        var array=tasks.get(curid);
        for(let i=1;i<=array[2];i++)
        {
            // subtask element
            // console.log(document.getElementById("subtask"+i).value);
            array.push(document.getElementById("subtask"+i).value);
        }
        tasks.set(curid,array);
        // console.log((tasks.get(curid))[1]);
        create_task(tasks.get(curid),curid);
        document.getElementById('one').value = "";
        subtask_count=1;
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
    tasks.set((Number)(e.target.parentElement.id),y);
    rerender();
}

function delete_task(id){
    // console.log(id);
   console.log(tasks.delete((Number)(id)));
   console.log(tasks.size);
   rerender();
}
function edit(id)
{
    // console.log('edit '+id);
    var x=document.getElementById(id);
    var y=document.getElementById(id+'1').textContent;
    console.log(y);
    x.innerHTML="<form id='editform'><label>Enter the event</label><input id='editinput' }></input><input type='submit' value='SAVE' style='background-color: rgb(4, 105, 114); height: 35px; border-radius: 20px; color: white;' ></form>"; 
    var edit_task=document.getElementById('editform');
    edit_task.addEventListener('submit',edit_submit);
}

function create_task(value,key)
{
    // tasklist->div_x->(div_y->(div_maintask,div),editbuton,delbutton)
    console.log(value[1]);
    
    const tasklist=document.getElementById("task_list");
    var div_x=document.createElement("div");
    var div_y=document.createElement("div");
    div_y.className="task_div";
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
    div_maintask.appendChild(date);
    div_y.appendChild(div_maintask);

    for(let i=1;i<=value[2];i++)
    {
        console.log(value[2+i]);
        let subtask_p=document.createElement("li");
        subtask_p.className="subtask";
        let subtask_text=document.createTextNode(value[2+i]);
        subtask_p.appendChild(subtask_text);
        div_y.appendChild(subtask_p);
    }

    div_x.appendChild(div_y);
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
}
function rerender()
{
    console.log(typeof tasks);
    document.getElementById('task_list').innerHTML="";
    tasks.forEach(function(value,key) 
    {
        create_task(value,key);
    })
    console.log("stringify version");
    var xx=JSON.stringify(tasks);
    localStorage.setItem("tasks",xx);

}