// Get references to the input field, button, and task list elements in the HTML
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

// Add event listener to the "Add Task" button, which will trigger the addTask function when clicked
addTaskBtn.addEventListener("click", addTask);

// Function to add a task to the list
function addTask() {
  // Get the text entered in the input field, and trim it to remove extra whitespace
  const taskInputText = taskInput.value.trim();

  // If the input field is empty, alert the user and exit the function
  if (taskInputText === "") {
    alert("Please enter a task");
    return;
  }

  // Create a new task item (list element) using the entered text
  const taskItem = createTaskElement(taskInputText);

  // Add the new task to the task list in the HTML
  taskList.appendChild(taskItem);

  // Save the task to the local storage
  saveTaskToStorage(taskInputText);

  // Clear the input field after adding the task
  taskInput.value = "";
}

// Function to create a new task list item element
function createTaskElement(taskText) {
  // Create a new <li> element for the task
  const listElement = document.createElement("li");

  // Set the task text as the content of the list item
  listElement.textContent = taskText;

  // Create a "Delete" button for the task
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");

  // Attach an event listener to the delete button to handle task removal
  deleteBtn.onclick = removeTask;

  // Add the delete button to the list item
  listElement.appendChild(deleteBtn);

  // Return the fully constructed list item
  return listElement;
}

// Function to remove a task when the delete button is clicked
function removeTask(event) {
  // Find the parent <li> element (the task item) of the clicked delete button
  const taskListItem = event.target.parentElement;

  // Remove the task item from the task list in the HTML
  taskList.removeChild(taskListItem);

  // Delete the task from local storage using the task's text content
  deleteTask(taskListItem.firstChild.textContent);
}

// Load tasks from local storage if they exist, or initialize an empty array
let tasksFromStorage = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to save a task to local storage
function saveTaskToStorage(savedTaskText) {
  // Add the new task text to the array of stored tasks
  tasksFromStorage.push({ text: savedTaskText });

  // Update local storage with the new task list, converting the array to a JSON string
  localStorage.setItem("tasks", JSON.stringify(tasksFromStorage));
}

// Function to delete a task from local storage
function deleteTask(deleteTaskText) {
  // Filter the array of tasks to remove the one with matching text
  tasksFromStorage = tasksFromStorage.filter(
    (task) => task.text !== deleteTaskText
  );

  // Update local storage with the modified task list
  localStorage.setItem("tasks", JSON.stringify(tasksFromStorage));
}

// Function to load all saved tasks from local storage and display them in the task list
function loadTasks() {
  // For each task in the stored tasks array, create and display the task item
  tasksFromStorage.forEach((task) => {
    const storedTaskItem = createTaskElement(task.text);
    taskList.appendChild(storedTaskItem);
  });
}

// Load all tasks from local storage when the page is first loaded
window.addEventListener("load", loadTasks);
