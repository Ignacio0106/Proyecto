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
    if (usuario === "") return;
  const texto = document.getElementById("comentario").value.trim();
  if (texto === "") return;
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
    item.textContent = child.val().usuario + ": " + child.val().comentario + " (" + fechaFormateada + ")";
    lista.appendChild(item);
  });
});

/* Por si se necesita eliminar el ultimo comentario
Hay que agregar esto al html
   <button onclick="eliminarUltimoComentario()">Eliminar Último Comentario</button>  */
/* function eliminarUltimoComentario() {
  // 1. Obtener la referencia a los comentarios
  const comentariosRef = db.ref("comentarios");

  // 2. Consultar la base de datos para obtener el último comentario
  //    orderByKey(): Ordena los elementos por su clave (que son timestamps generados por push())
  //    limitToLast(1): Trae solo el último elemento de la consulta ordenada
  comentariosRef.orderByKey().limitToLast(1).once("value")
    .then((snapshot) => {
      if (snapshot.exists()) {
        // Si hay un comentario, obtenemos su clave
        let ultimaClave = null;
        snapshot.forEach((child) => {
          ultimaClave = child.key; // Esto solo iterará una vez, obteniendo la clave del último
        });

        if (ultimaClave) {
          // 3. Eliminar el comentario usando la clave obtenida
          comentariosRef.child(ultimaClave).remove()
            .then(() => {
              console.log("Último comentario eliminado con éxito. Clave:", ultimaClave);
              // Aquí podrías actualizar la interfaz de usuario si es necesario,
              // aunque el 'on("value")' debería manejar la actualización automáticamente.
            })
            .catch((error) => {
              console.error("Error al eliminar el último comentario:", error);
              // Mostrar un mensaje de error al usuario
            });
        }
      } else {
        console.log("No hay comentarios para eliminar.");
      }
    })
    .catch((error) => {
      console.error("Error al obtener el último comentario:", error);
    });
} */