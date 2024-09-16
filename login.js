document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-box');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('pw-input');
    const eyeOpen = document.getElementById('eyeop');
    const eyeClosed = document.getElementById('eyeclo');

    // Toggle password visibility
    eyeOpen.addEventListener('click', () => {
        passwordInput.type = 'text';
        eyeOpen.style.display = 'none';
        eyeClosed.style.display = 'block';
    });

    eyeClosed.addEventListener('click', () => {
        passwordInput.type = 'password';
        eyeOpen.style.display = 'block';
        eyeClosed.style.display = 'none';
    });

    form.addEventListener('submit', (event) => {
        let isValid = true;
        const emailValue = emailInput.value.trim();
        const passwordValue = passwordInput.value.trim();

        if (!emailValue) {
            isValid = false;
            alert('El campo de correo electrónico no puede estar vacío.');
        } else if (!validateEmail(emailValue)) {
            isValid = false;
            alert('Por favor, ingresa un correo electrónico válido.');
        }

        if (!passwordValue) {
            isValid = false;
            alert('El campo de contraseña no puede estar vacío.');
        } else if (passwordValue.length < 12 || passwordValue.length > 20) {
            isValid = false;
            alert('La contraseña debe tener entre 12 y 20 caracteres.');
        }

        if (!isValid) {
            event.preventDefault();
        }
    });

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(email);
    }
});



// login.js

document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('pw-input');
    const showPasswordToggle = document.getElementById('show-password-toggle');

    // Mostrar/Ocultar Contraseña
    if (showPasswordToggle) {
        showPasswordToggle.addEventListener('click', () => {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                showPasswordToggle.textContent = 'Ocultar contraseña';
            } else {
                passwordInput.type = 'password';
                showPasswordToggle.textContent = 'Mostrar contraseña';
            }
        });
    }

    // Validación del Formulario (si se desea)
    const form = document.getElementById('login-box');
    form.addEventListener('submit', (e) => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('pw-input').value;

        if (!email || !password) {
            e.preventDefault(); // Evitar el envío del formulario
            alert('Por favor, complete todos los campos.');
        }

        // Aquí puedes agregar más validaciones si es necesario
    });
});
