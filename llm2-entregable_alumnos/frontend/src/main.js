import { tool, agent } from "llamaindex";
import { Ollama } from "@llamaindex/ollama";
import { z } from "zod";
import { Estudiantes } from "./lib/estudiantes.js";

// Configuración
const DEBUG = true;

// Instancia de la clase Estudiantes
const estudiantes = new Estudiantes();
estudiantes.cargarEstudiantesDesdeJson();

// System prompt básico
const systemPrompt = `
Sos un asistente para gestionar estudiantes.
Tu tarea es ayudar a consultar o modificar una base de datos de alumnos.
Usá las herramientas disponibles para:
- Buscar estudiantes por nombre o apellido
- Agregar nuevos estudiantes
- Mostrar la lista completa de estudiantes
Respondé de forma clara y breve. Si el alumno ya existe no lo vuelvas a agregar.
Es MUY importante que des la respuesta de manera sencilla, respondiendo directa y unicamente la tarea que se te dio sin explicar la forma en que lo pensaste.
`.trim();

const ollamaLLM = new Ollama({
    model: "qwen3:1.7b",
    temperature: 0.05,
    timeout: 2 * 60 * 1000, // Timeout de 2 minutos
});


// TODO: Implementar la Tool para buscar por nombre
const buscarPorNombreTool = tool({
    name: "buscarPorNombre",
    description: "Usa esta función para encontrar estudiantes por su nombre",
    parameters: z.object({
        nombre: z.string().describe("El nombre del estudiante a buscar"),
    }),
    execute: ({ nombre }) => {
        const estudianteNombre = estudiantes.buscarEstudiantePorNombre(nombre);
        return JSON.stringify(estudianteNombre);
    },
});

// TODO: Implementar la Tool para buscar por apellido
const buscarPorApellidoTool = tool({
    name: "buscarPorApellido",
    description: "Usa esta función para encontrar estudiantes por su apellido",
    parameters: z.object({
        apellido: z.string().describe("El apellido del estudiante a buscar"),
    }),
    execute: ({ apellido }) => {
        const estudianteapellido = estudiantes.buscarEstudiantePorApellido(apellido);
        return JSON.stringify(estudianteapellido);
    },
});

// TODO: Implementar la Tool para agregar estudiante
const agregarEstudianteTool = tool({
    name: "agregarEstudiante",
    description: "Usa esta función para agregar un nuevo estudiante",
    parameters: z.object({
        nombre: z.string().describe("El nombre del estudiante"),
        apellido: z.string().describe("El apellido del estudiante"),
        curso: z.string().describe("El curso del estudiante (ej: 4A, 4B, 5A)"),
    }),
    execute: ({ nombre, apellido, curso }) => {
        return estudiantes.agregarEstudiante(nombre, apellido, curso);
    },
});

// TODO: Implementar la Tool para listar estudiantes
const listarEstudiantesTool = tool({
    name: "listarEstudiantes",
    description: "Usa esta función para mostrar todos los estudiantes",
    parameters: z.object({}),
    execute: () => {
        return JSON.stringify(estudiantes.listarEstudiantes());
    },
});

// Configuración del agente
const elAgente = agent({
    tools: [buscarPorNombreTool, buscarPorApellidoTool, agregarEstudianteTool, listarEstudiantesTool],
    llm: ollamaLLM,
    verbose: DEBUG,
    systemPrompt: systemPrompt,
});


export default elAgente;
