const form = document.querySelector("form");
const table = document.querySelector("table");
const sideBarLists = document.querySelectorAll(".side-bar-items li");
let role = 'regular';

sideBarLists.forEach(ele => {
    console.log(ele.id);
    ele.addEventListener('click',(e) => {
        sideBarLists.forEach(li => {
            if(li.id === ele.id){
                li.classList.add("activate");
            }else{
                li.classList.remove("activate");
            }
        })
        if(ele.id !== "mine"){
            axios.get("/task/admin",{
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("jwt-token")}`
                }
            }).then(resp => {
                updateTasks(resp.data.data);
            }).catch(err => {
                alert("Don't have permission");
                ele.classList.remove("activate");
            })
        }else{
            let rowCount = table.rows.length;
            for(let i=rowCount-1; i>0; i--){
                table.deleteRow(i);
            }
            loadTasks();
        }
    })
})

const editTask = async (id) => {
    try {    
        const updatedtask = prompt("Type the task");
        if(updatedtask && updatedtask.trim()){
            const resp = await axios.post(`/task/edit/${id}`,{task: updatedtask},{
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("jwt-token")}`
                }
            })
            return updatedtask;
        }
    } catch (error) {
        console.log(error);
    }
}

const deleteTask = async (id) => {
    try {    
            const resp = await axios.get(`/task/delete/${id}`,{
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("jwt-token")}`
                }
            })
            return "success";
    } catch (error) {
        console.log(error);
    }
}


const updateTasks = (tasks) => {
    tasks.forEach(task => {
        const row = table.insertRow(1);
        const cell1 = row.insertCell(0);
        cell1.innerHTML = task.username;

        const cell2 = row.insertCell(1);
        cell2.innerHTML = task.email;
        
        const cell3 = row.insertCell(2);
        cell3.innerHTML = task.task;
        
        const cell4 = row.insertCell(3);
        cell4.innerHTML = `<button style="margin-right: 5px; padding: 5px" id="edit-${task._id}">Edit</button> 
        <button style="padding: 5px;" id="delete-${task._id}">Delete</button>`;
        
        document.getElementById(`edit-${task._id}`).addEventListener("click",() => {
            editTask(task._id).then(data => {
                cell3.innerHTML = data;
            }).catch(err => {
                console.log(err);
            })
        })

        document.getElementById(`delete-${task._id}`).addEventListener("click",() => {
            deleteTask(task._id).then(data => {
                table.deleteRow(row.rowIndex);
            }).catch(err => {
                console.log(err);
            })
        })
    })
}

form.addEventListener("submit",async e => {
    try {    
        e.preventDefault();
        const resp = await axios.post("/task/create",form,{
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwt-token")}`
            }
        });
        console.log(resp.data.data);
        updateTasks([resp.data.data]);
    } catch (error) {
        console.log(error);
    }
})

window.onload = loadTasks;

async function loadTasks(){
    try {    
        const resp = await axios.get("/task/all",{
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwt-token")}`
            }
        })
        console.log(resp.data.data);
        role = resp.data.role;
        
        updateTasks(resp.data.data)
    } catch (error) {
        console.log(error);
    }
}
