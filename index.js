let get_todos = () => {
	let todos = [];
	let todos_str = localStorage.getItem("todo");
	if (todos_str !== null) {
		todos = JSON.parse(todos_str);
	}
	return todos;
};

let add = () => {
	let task = document.getElementById("task").value;
	let todos = get_todos();
	todos.push(task);
	localStorage.setItem("todo", JSON.stringify(todos));
	task = document.getElementById("task").value = "";
	show();
};

function remove() {
	let id = this.getAttribute("id");
	let todos = get_todos();
	todos.splice(id, 1);
	localStorage.setItem("todo", JSON.stringify(todos));

	show();
}

function update() {
	let id = this.getAttribute("id");
	let todos = get_todos();
	let task = prompt("Edit Task", todos[id]);
	todos[id] = task;
	localStorage.setItem("todo", JSON.stringify(todos));
	show();
}

let show = () => {
	let todos = get_todos();

	let html = `<ul class='list-group'>`;
	for (let i = 0; i < todos.length; i++) {
		html += `<li class='list-group-item'> ${todos[i]}<i class="remove fas fa-trash" style="float: right; cursor: pointer;" id=${i}></i><i style="float: right; cursor: pointer; margin-right:20px;"; class="update fas fa-edit"  id=${i}>edit</i></li>`;
	}
	html += `</ul>`;

	document.getElementById("todos").innerHTML = html;

	let buttons = document.getElementsByClassName("remove");
	let update_button = document.getElementsByClassName("update");
	for (let i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener("click", remove);
		update_button[i].addEventListener("click", update);
	}
};

document.getElementById("add").addEventListener("click", add);
show();
