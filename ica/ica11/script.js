function displayMessage(msgText, msgType) {
    const body = document.body;

    // Create message box container
    const panel = document.createElement("div");
    panel.setAttribute("class", "msgBox");
    body.appendChild(panel);

    // Create message text
    const msg = document.createElement("p");
    msg.textContent = msgText;
    panel.appendChild(msg);

    // Create close button
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "x";
    panel.appendChild(closeBtn);

    // Add styles based on message type
    if (msgType === "warning") {
        msg.style.backgroundImage = "url('icons/warning.png')";
        panel.style.backgroundColor = "#f8d7da";
    } else if (msgType === "chat") {
        msg.style.backgroundImage = "url('icons/chat.png')";
        panel.style.backgroundColor = "#d1ecf1";
    } else {
        msg.style.paddingLeft = "10px";
    }

    // Close button event
    closeBtn.addEventListener("click", () => {
        panel.parentNode.removeChild(panel);
    });
}

// Event listener for button click
document.getElementById("showMessage").addEventListener("click", () => {
    displayMessage("Hello, this is a custom alert!", "chat");
});
