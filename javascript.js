// ດຶງ Elements

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Task ທີ່ກຳລັງແກ້ໄຂ (null = ບໍ່ໄດ້ແກ້ໄຂ)
let editingSpan = null;

// ເພີ່ມ ຫຼື ອັບເດດ Task
function submitTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("ກະລຸນາໃສ່ Task ກ່ອນ!");
    taskInput.focus();
    return;
  }

  if (editingSpan) {
    editingSpan.textContent = taskText;
    stopEdit();
  } else {
    addTask(taskText);
  }
  taskInput.value = "";
  taskInput.focus();
}

// ເພີ່ມ Task ໃນ List
function addTask(taskText) {
  const li = document.createElement("li");
  li.className = "task-item";

  // ຂໍ້ຄວາມ Task (ກົດເພື່ອໝາຍວ່າເຮັດແລ້ວ)
  const span = document.createElement("span");
  span.className = "task-text";
  span.textContent = taskText;
  span.addEventListener("click", () => {
    li.classList.toggle("completed");
  });
  li.appendChild(span);

  // ກ່ອງປຸ່ມ
  const actions = document.createElement("div");
  actions.className = "task-actions";

  // ເພີ່ມ Button ແກ້ໄຂ: ເອົາຂໍ້ຄວາມໄປໃສ່ຊ່ອງ input ດ້ານເທິງ
  const editBtn = document.createElement("button");
  editBtn.className = "edit-btn";
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", () => {
    startEdit(li, span);
  });
  actions.appendChild(editBtn);

  // ເພີ່ມ Button ລຶບ
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => {
    if (editingSpan === span) {
      stopEdit();
      taskInput.value = "";
    }
    taskList.removeChild(li);
  });
  actions.appendChild(deleteBtn);

  li.appendChild(actions);
  taskList.appendChild(li);
}

// ເລີ່ມແກ້ໄຂ: ປຸ່ມ "ເພີ່ມ" ປ່ຽນເປັນ "ອັບເດດ"
function startEdit(li, span) {
  stopEdit();
  editingSpan = span;
  li.classList.add("editing");
  taskInput.value = span.textContent;
  addBtn.textContent = "ອັບເດດ";
  addBtn.classList.add("update-mode");
  taskInput.focus();
  taskInput.select();
}

// ຈົບການແກ້ໄຂ: ປຸ່ມກັບເປັນ "ເພີ່ມ"
function stopEdit() {
  if (editingSpan) {
    editingSpan.parentElement.classList.remove("editing");
  }
  editingSpan = null;
  addBtn.textContent = "ເພີ່ມ";
  addBtn.classList.remove("update-mode");
}

addBtn.addEventListener("click", submitTask);

// ກົດ Enter ເພື່ອເພີ່ມ/ອັບເດດ, ກົດ Esc ເພື່ອຍົກເລີກການແກ້ໄຂ
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    submitTask();
  } else if (e.key === "Escape" && editingSpan) {
    stopEdit();
    taskInput.value = "";
  }
});
