//* Завдання 1: To do List
const taskInput = document.querySelector(".task-input");
const addTaskBtn = document.querySelector(".add-task-btn");
const taskList = document.querySelector(".task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const p = document.createElement("p"); 
    p.textContent = task.text;
    p.style.textDecoration = task.done ? "line-through" : "none";
    li.appendChild(p); 

    li.addEventListener("click", () => toggleTask(index));

    const editBtn = document.createElement("button");
    editBtn.textContent = "Редагувати";
    editBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      editTask(index);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Видалити";
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteTask(index);
    });

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ text, done: false });
    taskInput.value = "";
    saveTasks();
    renderTasks();
  }
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const newText = prompt("Редагуйте завдання:", tasks[index].text);
  if (newText) {
    tasks[index].text = newText.trim();
    saveTasks();
    renderTasks();
  }
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

addTaskBtn.addEventListener("click", addTask);
renderTasks();

//* Завдання 2: Форма збереження даних
const nameInput = document.querySelector(".name-input");
const ageInput = document.querySelector(".age-input");
const dataForm = document.querySelector(".data-form");

function loadFormData() {
  const formData = JSON.parse(localStorage.getItem("formData"));
  if (formData) {
    nameInput.value = formData.name || "";
    ageInput.value = formData.age || "";
  }
}

function saveFormData(e) {
  e.preventDefault();
  const formData = {
    name: nameInput.value.trim(),
    age: ageInput.value.trim(),
  };
  localStorage.setItem("formData", JSON.stringify(formData));
}

function editFormData() {
  const newName = prompt("Редагуйте ім'я:", nameInput.value);
  const newAge = prompt("Редагуйте вік:", ageInput.value);

  if (newName && newAge) {
    nameInput.value = newName;
    ageInput.value = newAge;
    saveFormData();
  }
}

dataForm.addEventListener("submit", saveFormData);
loadFormData();
//* Login
const loginForm = document.querySelector(".login__form");
const loginInput = document.querySelector(".login");
const passwordInput = document.querySelector(".password");
const messageDiv = document.querySelector(".message");

function checkUser(login) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  return users.some((user) => user.login === login);
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault(); 

  const login = loginInput.value.trim();
  const password = passwordInput.value.trim();

  if (!login || !password) {
    messageDiv.textContent = "Логін і пароль не можуть бути порожніми!";
    messageDiv.style.color = "red";
    return;
  }

  if (checkUser(login, password)) {
    messageDiv.textContent = "Цей логін уже використовується!";
    messageDiv.style.color = "red";
  } else {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ login, password });
    localStorage.setItem("users", JSON.stringify(users));
    messageDiv.textContent = "Користувач зареєстрований успішно!";
    messageDiv.style.color = "green";
  }

  loginInput.value = "";
  passwordInput.value = "";
});
document.addEventListener('DOMContentLoaded', () => {
    const savedUsers = JSON.parse(localStorage.getItem('users')) || [];
    if (savedUsers.length > 0) {
        messageDiv.textContent = 'Користувач знайдений в localStorage.';
        messageDiv.style.color = 'blue';
    } else {
        messageDiv.textContent = "Користувача не знайдено в localStorage.";
        messageDiv.style.color = 'red';
    }
});

//* Завдання 3: Закладки
const bookmarkInput = document.querySelector(".bookmark-input");
const addBookmarkBtn = document.querySelector(".add-bookmark-btn");
const bookmarkList = document.querySelector(".bookmark-list");

let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

function renderBookmarks() {
  bookmarkList.innerHTML = "";
  bookmarks.forEach((bookmark, index) => {
    const li = document.createElement("li");

    const p = document.createElement("p");
    const a = document.createElement("a");
    a.href = bookmark;
    a.textContent = bookmark;
    a.target = "_blank";
    p.appendChild(a);
    li.appendChild(p); 

    const editBtn = document.createElement("button");
    editBtn.textContent = "Редагувати";
    editBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      editBookmark(index);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Видалити";
    deleteBtn.addEventListener("click", () => {
      deleteBookmark(index);
    });

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    bookmarkList.appendChild(li);
  });
}

function addBookmark() {
  const url = bookmarkInput.value.trim();
  if (url) {
    bookmarks.push(url);
    bookmarkInput.value = "";
    saveBookmarks();
    renderBookmarks();
  }
}

function deleteBookmark(index) {
  bookmarks.splice(index, 1);
  saveBookmarks();
  renderBookmarks();
}

function editBookmark(index) {
  const newUrl = prompt("Редагуйте посилання:", bookmarks[index]);
  if (newUrl) {
    bookmarks[index] = newUrl.trim();
    saveBookmarks();
    renderBookmarks();
  }
}

function saveBookmarks() {
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

addBookmarkBtn.addEventListener("click", addBookmark);
renderBookmarks();

//* Завдання 4: Контакти
const contactForm = document.querySelector(".contact-form");
const contactList = document.querySelector(".contact-list");

let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

function renderContacts() {
  contactList.innerHTML = "";
  contacts.forEach((contact, index) => {
    const li = document.createElement("li");

    const p = document.createElement("p"); 
    p.textContent = `${contact.name} ${contact.surname} — ${contact.phone}, ${contact.email}`;
    li.appendChild(p); 

    const editBtn = document.createElement("button");
    editBtn.textContent = "Редагувати";
    editBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      editContact(index);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Видалити";
    deleteBtn.addEventListener("click", () => {
      deleteContact(index);
    });

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    contactList.appendChild(li);
  });
}

function addContact(e) {
  e.preventDefault();
  const name = document.querySelector(".contact-name").value.trim();
  const surname = document.querySelector(".contact-surname").value.trim();
  const phone = document.querySelector(".contact-phone").value.trim();
  const email = document.querySelector(".contact-email").value.trim();

  if (name && surname && phone && email) {
    contacts.push({ name, surname, phone, email });
    contactForm.reset();
    saveContacts();
    renderContacts();
  }
}

function deleteContact(index) {
  contacts.splice(index, 1);
  saveContacts();
  renderContacts();
}

function editContact(index) {
  const contact = contacts[index];
  const newName = prompt("Редагуйте ім'я:", contact.name);
  const newSurname = prompt("Редагуйте прізвище:", contact.surname);
  const newPhone = prompt("Редагуйте телефон:", contact.phone);
  const newEmail = prompt("Редагуйте email:", contact.email);

  if (newName && newSurname && newPhone && newEmail) {
    contacts[index] = {
      name: newName,
      surname: newSurname,
      phone: newPhone,
      email: newEmail,
    };
    saveContacts();
    renderContacts();
  }
}

function saveContacts() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

contactForm.addEventListener("submit", addContact);
renderContacts();
