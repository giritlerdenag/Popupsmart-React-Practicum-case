
class UI {
  constructor() {
    this.lastUsers = document.getElementById("user-list");
    this.todos = document.getElementById("todo-list");
    this.userinput = document.getElementById("user-input");
    this.todoInput = document.getElementById("todo-text");
  }
  addUserToUI(username) {

    let users = Storage.getEnterUserFromStorage();

    if (users.indexOf(username) === -1) {
      const li = document.createElement("li");

      li.className = "list-group-item";
      li.textContent = username;

      this.lastUsers.appendChild(li);
    } else {
      alert("Eklemek İstediğiniz Kullancı Listede Mevcut");
    }
  }
  addTodoToUI(todo) {
    let result = 
    `
    <li class="list-group-item d-flex justify-content-between"><span class="badge bg-primary rounded-pill">${todo.id}</span><span>${todo.content}</span><a href="#" class="delete-item"><i class="fa-solid fa-pen-to-square"></i></a><a href="#" class="delete-item"><i class="fa fa-remove"></i></a></li>
    `;

    this.todos.innerHTML += result;

    

    // const listGroup = document.createElement("li");
    // const a = document.createElement("a")

    // listGroup.className = "list-group-item d-flex justify-content-between";
    // listGroup.textContent = todo;
    // a.href

    // this.todos.appendChild(listGroup);

  }
  clearUserInput(){
    this.userinput.value = "";
  }
  cearTodoInput(){
    this.todoInput.value = "";
  }
  addAllTodoToUI(todoContent){
    let result = "";
    todoContent.forEach(todo => {
      result += 
      `
      <li class="list-group-item d-flex justify-content-between"><span class="badge bg-primary rounded-pill">${todo.id}</span><span>${todo.content}</span><a href="#" class="delete-item"><i class="fa-solid fa-pen-to-square"></i></a><a href="#" class="delete-item"><i class="fa fa-remove"></i></a></li>
      `;
    });

    this.todos.innerHTML = result;
  }
  addTodoInfoToInput(targetTodo){
    const input = targetTodo

    this.todoInput.value= input;
  }
  updateTodoOnUI(updatedTodo, parent){
    parent.parentElement.innerHTML = 
    `
    <li class="list-group-item d-flex justify-content-between"><span class="badge bg-primary rounded-pill">${updatedTodo.id}</span><span>${updatedTodo.content}</span><a href="#" class="delete-item"><i class="fa-solid fa-pen-to-square"></i></a><a href="#" class="delete-item"><i class="fa fa-remove"></i></a></li>
    `;


    this.cearTodoInput();
  }
}




