import {updateCartItemCount} from "./cart.js"
updateCartItemCount()

document.addEventListener("DOMContentLoaded", function() {
  const openChatBtn = document.getElementById("openChatBtn");
  const closeChatBtn = document.getElementById("closeChatBtn");
  const chatContainer = document.getElementById("chatContainer");

  openChatBtn.addEventListener("click", function() {
      chatContainer.style.right = "0";
  });

  closeChatBtn.addEventListener("click", function() {
      chatContainer.style.right = "-300px";
  });
});