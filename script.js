const STORAGE_KEY = "todo-list:v1";

const form = document.getElementById("form");
const input = document.getElementById("input");
const list = document.getElementById("list");
const empty = document.getElementById("empty");
const count = document.getElementById("count");
const clearBtn = document.getElementById("clear");
const filterBtns = document.querySelectorAll("[data-filter]");

const emptyMessages = {
  all: "Nothing here yet. Add your first task above.",
  active: "No active tasks. Nice work!",
  done: "No completed tasks yet.",
};

let todos = load();
let filter = "all";

function load() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch {
    // Storage unavailable (private mode or full): the list still works for this session.
  }
}

function createId() {
  return crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random());
}

function visibleTodos() {
  if (filter === "active") return todos.filter((t) => !t.done);
  if (filter === "done") return todos.filter((t) => t.done);
  return todos;
}

function render() {
  list.replaceChildren();

  for (const todo of visibleTodos()) {
    const li = document.createElement("li");
    li.className = "item" + (todo.done ? " is-done" : "");
    li.dataset.id = todo.id;

    const check = document.createElement("input");
    check.type = "checkbox";
    check.checked = todo.done;
    check.setAttribute("aria-label", `Mark "${todo.text}" as done`);

    const label = document.createElement("span");
    label.textContent = todo.text;

    const del = document.createElement("button");
    del.type = "button";
    del.className = "delete";
    del.textContent = "✕";
    del.setAttribute("aria-label", `Delete "${todo.text}"`);

    li.append(check, label, del);
    list.append(li);
  }

  const left = todos.filter((t) => !t.done).length;
  count.textContent = `${left} ${left === 1 ? "task" : "tasks"} left`;

  empty.hidden = list.children.length > 0;
  empty.textContent = emptyMessages[filter];

  clearBtn.hidden = !todos.some((t) => t.done);
  filterBtns.forEach((b) =>
    b.setAttribute("aria-pressed", String(b.dataset.filter === filter))
  );
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  todos.unshift({ id: createId(), text, done: false });
  input.value = "";
  save();
  render();
});

list.addEventListener("click", (e) => {
  const id = e.target.closest("li")?.dataset.id;
  if (!id) return;
  if (e.target.matches(".delete")) {
    todos = todos.filter((t) => t.id !== id);
  } else if (e.target.matches("input[type=checkbox]")) {
    const todo = todos.find((t) => t.id === id);
    todo.done = e.target.checked;
  } else {
    return;
  }
  save();
  render();
});

filterBtns.forEach((b) =>
  b.addEventListener("click", () => {
    filter = b.dataset.filter;
    render();
  })
);

clearBtn.addEventListener("click", () => {
  todos = todos.filter((t) => !t.done);
  save();
  render();
});

// Keep multiple open tabs in sync.
window.addEventListener("storage", (e) => {
  if (e.key === STORAGE_KEY) {
    todos = load();
    render();
  }
});

render();
