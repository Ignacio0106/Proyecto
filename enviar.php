<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = strip_tags(trim($_POST["nombre"] ?? ""));
    $correo = filter_var(trim($_POST["correo"] ?? ""), FILTER_SANITIZE_EMAIL);
    $telefono = strip_tags(trim($_POST["telefono"] ?? ""));
    $asunto = strip_tags(trim($_POST["asunto"] ?? ""));
    $tipo = strip_tags(trim($_POST["tipo"] ?? ""));
    $mensaje = strip_tags(trim($_POST["mensaje"] ?? ""));

    if (empty($nombre) || empty($correo) || empty($mensaje) || !filter_var($correo, FILTER_VALIDATE_EMAIL)) {
        echo "Por favor complete el formulario correctamente.";
        exit;
    }

    $destinatario = "arayaalfarosiriampaulina@gmail.com";
    $titulo = "Nuevo mensaje desde el formulario de contacto: " . ($asunto ?: "Sin asunto");

    $contenido = "Nombre: $nombre\n";
    $contenido .= "Correo: $correo\n";
    $contenido .= "Teléfono: $telefono\n";
    $contenido .= "Tipo de consulta: $tipo\n";
    $contenido .= "Mensaje:\n$mensaje\n";

    $cabeceras = "From: $nombre <$correo>";

    if (mail($destinatario, $titulo, $contenido, $cabeceras)) {
        echo "¡Gracias por contactarnos! Responderemos lo antes posible.";
    } else {
        echo "Hubo un problema al enviar el mensaje. Inténtelo nuevamente.";
    }
} else {
    echo "Método no permitido.";
}
?>
