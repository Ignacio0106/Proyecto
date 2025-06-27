
// 1. Configura tu Firebase
  const firebaseConfig = {
  apiKey: "AIzaSyDruI3u1bE7QTIZC0_a-9qZBD91gRZwXDA",
  authDomain: "proyecto-3dba2.firebaseapp.com",
  projectId: "proyecto-3dba2",
  storageBucket: "proyecto-3dba2.firebasestorage.app",
  messagingSenderId: "662505424507",
  appId: "1:662505424507:web:05eaf1b16ac1b6cc61c4de",
  databaseURL: "https://console.firebase.google.com/u/1/project/proyecto-3dba2/database/proyecto-3dba2-default-rtdb/data/~2F"
};

firebase.initializeApp(firebaseConfig);
  const db = firebase.database();

  // Guardar comentario
  function guardarComentario() {
    const nombre = document.getElementById("nombre").value.trim();
    const texto = document.getElementById("comentario").value.trim();
    if (!nombre || !texto) return;

db.ref("comentarios").push({
  usuario: nombre,
  comentario: texto,
  fecha: new Date().toISOString()
});

document.getElementById("nombre").value = "";
document.getElementById("comentario").value = "";
  }

  // Mostrar comentarios
  db.ref("comentarios").on("value", (snapshot) => {
    const lista = document.getElementById("lista-comentarios");
    lista.innerHTML = "";
    snapshot.forEach((child) => {
      const { usuario, comentario, fecha } = child.val();
      const fechaFormateada = new Date(fecha).toLocaleString("es-ES", {
        dateStyle: "short", timeStyle: "short"
      });
      const item = document.createElement("li");
      item.innerHTML = `<strong>${usuario}</strong>: ${comentario} <br><small>${fechaFormateada}</small>`;
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