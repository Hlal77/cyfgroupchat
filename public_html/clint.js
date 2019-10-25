let socket = io.connect("http://localhost:8080");
let username = document.getElementById("username");
let message = document.getElementById("message");
let send = document.getElementById("send");
let chat = document.getElementById("chat");
let broadcast = document.getElementById("broadcast");
send.addEventListener("click", function() {
  socket.emit("message", {
    username: username.value,
    message: message.value
  });
});
message.addEventListener("keypress", function() {
  socket.emit("broadcast", {
    username: username.value
  });
});
socket.on("new_msg", function(data) {
  broadcast.innerHTML = "";
  chat.innerHTML += `<div class="container">
  <strong>${data.username}:</strong>${data.message}
  </div>`;
});
socket.on("new_broadcast", function(data) {
  broadcast.innerHTML = `<strong>${data.username}
    typing<img src="write.gif" style="width: 17px;height: 17px;" />
  `;
});
