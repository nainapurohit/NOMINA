# Nomina ✨

A dynamic, responsive portfolio generator built with **React + Tailwind CSS**.

Nomina allows users to create a live, editable portfolio preview using a simple form interface.  
The project focuses on UI structuring, state management, and theme switching with a clean SaaS-style layout.

---

## 🚀 Features

- ⚡ Real-time portfolio preview
- 🎨 Light / Dark theme toggle
- 🧩 Reusable component-based form system
- 📱 Mobile-first responsive layout
- 🪄 Live skill parsing (comma-separated input → tags)
- 🧠 Structured portfolio sections:
  - Hero (Name + Bio)
  - About
  - Skills
  - Projects

---

## 🛠 Tech Stack

- React (Vite)
- Tailwind CSS
- JavaScript (ES6+)
- Functional Components + Hooks

---

## 📸 What the App Generates

Nomina creates a live portfolio preview containing:

- Hero section (Name + Bio)
- About section (template text)
- Skills section (dynamic tags)
- Projects section (expandable placeholders)

---

## 🎯 Purpose of the Project

This project was built to practice and demonstrate:

- React state management
- Controlled form inputs
- Component reusability
- UI structuring & layout design
- Theme switching using Tailwind CSS
- Building SaaS-style interfaces

---

## 🌗 Theme System

Nomina uses Tailwind’s **class-based dark mode**.

- Light mode → default styling
- Dark mode → `.dark` class applied to `<html>`

**Theme toggle logic:**

```js
document.documentElement.classList.toggle("dark");
```

---

## 🌗 Theme System

src/
├── components/
│ └── ui/
│ ├── Input.jsx
│ └── Textarea.jsx
├── App.jsx
├── main.jsx

---

## 💡 Key Learnings

- Building reusable UI components
- Managing form state with `useState`
- Creating live preview interfaces
- Structuring a React app like a real product
- Implementing theme switching without external libraries

---

## 🔮 Future Improvements

- Export portfolio as PDF
- Save templates locally using `localStorage`
- Add multiple portfolio themes
- Add project card builder
- Add drag-and-drop section ordering
- Backend integration for saving profiles

---

## 🧑‍💻 Author

Built as a learning + portfolio project focused on **frontend development and UI engineering**.

---

## 📌 Status

🚧 In active development  
UI phase completed → Feature expansion next.
