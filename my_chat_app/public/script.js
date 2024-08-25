// Connect to the server using Socket.IO
const socket = io();

// Select the form, input field, and messages list
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

// Listen for form submission
form.addEventListener('submit', function(event) {
    event.preventDefault();
    if (input.value) {
        // Send the message to the server
        socket.emit('chat message', input.value);
        input.value = '';
    }
});

// Listen for 'chat message' events from the server
socket.on('chat message', function(msg) {
    const item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});
