
    var curid=1;
    var tasks= new Map();
    const forms=document.getElementById("addform");
    var data=document.getElementById('user_name');
    console.log(forms.one.value);
    var y=1;
    forms.addEventListener('submit',submits);



function submits(e){
	e.preventDefault();
    if(document.getElementById('one').value == "") {alert("Please enter the task");}
    else
    {   tasks.set(curid,document.getElementById('one').value);
        create_task(document.getElementById('one').value,curid);
        document.getElementById('one').value = "";
        curid++;
    }
}

function edit_submit(e){
    e.preventDefault();
    var x=document.getElementById('editinput');
    // console.log(e.target.parentElement.id);
    tasks.set((Number)(e.target.parentElement.id),x.value);
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
    x.innerHTML="<form id='editform'><label>Enter the event</label><input id='editinput'></input><input type='submit' value='SAVE' style='background-color: rgb(4, 105, 114); height: 35px; border-radius: 20px; color: white;' ></form>"; 
    var edit_task=document.getElementById('editform');
    edit_task.addEventListener('submit',edit_submit);
}

function create_task(value,key)
{
    
    const tasklist=document.getElementById("task_list");
    var div_x=document.createElement("div");
    var para= document.createElement("p");
    var text= document.createTextNode(value);
    para.className="task_text";
    para.id=key+"1";
    para.appendChild(text);
    div_x.appendChild(para);
    div_x.id=key;
    //delete button
    var delbut = document.createElement("button");
    delbut.id=key+"2";
    var del_text=document.createTextNode("Completed");
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
    document.getElementById('task_list').innerHTML="";
    tasks.forEach(function(value,key) 
    {
        create_task(value,key);
    })

}