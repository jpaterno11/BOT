
# BOT - Proyecto Asistente Conversacional

Este proyecto es un asistente conversacional con frontend en **React + Vite** y backend en **Node.js + Express**.

---

## 📂 Estructura del proyecto

```

/llm2-entregable\_alumnos
├── frontend/      → Aplicación React
├── backend/       → API Node/Express

````

---

## 🚀 Cómo correr el proyecto

### ✅ 1. Clonar el repositorio
```bash
git clone https://github.com/tu_usuario/tu_repo.git
cd llm2-entregable_alumnos
npm install
npm i cors
npm i express
````

---

## ▶️ 2. Correr el Frontend (React + Vite)


```bash
npm run dev
```

Luego accedé en tu navegador a: [http://localhost:5173](http://localhost:5173)

---

## ▶️ 3. Correr el Backend (Node.js + Express)


```bash
npm run start
```

Servidor backend por defecto en: [http://localhost:3000](http://localhost:3000)

---
## 📚 Funcionalidades implementadas

* ✅ Selector de herramientas (Tools)
* ✅ Historial persistente en `localStorage`
* ✅ Personalización con nombre/avatar
* ✅ Selector de modelo y temperatura
* ✅ Soporte para Markdown en respuestas
* ✅ Tests básicos con Jest/Supertest

---

## 🛠️ Scripts útiles

| Comando       | Ubicación   | Descripción                    |
| ------------- | ----------- | ------------------------------ |
| `npm run dev` | `frontend/` | Levanta el frontend con Vite   |
| `npm start`   | `backend/`  | Levanta el backend (Express)   |
