// Script para el mapa de la página web

document.addEventListener('DOMContentLoaded', (event) => {
    var map = L.map('map').setView([38.3452, -0.4844], 15);
// Centra el mapa en las Coordenadas de Plaza de los Luceros, Alicante
//-------------------------------------------------------------------------------------------------------------------------
//Añade la capa de OpenStreetMap al mapa. Como no tengo API Key de Google Maps, uso OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
//-------------------------------------------------------------------------------------------------------------------------
    var marker1 = L.marker([38.3452, -0.4844]).addTo(map)
        .bindPopup('Local 1<br>Plaza de los Luceros, Alicante')
        .openPopup();

    var marker2 = L.marker([ ﻿38.34523056, -0.48133056]).addTo(map)
        .bindPopup('Local 2<br>Ayuntamiento de Alicante')
        .openPopup();
});

// Seleccionar elementos del DOM
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

// Añadir evento de clic al botón "burger"
burger.addEventListener('click', () => {
    // Alternar la clase "active" en el menú
    navLinks.classList.toggle('active');
});