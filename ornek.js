//Elementleri Seçme
const userAddButton = document.getElementById("user-add-button");
const userInput = document.getElementById("user-input");
const todoAddButton = document.getElementById("add-button");
const todoEditButton = document.getElementById("edit-button");
const todoListButton = document.getElementById("list-button");
const todoInput = document.getElementById("todo-text");
const lastUsers = document.getElementById("user-list");
const task = document.getElementById("tasks");

//Obje Oluşturma
const request = new Request(
  "https://63160a725b85ba9b11ee28f1.mockapi.io/todos"
);
const ui = new UI();


let updateState = null;
eventListeners();

function eventListeners() {
  userAddButton.addEventListener("click", addUserToStorage);
  todoAddButton.addEventListener("click", addTodo);
  task.addEventListener("click", updateOrDelete);
  todoListButton.addEventListener("click", ListTodos);
  document.addEventListener("DOMContentLoaded", LoadAllUsersToUI);
  todoEditButton.addEventListener("click", updateEnd);
}

function LoadAllUsersToUI() {
  let users = Storage.getEnterUserFromStorage();

  users.forEach((user) => {
    const li = document.createElement("li");

    li.className = "list-group-item";
    li.textContent = user;

    lastUsers.appendChild(li);
  });
}
function addUserToStorage(e) {
  let username = userInput.value.trim();

  if (username === "") {
    alert("Lütfen Geçerli Bir Kullanıcı Adı Giriniz.");
  } else {
    ui.addUserToUI(username);
    Storage.addEnterUserFromStorage(username);
    ui.clearUserInput();
  }

  e.preventDefault();
}
function addTodo(e) {
  let todo = todoInput.value.trim();

  request.post({ content: todo, isCompleted: "False" })
    .then((todos) => {
      ui.addTodoToUI(todos);
      ui.cearTodoInput();
    })
    .catch((err) => console.error(err));

  e.preventDefault();
}
function updateOrDelete(e) {
  if (e.target.className === "fa fa-remove") {
    // Silme İşlemi
    deleteTodo(e.target);
  } else if (e.target.className === "fa-solid fa-pen-to-square") {
    // Güncelleme İşlemi
    updateTodo(
      e.target.parentElement.parentElement.children[1],
      e.target.parentElement.parentElement.children[0].textContent
    );
  }
}
function ListTodos() {
  request
    .get()
    .then((todos) => {
      ui.addAllTodoToUI(todos);
    })
    .catch((err) => console.error(err));
}
function updateTodo(targetTodo, selectedId) {
  ui.addTodoInfoToInput(targetTodo.textContent);
  if (updateState === null) {
    updateState = {
      id: selectedId,
      updateParent : targetTodo
    };
  } else {
    updateState = null;
  }
}
function updateEnd(selectedId) {
  const data = {content: todoInput.value.trim()}
  request.put(updateState.id, data)
  .then(updatedTodo => {
    ui.updateTodoOnUI(updatedTodo, updateState.updateParent);
  })
  .catch(err => console.error(err));
}
function deleteTodo(targetTodo){
  const selectedId = targetTodo.parentElement.parentElement.children[0].textContent;

    request
      .delete(selectedId)
      .then((message) => {
        ListTodos();
        alert("Todo Temizlendi. ");
      })
      .catch((err) => console.error(err));
}