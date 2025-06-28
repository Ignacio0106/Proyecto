
  document.getElementById("contactoForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Previene el envío real del formulario

    // Mostrar mensaje de confirmación
    const mensajeDiv = document.getElementById("mensajeConfirmacion");
    mensajeDiv.textContent = "✅ ¡Gracias por contactarnos! Te responderemos pronto.";
    mensajeDiv.style.color = "#00ffff";
    mensajeDiv.style.marginTop = "1em";
    mensajeDiv.style.fontWeight = "bold";

    // Limpiar el formulario
    this.reset();
  });
