document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('reservar-mesa');
    
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); 

        const fecha = document.getElementById('fecha').value;
        const hora = document.getElementById('hora').value;
        const nombre = document.getElementById('nombre').value;
        const telefono = document.getElementById('telefono').value;
        const email = document.getElementById('email').value;
        const personas = document.getElementById('personas').value;
        const descripcion = document.getElementById('informacion-extra').value;

        const reserva = {
            fecha,
            hora,
            nombre,
            telefono,
            email,
            personas,
            descripcion
        };

        try {
            const response = await fetch('http://localhost:3000/admin/reservas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reserva)
            });

            if (response.ok) {
                const result = await response.json();

                // Mostrar alerta de éxito con SweetAlert2
                Swal.fire({
                    icon: 'success',
                    title: 'Reserva creada',
                    text: 'Tu reserva ha sido creada con éxito. Se le notificara la confirmacion por WhatsApp',
                    showConfirmButton: true,
                    confirmButtonText: 'Ir al home'
                }).then(() => {
                    // Redirigir al home después de confirmar la alerta
                    window.location.href = '/front-End/index.html';
                });
            } else {
                // Mostrar alerta de error con SweetAlert2
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al crear la reserva. Intenta nuevamente.'
                });
            }
        } catch (error) {
            console.error('Error:', error);

            // Mostrar alerta de error con SweetAlert2
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al crear la reserva. Intenta más tarde.'
            });
        }
    });
});







class UI {

    imprimirAlerta(mensaje,tipo) {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert' , 'd-block','col-5');

        if(tipo ==="error") {
            divMensaje.classList.add('alert-danger');
        }else{

            divMensaje.classList.add('alert-success');

        }

        divMensaje.textContent = mensaje;

        //agregar al dom
        document.querySelector('.banner').insertBefore(divMensaje,document.querySelector('.card-contenedor'));

        setTimeout(()=>{
            divMensaje.remove();
        },5000);


    }
    imprimirReservas() {
                        DivMostrarReservas.style.display = "block"
                        this.limpiarHTML()
                        const objectStore = DB.transaction('reservas').objectStore('reservas');
                        objectStore.openCursor().onsuccess = function(e) {
                            const cursor = e.target.result;
                            if(cursor){

                               
                     const { fecha, hora, nombre , telefono, personas, id } = cursor.value;
                        const divReserva = document.createElement('div');
                        divReserva.classList.add('p-3' , 'card' );
                        divReserva.dataset.id = id;

                        const nombreCliente = document.createElement('h3');
                        nombreCliente.classList.add('card-title', 'font-weight-bolder' , 'text-secondary'); 
                        nombreCliente.textContent = nombre;

                        const telefonoCliente = document.createElement('p');
                        telefonoCliente.classList.add('text-secondary')
                        telefonoCliente.innerHTML = `
                        <span class="font-weight-bolder">Telefono: </span> ${telefono}


                        `

                        const fechaCliente = document.createElement('p');
                        fechaCliente.classList.add('text-secondary')
                        fechaCliente.innerHTML = `
                        <span class="font-weight-bolder">Fecha de reserva: </span> ${fecha}


                        `

                        const horaCliente = document.createElement('p');
                        horaCliente.classList.add('text-secondary')

                        horaCliente.innerHTML = `
                        <span class="font-weight-bolder">hora de reserva: </span> ${hora}


                        `
                        const personasMesa = document.createElement('p');
                        personasMesa.classList.add('text-secondary')
                        personasMesa.innerHTML = `
                        <span class="font-weight-bolder">Personas por mesa: </span> ${personas}


                        `
                        const btnEliminar = document.createElement('button');
                        btnEliminar.classList.add('btn', 'btn-danger', 'btn-lg')


                        btnEliminar.innerHTML = 'Eliminar'
                        btnEliminar.onclick = () => eliminarReserva(id);

                        const btnEditar = document.createElement('button');
                        btnEditar.classList.add('btn','btn-success', 'btn-lg'  );
                        btnEditar.innerHTML = 'Editar';
                        const reserva = cursor.value;
                        btnEditar.onclick = () => cargarEdicion(reserva)

                        const divBotones = document.createElement('div');
                        divBotones.classList.add('d-flex','justify-content-around' );
                        divBotones.appendChild(btnEditar)
                        divBotones.appendChild(btnEliminar)







                        //agregar parrafos a div cita
                        divReserva.appendChild(nombreCliente); 
                        divReserva.appendChild(telefonoCliente); 
                        divReserva.appendChild(fechaCliente); 
                        divReserva.appendChild(horaCliente); 
                        divReserva.appendChild(personasMesa); 
                        divReserva.appendChild(divBotones); 
                        // divReserva.appendChild(btnEditar); 

                        contenedorReservas.appendChild(divReserva); 


                        //ir al siguiente elemento
                        cursor.continue();




                            }

            }

    }

    limpiarHTML(){
        while( contenedorReservas.firstChild){

            contenedorReservas.removeChild(contenedorReservas.firstChild)


        }
    }

}

export default UI;
