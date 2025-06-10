from flask import Flask, render_template, request, flash, redirect, url_for
from flask_mail import Mail, Message
from dotenv import load_dotenv
import os
import logging

# Configuración básica de la app
load_dotenv()
app = Flask(__name__)

# Asegúrate de que la clave secreta sea configurada correctamente
app.secret_key = os.getenv("FLASK_SECRET_KEY", "Pruebas123")

# Configuración de Flask-Mail
app.config["MAIL_SERVER"] = "smtp.gmail.com" # Servidor SMTP de Gmail para enviar correo
app.config["MAIL_PORT"] = 587 # Puerto TLS de Gmail
app.config["MAIL_USE_TLS"] = True # Habilitar TLS para Gmail
app.config["MAIL_USERNAME"] = os.getenv("MAIL_USERNAME") # Correo de Gmail de origen para enviar el correo
app.config["MAIL_PASSWORD"] = os.getenv("MAIL_PASSWORD") # Contraseña de Gmail de origen para enviar el correo
app.config["MAIL_DEFAULT_SENDER"] = app.config["MAIL_USERNAME"] #

mail = Mail(app)

# Configuración de log para depuración
logging.basicConfig(level=logging.DEBUG)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/send_email", methods=["POST"])
def send_email():
    try:
        # Obtener datos del formulario
        nombre = request.form["nombre"]
        correo = request.form["correo"]
        mensaje = request.form["mensaje"]

        # Crear el mensaje de correo
        msg = Message("Nuevo mensaje de contacto",
                    sender=app.config["MAIL_USERNAME"],
                    recipients=[app.config["MAIL_USERNAME"]])
        
        # Definir el cuerpo del mensaje
        msg.body = f"Nombre: {nombre}\nCorreo: {correo}\n\nMensaje:\n{mensaje}"

        # Enviar el correo
        mail.send(msg)

        # Mostrar mensaje de éxito
        flash("Mensaje enviado correctamente.", "success")

        # Redirigir a la misma página para evitar reenvío accidental del formulario
        return redirect(url_for('index'))

    except Exception as e:
        # Mostrar mensaje de error
        flash("Ocurrió un error al enviar el mensaje, intenta de nuevo más tarde.", "danger")
        
        # Registrar el error en el log
        app.logger.error(f"Error al enviar el mensaje: {e}")
        print(f"Error: {e}")
        
        # Retornar la misma página
        return render_template("index.html")

# Ejecutar la app
if __name__ == "__main__":
    app.run(debug=True)
