
	var curid=1;
    var tasks= new Map();
    const forms=document.getElementById("addform");
    var data=document.getElementById('user_name');
    console.log(forms.one.value);
    var y=1;
    forms.addEventListener('submit',submits);

function submits(e){
	e.preventDefault();
    tasks.set(curid,document.getElementById('one').value);
    create_task(document.getElementById('one').value,curid);
    curid++;
}

function delete_task(id){

   console.log(tasks.delete(Number(id)));
   console.log(tasks.size);
   rerender();
}
function create_task(value,key)
{
    const tasklist=document.getElementById("task_list");
    var div_x=document.createElement("div");
    var para= document.createElement("p");
    var text= document.createTextNode(value);
    para.appendChild(text);
    div_x.appendChild(para);
    var delbut = document.createElement("button");
    var del_text=document.createTextNode("delete");
    delbut.id=key;
    delbut.appendChild(del_text);
    delbut.onclick= function (e) {  delete_task(e.target.id); };
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