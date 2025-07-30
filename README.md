# To-Do App

This is a simple, modern To-Do application built with React and Vite, designed to help users manage tasks efficiently. It features a clean interface, supports full CRUD operations (Create, Read, Update, Delete), and includes an undo feature for deleted tasks. Tasks are persisted using localStorage, ensuring they remain available across browser sessions. The app is deployed on Netlify for easy access.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Add Tasks:** Create new tasks with a text description.
- **View Tasks:** Display all tasks in a clean, organized list.
- **Edit Tasks:** Update existing task descriptions.
- **Delete Tasks with Undo:** Delete tasks and recover them with an undo option.
- **Persistent Storage:** Tasks are saved in the browser's localStorage, so they persist across page reloads.
- **Responsive Design:** Works on desktop and mobile browsers.
- **Fast Development:** Built with Vite for a speedy development experience.

## Demo

Check out the live app at [to-do-app-r.netlify.app](https://to-do-app-r.netlify.app). Try adding, editing, deleting tasks, and reloading the page to see persistence in action.

## Technologies

- **React:** JavaScript library for building the user interface.
- **Vite:** Fast build tool and development server.
- **JavaScript (ES6+):** Core programming language.
- **CSS:** Styling for the app’s interface.
- **localStorage:** Browser storage for task persistence.
- **Netlify:** Hosting platform for deployment.

## Prerequisites

To run or contribute to this project, you’ll need:

- **Node.js (v18 or later):** Install from [nodejs.org](https://nodejs.org).
- **Git:** Install from [git-scm.com](https://git-scm.com).
- A modern web browser (e.g., Chrome, Firefox).
- A code editor (e.g., VS Code).

## Installation

Follow these steps to set up the project locally:

1. Clone the Repository:

```bash
git clone https://github.com/infangle/to-do-app-r.git
cd to-do-app-r/to-do
```

2. Install Dependencies:

```bash
npm install
```

3. Run the Development Server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to see the app.

4. Build for Production:

```bash
npm run build
```

This creates a `dist` folder with production-ready files.

5. Preview the Build:

```bash
npm run preview
```

Open [http://localhost:4173](http://localhost:4173) to test the production build.

## Usage

- **Add a Task:** Enter a task in the input field and press Enter or click the "Add" button.
- **Edit a Task:** Click a task’s text to edit it, then save changes.
- **Delete a Task:** Click the delete button next to a task. An undo option appears briefly to recover it.
- **Persist Tasks:** Tasks are automatically saved to localStorage and persist across page reloads.
- **Clear Tasks:** (Optional feature, if implemented) Clear all tasks from the list and storage.

## Project Structure

```
to-do/
├── public/                # Static assets (e.g., index.html)
├── src/                   # Source code
│   ├── assets/            # Images or other static assets
│   ├── App.jsx            # Main React component
│   ├── App.css            # Styles for the app
│   ├── main.jsx           # Entry point for React
│   └── index.css          # Global styles
├── dist/                  # Production build output (generated)
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── netlify.toml           # Netlify deployment configuration
└── README.md              # Project documentation
```

## Deployment

The app is deployed on Netlify. To deploy your own version:

1. Push to GitHub:

Ensure your code is in a GitHub repository ([github.com/infangle/to-do-app-r](https://github.com/infangle/to-do-app-r)).

```bash
git add .
git commit -m "Update for deployment"
git push origin main
```

2. Set Up Netlify:

- Log in to [netlify.com](https://netlify.com) with GitHub.
- Click “New site from Git” > select `to-do-app-r` repository.
- Configure:
  - Branch: `main`
  - Base directory: `to-do`
  - Build command: `vite build`
  - Publish directory: `to-do/dist`

3. Deploy the site. The URL (e.g., `to-do-app-r.netlify.app`) will be provided.

### Troubleshooting

- **Blank Page:** Ensure `publish = "to-do/dist"` in `netlify.toml` or Netlify UI, and `base: "/"` in `vite.config.js`.
- **404 Errors:** Check DevTools Network tab for missing assets. Verify `dist/index.html` asset paths.
- **Build Fails:** Confirm `vite` is in `package.json` and Node version is compatible (e.g., 18).

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit changes (`git commit -m "Add feature"`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request on GitHub.

Please follow coding standards (e.g., Prettier, ESLint) and test locally before submitting.

## License

This project is licensed under the MIT License.
