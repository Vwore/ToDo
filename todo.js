
	var curid=1;
    var tasks= [];
    const forms=document.getElementById("addform");
    var data=document.getElementById('1');
    console.log(forms.one.value);
    forms.addEventListener('submit',submits);

function submits(e){
	e.preventDefault();
    var curr={task: document.getElementById('one').value , id: curid};
    tasks.push(curr);
    console.log(tasks[curid-1].id);
    curid++;
}