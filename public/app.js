const socket = io();
const msgText = document.querySelector("#msg");
const btnSend = document.querySelector("#btn-send");
const chatBox = document.querySelector(".chat-content");
const displayMsg = document.querySelector(".message");

// Getting user name from command prompt
let name;
do{
  name = prompt('Enter your name');
}while(!name);

// displaying the name of the user
document.querySelector('#your-name').textContent = name;
msgText.focus();

// event starts, once the send buttonclicked
btnSend.addEventListener('click',(e)=>{
  e.preventDefault();
  // send the messgae entered in the message box
  sendMsg(msgText.value);
  msgText.value = "";
  msgText.focus();
  chatBox.scrollTop = chatBox.scrollHeight;
});

const sendMsg = message =>{
  const msg = {
    user: name,
    message: message.trim()
  }
  // display the message in the sender's chat box
  display(msg, 'you-message');
  // emit the message to the server for broadcasting
  socket.emit('sendMessage',msg)
}

// display message to all other users
socket.on('sendToAll', msg=>{
  display(msg, 'other-message');
  chatBox.scrollTop = chatBox.scrollHeight;
});

//Display function
const display = (msg, type) =>{
  const msgDiv = document.createElement('div');
  const className = type;
  msgDiv.classList.add(className,'message-row');
  const time = new Date().toLocaleTimeString();

  let innerText = `
  <div class="message-title">
    😎<span>${msg.user}</span>
  </div>
  <div class="message-text">
    ${msg.message}
  </div>
  <div class="message-time">
    ${time}
  </div>
  `;
  msgDiv.innerHTML = innerText;
  displayMsg.appendChild(msgDiv);
};