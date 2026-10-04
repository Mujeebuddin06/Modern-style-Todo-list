<div align="center">

# ✅ Modern To-Do List

A minimal, glassmorphic to-do list that saves your tasks in the browser.
Plain HTML, CSS and JavaScript. No frameworks, no build step, no dependencies.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

<!-- Add a screenshot or GIF here: ![Preview](./preview.png) -->

</div>

---

## Features

- **Add, complete and delete** tasks
- **Filters** for All, Active and Done
- **Live counter** showing how many tasks are left
- **Clear completed** button, shown only when there is something to clear
- **Persistent storage**: tasks are saved with `localStorage` and survive refreshes and restarts
- **Multi-tab sync**: changes in one tab appear in other open tabs
- **Glassmorphism design** with a dusk-gradient background and neon accents
- **Responsive** from small phones to large desktops
- **Accessible**: labelled controls, visible keyboard focus and a live-updating counter
- **Safe input**: task text is inserted as plain text, so pasted HTML is never executed

## Getting started

Clone the repository and open the page:

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
```

Then either double-click `index.html`, or serve the folder locally:

```bash
# Python
python3 -m http.server 8000

# or Node
npx serve .
```

Visit `http://localhost:8000`.

> The Google Fonts stylesheet needs an internet connection. Offline, the app falls back to system fonts.

## Project structure

```
.
├── index.html   # Markup
├── style.css    # Styles and theme variables
└── script.js    # App logic and storage
```

## How it works

Tasks are kept in a single array of objects and rendered to the page after every change:

```js
{ id: "…", text: "Buy milk", done: false }
```

The array is saved as JSON under the `todo-list:v1` key in `localStorage`. On load, the app reads that key and falls back to an empty list if it is missing or unreadable. If storage is unavailable (some private-browsing modes, or a full quota), the app keeps working for the current session without saving.

## Customization

Colors and fonts are CSS variables at the top of `style.css`:

```css
:root {
  --bg-top: #2b1055;
  --bg-mid: #4a1d6e;
  --bg-bottom: #12082b;
  --accent: #00fff5;
  --danger: #ff4d8d;
}
```

**Add new tasks to the bottom** instead of the top by changing `unshift` to `push` in the submit handler in `script.js`.

**Reset saved data** by deleting the `todo-list:v1` key in your browser's developer tools (Application → Local Storage), or run this in the console:

```js
localStorage.removeItem("todo-list:v1");
```

## Browser support

Works in current versions of Chrome, Edge, Firefox and Safari. The frosted-glass effect uses `backdrop-filter`; browsers without it show a flat translucent card.

## Contributing

Issues and pull requests are welcome. For larger changes, please open an issue first to discuss what you'd like to change.

## License

Released under the [MIT License](./LICENSE). Add a `LICENSE` file to your repository if you don't have one yet.
