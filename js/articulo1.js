// Obtener ID único del blog desde el atributo data
const blogId = document.querySelector("main").getAttribute("data-blog-id");

// Referencias a elementos del DOM
const nombreInput = document.getElementById("nombre");
const comentarioInput = document.getElementById("comentario");
const enviarBtn = document.getElementById("boton");
const listaComentarios = document.getElementById("lista-comentarios");

// Configuración Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBMbS03YXelxtImddYi954A2CIT_IRlnUE",
  authDomain: "programa-27166.firebaseapp.com",
  databaseURL: "https://programa-27166-default-rtdb.firebaseio.com",
  projectId: "programa-27166",
  storageBucket: "programa-27166.firebasestorage.app",
  messagingSenderId: "672184644976",
  appId: "1:672184644976:web:f4eb4b9ab4e49cc4138bb5",
  measurementId: "G-5ZG0TRNC2E"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.database();

// Función para guardar comentario
function guardarComentario() {
  const nombre = nombreInput.value.trim();
  const comentario = comentarioInput.value.trim();

  if (!nombre || !comentario) return;

  db.ref(`comentarios/${blogId}`).push({
    usuario: nombre,
    comentario: comentario,
    fecha: new Date().toISOString()
  });

  nombreInput.value = "";
  comentarioInput.value = "";
}

// Escuchar los comentarios en tiempo real
db.ref(`comentarios/${blogId}`).on("value", (snapshot) => {
  listaComentarios.innerHTML = "";
  snapshot.forEach((child) => {
    const { usuario, comentario, fecha } = child.val();
    const fechaFormateada = new Date(fecha).toLocaleString("es-ES", {
      dateStyle: "short",
      timeStyle: "short"
    });

    const li = document.createElement("li");
    li.textContent = `${usuario} (${fechaFormateada}): ${comentario}`;
    listaComentarios.appendChild(li);
  });
});

// Hacer función global para que funcione en onclick del HTML
window.guardarComentario = guardarComentario;
