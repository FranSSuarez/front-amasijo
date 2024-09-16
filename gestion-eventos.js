document.addEventListener('DOMContentLoaded', () => {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    const editButtons = document.querySelectorAll('.edit-btn');
    const searchInput = document.getElementById('search');
    const addEventForm = document.getElementById('add-event-form');
    const eventsCards = document.getElementById('events_cards').querySelector('.cards__body');

    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.parentElement;
            card.remove();
        });
    });

    editButtons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.parentElement;
            const title = card.querySelector('h2').innerText;
            const date = card.querySelector('p strong:nth-child(2)').innerText;
            const brand = card.querySelector('p strong:nth-child(4)').innerText;
            const description = card.querySelector('p:nth-of-type(3)').innerText;
            const imageSrc = card.querySelector('img').src;

            document.getElementById('event-title').value = title;
            document.getElementById('event-date').value = date;
            document.getElementById('event-brand').value = brand;
            document.getElementById('event-description').value = description;
            // Handle image editing separately if necessary

            card.remove();
        });
    });

    searchInput.addEventListener('input', () => {
        const filter = searchInput.value.toLowerCase();
        const cards = eventsCards.querySelectorAll('.card');

        cards.forEach(card => {
            const title = card.querySelector('h2').innerText.toLowerCase();
            if (title.includes(filter)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });

    addEventForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('event-title').value;
        const date = document.getElementById('event-date').value;
        const brand = document.getElementById('event-brand').value;
        const description = document.getElementById('event-description').value;
        const image = document.getElementById('event-image').files[0];

        const reader = new FileReader();
        reader.onload = (e) => {
            const newCard = document.createElement('div');
            newCard.classList.add('card');
            newCard.innerHTML = `
                <img src="${e.target.result}" alt="Imagen del evento" class="card__image">
                <h2>${title}</h2>
                <p><strong>Fecha:</strong> ${date}</p>
                <p><strong>Marca:</strong> ${brand}</p>
                <p><strong>Descripción:</strong> ${description}</p>
                <button class="edit-btn">Editar</button>
                <button class="delete-btn">Eliminar</button>
            `;

            eventsCards.appendChild(newCard);

            newCard.querySelector('.delete-btn').addEventListener('click', () => {
                newCard.remove();
            });

            newCard.querySelector('.edit-btn').addEventListener('click', () => {
                document.getElementById('event-title').value = title;
                document.getElementById('event-date').value = date;
                document.getElementById('event-brand').value = brand;
                document.getElementById('event-description').value = description;
                // Handle image editing separately if necessary

                newCard.remove();
            });

            addEventForm.reset();
        };

        reader.readAsDataURL(image);
    });
});
