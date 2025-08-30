<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Juego de Rompecabezas</title>
        <link rel="stylesheet" href="css/estilo.css">
    </head>
    <body>
        <div class="main-container">
            <div class="container">
                <h2>🧩 Rompecabezas 4x4</h2>
                <p id="temporizador">⏱️ Tiempo: 0:00</p>
                <p class="instructions">Haz clic en una pieza adyacente al espacio vacío para moverla.</p>
                <div id="puzzle" class="puzzle"></div>
                <p id="mensaje"></p>
                <button class="restart-btn" onclick="reiniciar()">🔄 Reiniciar Juego</button>
            </div>
            <div class="image-container">
                <h3>🖼️ Imagen de Referencia</h3>
                <div class="image-box">
                    <img src="img/FondoGeneral.jpg" alt="Imagen del Rompecabezas Completo">
                </div>
            </div>
        </div>
        
        <div id="modal-overlay" class="modal-overlay">
            <div class="modal-content">
                <h3 id="modal-title"></h3>
                <p id="modal-text"></p>
                <button id="modal-restart" class="modal-restart">🎮 Jugar de Nuevo</button>
            </div>
        </div>
        
        <script src="js/script.js"></script>
    </body>
</html>