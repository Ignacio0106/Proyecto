// 1. Configura tu Firebase
const firebaseConfig = {
  databaseURL: "https://proyecto-64740-default-rtdb.firebaseio.com/",
  apiKey: "AIzaSyAu20FX65lH1e2wF1WZrAxqD51fkwU8tEI",
  authDomain: "proyecto-64740.firebaseapp.com",
  projectId: "proyecto-64740",
  storageBucket: "proyecto-64740.firebasestorage.app",
  messagingSenderId: "477836688647",
  appId: "1:477836688647:web:f0203c7efb9931cab059a2",
  measurementId: "G-1QH9DYH30Y"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// 2. Guardar comentario
function guardarComentario() {
  const usuario = document.getElementById("nombre").value.trim();
  const texto = document.getElementById("comentario").value.trim();
  if (!usuario || !texto) return;

  const nuevoComentario = db.ref("comentarios").push();
  nuevoComentario.set({
    usuario: usuario,
    comentario: texto,
    fecha: new Date().toISOString()
  });

  document.getElementById("comentario").value = "";
  document.getElementById("nombre").value = "";
}

// 3. Mostrar comentarios en tiempo real
db.ref("comentarios").on("value", (snapshot) => {
  const lista = document.getElementById("lista-comentarios");
  lista.innerHTML = "";
  snapshot.forEach((child) => {
    const { usuario, comentario, fecha } = child.val();
    const item = document.createElement("li");
    const fechaFormateada = new Date(fecha).toLocaleString("es-ES", {
      dateStyle: "short", timeStyle: "short"
    });
    item.textContent = `${usuario} (${fechaFormateada}): ${comentario}`;
    lista.appendChild(item);
  });
});

/* firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// 2. Guardar comentario
function guardarComentario() {
  const usuario = document.getElementById("nombre").value;
    if (usuario.trim() === "") return;
  const texto = document.getElementById("comentario").value;
  if (texto.trim() === "") return;
  const nuevoComentario = db.ref("comentarios").push();
  nuevoComentario.set({
    usuario: usuario,
    comentario: texto,
    fecha: new Date().toISOString()
  });
  document.getElementById("comentario").value = "";
}

// 3. Mostrar comentarios en tiempo real
db.ref("comentarios").on("value", (snapshot) => {
  const lista = document.getElementById("lista-comentarios");
  lista.innerHTML = "";
  snapshot.forEach((child) => {
    const item = document.createElement("li");
    item.textContent = child.val().usuario + ": " + child.val().comentario;
    lista.appendChild(item);
  });
});
  */