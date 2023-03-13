let inp = document.querySelector(".form__input");
let btn = document.querySelector(".btn");
let ul = document.querySelector(".toDoList");

function getData() {
  fetch("https://crudapp-pwlck5pebq-el.a.run.app/api/todos")
    .then((res) => res.json())
    .then((data) =>
      data.todos.forEach((e) => {
        ul.innerHTML += `
            <li  style='${e.completed && "text-decoration: line-through"}'> ${
          e.title
        } <button  onclick='updateTodo(${JSON.stringify(
          e
        )})' class="button"><span>Completed</span></button>
             <button onclick='deleteTodo('${
               e._id
             }')' class="button"><span>Delete</span></button>
            </li>
        `;
      })
    );
}
getData();

function postTodo(id) {
  fetch("https://crudapp-pwlck5pebq-el.a.run.app/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: inp.value,
      completed: false,
    }),
  })
    .then((res) => {
      if ((res.status = 201)) {
        ul.innerHTML = "";
        getData();
      }
    })
    .catch((err) => console.log("ERROR" + err));
}

function deleteTodo(id) {
  fetch(`https://crudapp-pwlck5pebq-el.a.run.app/api/todos/${id}`, {
    method: "DELETE",
  }).then((res) => {
    if (res.status === 200) {
      ul.innerHTML = "";
      getData();
    }
  });
}

function updateTodo(value) {
  fetch(`https://crudapp-pwlck5pebq-el.a.run.app/api/todos/${value._id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...value,
      completed: value.completed == false ? true : false,
    }),
  }).then((e) => {
    if (e.status === 200) {
      ul.innerHTML = "";
      getData();
    }
  });
}

btn.addEventListener("click", postTodo);
