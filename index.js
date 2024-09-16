$(document).ready(function() {
    // Toggle menu on mobile when hamburger icon is clicked
    $(".hamburger-lines").click(function () {
        $("#navbar-toggle").prop("checked", !$("#navbar-toggle").prop("checked"));
    });

    // Close menu on mobile when clicking outside of it
    $(document).click(function (event) {
        if (!$(event.target).closest(".navbar-container").length && !$(event.target).is(".hamburger-lines")) {
            $("#navbar-toggle").prop("checked", false);
        }
    });

    // Smooth scrolling to anchor links
    $(".menu-items a").on("click", function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            var offset = $(hash).offset().top - $(".navbar").height() - 10;

            $("html, body").animate({
                scrollTop: offset
            }, 800, function() {
                window.location.hash = hash;
                $("#navbar-toggle").prop("checked", false); // Cerrar el menú después de hacer clic en el enlace
            });
        }
    });
});




/* Estrellas*/

                          // JavaScript para manejar la selección de estrellas
                          document.addEventListener('DOMContentLoaded', function() {
                            const estrellas = document.querySelectorAll('.estrellas span');
                    
                            estrellas.forEach(function(estrella) {
                                estrella.addEventListener('click', function() {
                                    const valor = this.getAttribute('data-value');
                                    document.getElementById('calificacion').value = valor;
                    
                               
                                    estrellas.forEach(function(estrella) {
                                        estrella.innerHTML = '&#9734;'; 
                                    });
                    
                                 
                                    for (let i = 0; i < valor; i++) {
                                        estrellas[i].innerHTML = '&#9733;'; 
                                    }
                                });
                            });
                        });

/* Trayendo datos de la API*/


document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/api/resenas')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar las reseñas: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const reseñasGrid = document.getElementById('reseñas');
            reseñasGrid.innerHTML = '';
            data.forEach(reseña => {
                const { nombre, puntuacion, comentario } = reseña;
                if (!nombre || !puntuacion || !comentario) {
                    console.error('Datos de reseña incompletos:', reseña);
                    return; 
                }

                const reseñaCuadro = document.createElement('div');
                reseñaCuadro.classList.add('reseña-cuadro');
                reseñaCuadro.innerHTML = `
                    <h3>${nombre}</h3>
                    <div class="estrellas">
                        ${'&#9733;'.repeat(puntuacion) + '&#9734;'.repeat(5 - puntuacion)}
                    </div>
                    <p>${comentario}</p>
                `;
                reseñasGrid.appendChild(reseñaCuadro);
            });
        })
        .catch(error => console.error('Error al cargar las reseñas:', error));
});





/*Enviando datos*/
document.getElementById('reseña-formulario').addEventListener('submit', async function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const comentario = document.getElementById('resena').value;
    const puntuacion = document.getElementById('calificacion').value;

    try {
        const response = await fetch('http://localhost:3000/api/resenas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, comentario, puntuacion })
        });

        if (!response.ok) {
            throw new Error('Error al enviar la reseña');
        }

        // Mostrar alerta de SweetAlert2
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Reseña enviada con éxito',
            showConfirmButton: false,
            timer: 1500
        });

        // Limpiar los campos del formulario después de enviar la reseña (opcional)
        document.getElementById('nombre').value = '';
        document.getElementById('resena').value = '';
        document.getElementById('calificacion').value = '';

    } catch (error) {
        console.error('Error al enviar la solicitud:', error);

        // Mostrar alerta de SweetAlert2 para errores
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al enviar la reseña',
        });
    }
});


/*EVENTOS API*/

document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Cargar eventos desde la API
        const response = await fetch('http://localhost:3000/api/eventos');
        const eventos = await response.json();
        const carouselSlide = document.getElementById('carouselSlide');

        // Contador para el atributo data-id
        let dataIdCounter = 0;

        // Recorrer los eventos y crear las tarjetas correspondientes
        eventos.forEach(evento => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.setAttribute('data-id', dataIdCounter); // Asignar el valor del contador
            dataIdCounter++; // Incrementar el contador para el siguiente evento

            const img = document.createElement('img');
            img.classList.add('card__image');
            img.setAttribute('src', `http://localhost:3000/${evento.img}`);
            img.setAttribute('alt', `Imagen del evento ${evento.titulo}`);

            const cardContent = document.createElement('div');
            cardContent.classList.add('card-content');

            const title = document.createElement('h2');
            title.textContent = evento.titulo;

            const date = document.createElement('p');
            date.innerHTML = `<strong>Fecha:</strong> ${evento.fecha}`;

            const brand = document.createElement('p');
            brand.innerHTML = `<strong>Marca:</strong> ${evento.marca}`;

            const description = document.createElement('p');
            description.innerHTML = `<strong>Descripción:</strong> ${evento.descripcion}`;

            // Construir la estructura de la tarjeta
            cardContent.appendChild(title);
            cardContent.appendChild(date);
            cardContent.appendChild(brand);
            cardContent.appendChild(description);

            card.appendChild(img);
            card.appendChild(cardContent);

            // Agregar la tarjeta al carrusel
            carouselSlide.appendChild(card);
        });

    } catch (error) {
        console.error('Error al obtener eventos:', error);
    }
});
/************ */

document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('http://localhost:3000/api/eventos');
        const eventos = await response.json();
        const carouselSlide = document.getElementById('carouselSlide');
        const carouselContainer = document.querySelector('.carousel-container');

        const carouselItemWidth = 400; // Ancho máximo de cada tarjeta (ajustar según el CSS)
        const visibleItems = Math.floor(carouselContainer.clientWidth / carouselItemWidth);

        let currentOffset = 0;
        let isDragging = false;
        let startX = 0;
        let dragStartOffset = 0;
        let autoInterval = null;

        function createCard(evento) {
            const card = document.createElement('div');
            card.classList.add('card');

            const img = document.createElement('img');
            img.classList.add('card__image');
            img.setAttribute('src', `http://localhost:3000/${evento.img}`);
            img.setAttribute('alt', `Imagen del evento ${evento.titulo}`);

            const cardContent = document.createElement('div');
            cardContent.classList.add('card-content');

            const title = document.createElement('h2');
            title.textContent = evento.titulo;

            const date = document.createElement('p');
            date.innerHTML = `<strong>Fecha:</strong> ${evento.fecha}`;

            const brand = document.createElement('p');
            brand.innerHTML = `<strong>Marca:</strong> ${evento.marca}`;

            const description = document.createElement('p');
            description.innerHTML = `<strong>Descripción:</strong> ${evento.descripcion}`;

            cardContent.append(title, date, brand, description);
            card.append(img, cardContent);

            return card;
        }

        // Añadir las tarjetas originales
        eventos.forEach(evento => {
            const card = createCard(evento);
            carouselSlide.appendChild(card);
        });

        // Clonar las tarjetas hasta llegar a 50 elementos
        const totalCards = eventos.length;
        for (let i = 0; i < 50; i++) {
            eventos.forEach(evento => {
                const card = createCard(evento);
                carouselSlide.appendChild(card);
            });
        }

        // Rotación automática
        function startAutoRotate() {
            autoInterval = requestAnimationFrame(rotateCarousel);
        }

        function rotateCarousel() {
            currentOffset -= 1; // Ajusta la velocidad aquí
            carouselSlide.style.transform = `translateX(${currentOffset}px)`;

            // Reiniciar la posición si sale del límite
            if (Math.abs(currentOffset) >= (carouselSlide.scrollWidth / 2 - carouselContainer.clientWidth)) {
                currentOffset = 0;
            }

            autoInterval = requestAnimationFrame(rotateCarousel);
        }

        // Detener la rotación automática al arrastrar
        carouselSlide.addEventListener('mousedown', (e) => {
            if (e.button === 0) { // Solo botón izquierdo del mouse
                e.preventDefault();
                isDragging = true;
                startX = e.clientX;
                dragStartOffset = currentOffset;
                cancelAnimationFrame(autoInterval); // Detener la rotación automática
            }
        });

        carouselSlide.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const x = e.clientX;
            const dragDistance = x - startX;
            currentOffset = dragStartOffset + dragDistance;
            carouselSlide.style.transform = `translateX(${currentOffset}px)`;
        });

        carouselSlide.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                startAutoRotate(); // Reiniciar rotación automática
            }
        });

        carouselSlide.addEventListener('mouseleave', () => {
            if (isDragging) {
                isDragging = false;
                startAutoRotate(); // Reiniciar rotación automática
            }
        });

        startAutoRotate();

    } catch (error) {
        console.error('Error al obtener eventos:', error);
    }
});


//banner

document.addEventListener('DOMContentLoaded', function () {
    const slideTrack = document.querySelector('.slide-track');
    const slides = Array.from(slideTrack.children);
    const totalSlides = slides.length;
  
    // Duplicate slides to create infinite effect
    for (let i = 0; i < 50; i++) {
      slides.forEach(slide => {
        const clone = slide.cloneNode(true);
        slideTrack.appendChild(clone);
      });
    }
  
    // Adjust the width of slide-track to accommodate the cloned slides
    slideTrack.style.width = `${totalSlides * 50 * 100}px`;
  });