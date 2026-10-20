
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

// TODO: Configurar las clases CSS según la prioridad y el estado (completada)
    const texto = document.createElement('span');
    texto.textContent = tarea.titulo;

    if (tarea.completada) {
      texto.classList.add('completada');
    }

// TODO: Añadir un botón dentro de cada <li> para poder alternar el estado (Completada/Pendiente)
    const botonEstado = document.createElement('button');
    botonEstado.textContent = tarea.completada
      ? 'Marcar pendiente'
      : 'Completar';

    botonEstado.addEventListener('click', () => {
      tareas = tareas.map(t =>
        t.id === tarea.id
          ? { ...t, completada: !t.completada }
          : t
      );

      pintarTareas();
    });
// TODO: Inyectar el <li> resultante en listaContenedor usando .appendChild()
    li.appendChild(texto);
    li.appendChild(botonEstado);
    listaContenedor.appendChild(li);
  });
}

// 5. MANEJO DE EVENTOS: Captura de formulario
formulario.addEventListener('submit', event => {
  event.preventDefault();

// TODO: Capturar los valores de los inputs de forma segura
  const titulo = inputTitulo.value.trim();
  const prioridad = selectPrioridad.value;

  if (!titulo) return;

// TODO: Crear un nuevo objeto tarea inmutable con un id único (Date.now())
  const nuevaTarea = {
    id: Date.now(),
    titulo: titulo,
    prioridad: prioridad,
    completada: false
  };

// TODO: Añadir el objeto al array global de tareas de forma inmutable (operador spread)
  tareas = [...tareas, nuevaTarea];
  
// TODO: Volver a invocar pintarTareas() y resetear el formulario
  pintarTareas();
  formulario.reset();
});

// 6. MANEJO DE EVENTOS: Captura de botones de filtrado

botonesFiltro.forEach(boton => {
  boton.addEventListener('click', event => {
    document.querySelector('.btn-filtro.active')
      ?.classList.remove('active');

    const botonPulsado = event.currentTarget;
    botonPulsado.classList.add('active');

// TODO: Actualizar la variable 'filtroActual' con el atributo 'data-filtro' del botón
    filtroActual = botonPulsado.dataset.filtro;

    // TODO: Invocar pintarTareas() para refrescar la pantalla
    pintarTareas();
  });
});

// 7. Arrancar la aplicación
inicializarApp();
