const d = document.querySelector(`.day`)
const m = document.querySelector(`.month`)
const y = document.querySelector(`.year`)
const t = document.querySelector(`.time`)
function today () {
    const date = new Date()
    d.textContent=date.getDate()<10 ? `0`+ date.getDate() : date.getDate()
m.textContent=1+date.getMonth()<10 ? `0`+ (1+ date.getMonth()) : (1+ date.getMonth())
y.textContent=date.getFullYear()
let hour = `HH`
let min = `MM`
let sec = `SS`
hour= date.getHours()<10 ? `0`+ date.getHours() : date.getHours()
min=date.getMinutes()<10 ? `0`+ date.getMinutes() : date.getMinutes()
sec=date.getSeconds()<10 ? `0`+ date.getSeconds() : date.getSeconds()
let time = `${hour}:${min}:${sec}`
t.textContent = time
}
setInterval(today, 1000);

// to do list 
const forma = document.querySelector(`#forma-create`)
const messageEror = document.querySelector(`#message-create`)
const ulCreate = document.querySelector(`#list-group-todo`)
const modal = document.getElementById(`modal`)
const overlay = document.getElementById(`overlay`)
const editform = document.getElementById(`edit-form`)
const closemodal = document.getElementById(`close`)

let editId

let change = JSON.parse(localStorage.getItem(`list`)) ? JSON.parse(localStorage.getItem(`list`)) : []

if(change.length) showTodolist()


function setterTolocal () {
    localStorage.setItem(`list`, JSON.stringify(change))
}


function getTime (){
    const vaqt = new Date()
    const date =vaqt.getDate()<10 ? `0`+ vaqt.getDate() : vaqt.getDate()
    const month =vaqt.getMonth()<10 ? `0`+ vaqt.getMonth() : vaqt.getMonth()
    const year = vaqt.getFullYear()
    const hour = vaqt.getHours()<10 ? `0`+vaqt.getHours() : vaqt.getHours()
    const min = vaqt.getMinutes()<10 ? `0`+vaqt.getMinutes() : vaqt.getMinutes()
    return( `${hour}:${min}, ${date}/${month}/${year}`)
}
getTime()


function showTodolist (){
    let todo =JSON.parse(localStorage.getItem(`list`))
    ulCreate.innerHTML=``
    todo.forEach((item, i)=>{
        ulCreate.innerHTML+=`
        <li ondblclick="comleted(${i})" class="li-todo ${item.comleted==true ? `done` : ``}">
${item.text}
<div  class="list-li">
    <span class="todo-span">${item.time}</span>
    <img onclick=(edittodo(${i})) class="todo-edit" src="./edit.png" alt="edit" width="35" height="35">
    <img onclick=(deletetodo(${i})) class="delate-todo" src="./delete.png" alt="delete" width="35" height="35">
</div>
</li>
        `
    })
}

function showMessage(where, message){
    document.getElementById(`${where}`).textContent=message
    setTimeout(()=>{
        document.getElementById(`${where}`).textContent=``
    }, 2000)
}

/*  */

forma.addEventListener(`submit`, (e)=>{
    e.preventDefault()

    const formaText = forma[`input-create`].value.trim()
    forma.reset()
    if (formaText.length){
        change.push({text: formaText, time: getTime(), comleted: false})
        setterTolocal()
        showTodolist()
    } else {
        showMessage(`message-create`, `please write something`)
    }
})

function deletetodo(id){
    const deleted = change.filter((item, o) =>{
        return id !== o
        
    })
    change=deleted
    setterTolocal()
    showTodolist()
    }

    function comleted (id) {
        const comleted = change.map((item,i)=>{
            if (i==id ) {
                return {...item, comleted: item.comleted==true ? false : true }
            } else {
                return {...item}
            }
        })
        change=comleted
        setterTolocal()
        showTodolist()
    }

    editform.addEventListener(`submit`, (e)=>{
        e.preventDefault()
        
    const formaText = editform[`input-todo-modal`].value.trim()
    editform.reset()
    if (formaText.length){
        change.splice(editId, 1, {text: formaText, time: getTime(), comleted: false})
        setterTolocal()
        showTodolist()
        close()
    } else {
        showMessage(`edit-message`, `please write something`)
    }
    })

    function edittodo (id) {
        open ()
        editId=id
    }

    overlay.addEventListener(`click`, close)
    closemodal.addEventListener(`click`, close)
    document.addEventListener(`keydown`, (e)=>{
        if(e.which==27){
            close()
        }
    })


    function open () {
        modal.classList.remove(`hiddin`)
        overlay.classList.remove(`hiddin`)
    }

    function close () {
        modal.classList.add(`hiddin`)
        overlay.classList.add(`hiddin`)
    }