document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    
    if (form) { // si el formulario no existe aquí no va a pasar nada
        form.addEventListener("submit", function(event) {
            event.preventDefault();

            const submitButton = this.querySelector('button[type="submit"]');
            submitButton.classList.add("loading"); // Añade clase de carga
            const formData = new FormData(this); // Crea los datos del formulario

            fetch('/send_email', { // Realiza la petición al servidor
                method: 'POST',
                body: formData
            })
                .then(response => response.text())
                .then(data => {
                    showFlashMessage("Mensaje enviado correctamente.", "success");
                    this.reset(); // Limpia el formulario
                })
                .catch(error => {
                    showFlashMessage("Hubo un error al enviar el mensaje.", "danger");
                    console.error("Error:", error);
                })
                .finally(() => {
                    submitButton.classList.remove("loading"); // Elimina la clase de carga
                });
        });
    }

    function showFlashMessage(message, category) {
        const flashContainer = document.getElementById("flash-messages");

        if (flashContainer) {
            const flashMessage = document.createElement("div");
            flashMessage.className = `alert ${category}`; // Usar backticks para template literal
            flashMessage.textContent = message;

            flashContainer.appendChild(flashMessage);

            setTimeout(() => {
                flashMessage.remove(); // Elimina el mensaje tras 5 segundos
            }, 5000);
        }
    }

// Seleccionar elementos del DOM
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

// Añadir evento de clic al botón "burger"
burger.addEventListener('click', () => {
    // Alternar la clase "active" en el menú
    navLinks.classList.toggle('active');
});
});

    // Inicializar el mapa con dos marcadores en la misma posición
    function initMap() {
        var local1 = {lat: -34.397, lng: 150.644};
        var local2 = {lat: -34.397, lng: 150.644};
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 10,
            center: local1
        });
        var marker1 = new google.maps.Marker({
            position: local1,
            map: map,
            title: 'Local 1'
        });
        var marker2 = new google.maps.Marker({
            position: local2,
            map: map,
            title: 'Local 2'
        });
    }