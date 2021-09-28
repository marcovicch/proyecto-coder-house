const socket = io();

const formMensaje = document.getElementById('form-chat');
const mensajesContainer = document.getElementById('mensajesContainer');

let date = new Date();
let now = date.toLocaleString();

socket.emit('askMessages');

formMensaje.addEventListener('submit', (event) => {
  event.preventDefault();
  if (email.value && mensaje.value) {
    let data = {
      author: {
        email: email.value,
        nombre: nombre.value,
        apellido: apellido.value,
        alias: alias.value,
        edad: edad.value,
        avatar: avatar.value,
      },
      text: mensaje.value,
    };
    console.log(data),
    console.log('EMITIENDO SOCKET');

    socket.emit('new-message', data);
    email.value = '';
    nombre.value = '';
    apellido.value = '';
    (alias.value = ''), (edad.value = ''), (avatar.value = '');
    mensaje.value = '';
  }
});

socket.on('update-chat', (mensajes) => {
  const holdingSchema = new schema.Entity('holding', {
    messages: [message],
  });

  const denormalizedData = denormalize(
    mensajes.result,
    holdingSchema,
    mensajes.entities
  );
  denormalizedData.forEach(data => {
    renderMessages(data);    
  });
});


function renderMessages(mensaje){
  let p = document.createElement('p');
  p.innerHTML = `
        <span class='mx-2 mensaje__email'>${mensaje.author.email}</span>
        <span class='mx-2 mensaje__time'>${mensaje.author.nombre}</span>
        <span class='mx-2 mensaje__text'>${mensaje.text}</span>`;
  mensajesContainer.appendChild(p);

}