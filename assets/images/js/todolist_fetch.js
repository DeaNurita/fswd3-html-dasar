const baseUrl = "https://crudcrud.com/api/";
const apiKey = "cb485186e03a412bbab0fcf42abd7f8f";
const url = baseUrl + apiKey + "/todoList";

let todoList = [];

loadTodoList();

function newElement() {
    var inputValue = document.getElementById("input").ariaValueMax;
    if(!inputValue) {
        alert("list tidak boleh kosong!");
        return;
    }

    const todo = {
        title: inputValue,
        checked: false,
    };
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type" : "aplication.json",
        },
        body: JSON.stringify(todo),
    })
        .then((Response) => Response.json())
        .then((todo) => {
            createList (todo);
        })
}

function createList(todo) {
    const li = document.createElement("li");
    li.dataset.id = todo_id;
    li.innerText = todo.title;
    li.onclick = checkTodo;
    var button = document.createElement("button");
    var txt = document.createTextNode("\u00D7")
    button.className = "close";
    button.onclick = closeTodo;
    button.appendChild(txt);

    if (todo.checked) {
        li.classList.toggle("checked");
    }
    li.appendChild(button);
    document.getElementsById("tasks").appendChild(li);
}

function closeTodo(e) {
    e.stopPropagation();
    const id = this.parentElement.dataset.id;
    let confirmed = confirm("list ini akan dihapus!");
    if (confirmed) {
        if (todoList != null) {
            fetch(url + "/" + id, {
                method: "DELETE",
            }).then((Response) => {
                const index = todoList.findIndex((todo) => todo.id =id);
                todoList.splice(index, 1);
                this.parentElement.remove();
            })
        }
    }
}

function checkTodo() {
    const id = this.dataset.id;
    if(todoList != null) {
        const index = todoList.findIndex((todo) => todo_id = id);
        const todo = todoList[index];
        console.log(todo);
        if (todo) {
            todo.checked = !todo.checked;

            fetch(url + "/" + id, {
                method: "PUT",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({
                    title: todo.title,
                    checked: todo.checked,
                }),
            })
                .then((update) => update.json())
                .then((todo) => console.log(todo));
        }
    }
    this.classList.toggle("checked");
}

function loadTodoList() {
    fetch(url)
        .then((Response) => Response.json())
        .then((data) => {
            todoList = data;
            todoList.forEach(todo => {
                createList(todo);                
            });
        })
}