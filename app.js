
// 1. Estado de la aplicación (Datos iniciales que simulan venir de una base de datos)
let tareas = [
  { id: 1, titulo: 'Aprender la sintaxis de ES6', prioridad: 'Alta', completada: true },
  { id: 2, titulo: 'Dominar la asincronía y Fetch', prioridad: 'Media', completada: false },
  { id: 3, titulo: 'Migrar el proyecto a Angular', prioridad: 'Baja', completada: false }
];

let filtroActual = 'Todas';

// 2. Selectores del DOM principales
const formulario = document.querySelector('#form-tareas');
const inputTitulo = document.querySelector('#input-titulo');
const selectPrioridad = document.querySelector('#select-prioridad');
const listaContenedor = document.querySelector('#lista-tareas');
const loadingState = document.querySelector('#loading-state');
const botonesFiltro = document.querySelectorAll('.btn-filtro');

// 3. FUNCIÓN ASÍNCRONA (AJAX simulado): Debe ejecutarse al arrancar la web
// TODO: Simular una espera de 1.5 segundos usando una Promesa (setTimeout)
async function inicializarApp() {
  await new Promise(resolve => {
    setTimeout(resolve, 1500);
  });

// TODO: Una vez pasada la espera, ocultar el div #loading-state
  loadingState.style.display = 'none';

// TODO: Invocar a la función pintarTareas()
  pintarTareas();
}

// 4. FUNCIÓN DE RENDERIZADO: Encargada de pintar los nodos en el HTML
// TODO: Limpiar el contenedor listaContenedor (innerHTML = '')
function pintarTareas() {
  listaContenedor.innerHTML = '';

// TODO: Filtrar el array 'tareas' según el 'filtroActual' usando .filter()
  const tareasFiltradas = tareas.filter(tarea => {
    if (filtroActual === 'Pendientes') {
      return !tarea.completada;
    }

    if (filtroActual === 'Completadas') {
      return tarea.completada;
    }

    return true;
  });

// TODO: Recorrer el array filtrado y crear dinámicamente un elemento <li> por cada tarea
  tareasFiltradas.forEach(tarea => {
    const li = document.createElement('li');
    li.classList.add('item-tarea', tarea.prioridad);

