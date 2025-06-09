// Gestión de estudiantes
import { readFileSync, writeFileSync } from 'fs';


const DATA_FILE = './data/alumnos.json';


class Estudiantes {
  constructor() {
    this.estudiantes = [];
  }
 
  cargarEstudiantesDesdeJson() {
    try {
        const data = JSON.parse(readFileSync(DATA_FILE, 'utf-8'));
        this.estudiantes = data.alumnos || [];
    } catch (e) {
        console.error("Error al leer el archivo de datos:", e);
    }
  }


  guardarEstudiantes() {
    try {
      writeFileSync(DATA_FILE, JSON.stringify({ alumnos: this.estudiantes }, null, 2));
      this.cargarEstudiantesDesdeJson();
    } catch (e) {
      console.error("Error al guardar los estudiantes:", e);
      throw new Error("No se pudo guardar la lista de estudiantes.");
    }
  }


  // TODO: Implementar método para agregar estudiante
  agregarEstudiante(nombre, apellido, curso) {
    // Tu código aquí
    try {
      const estudiante = { nombre, apellido, curso };
      let msj = "";
      const yaExiste = this.estudiantes.some(e => 
        e.nombre.trim().toLowerCase() === nombre.trim().toLowerCase() &&
        e.apellido.trim().toLowerCase() === apellido.trim().toLowerCase() &&
        e.curso.trim().toLowerCase() === curso.trim().toLowerCase()
      );
      
  
      if (!yaExiste) {
        this.estudiantes.push(estudiante);
        this.guardarEstudiantes();
        msj = "El nuevo estudiante ha sido agregado"
      }
      else
      {
         msj = "Ya está en la lista"
      }
     
      return msj;
    } catch (e) {
      console.error("Error al guardar los estudiantes:", e);
      throw new Error("No se pudo guardar la lista de estudiantes.");
    }
  }


  // TODO: Implementar método para buscar estudiante por nombre
  buscarEstudiantePorNombre(nombre) {
    console.log(this.estudiantes.filter(estudiante => estudiante.nombre === nombre))
    return this.estudiantes.filter(estudiante => estudiante.nombre === nombre);
  }


  // TODO: Implementar método para buscar estudiante por apellido
  buscarEstudiantePorApellido(apellido) {
    return this.estudiantes.filter(estudiante => estudiante.apellido === apellido);
  }


  // TODO: Implementar método para listar estudiantes
  listarEstudiantes() {
    console.log(this.estudiantes)
    return this.estudiantes;
  }
}


export { Estudiantes }




