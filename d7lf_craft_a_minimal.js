class MinimalChatbotMonitor {
  constructor(elementId) {
    this.elementId = elementId;
    this.messages = [];
    this.init();
  }

  init() {
    this.container = document.getElementById(this.elementId);
    this.inputField = document.createElement('input');
    this.inputField.type = 'text';
    this.inputField.placeholder = 'Type a message...';
    this.container.appendChild(this.inputField);
    this.sendMessageButton = document.createElement('button');
    this.sendMessageButton.textContent = 'Send';
    this.container.appendChild(this.sendMessageButton);
    this.messagesContainer = document.createElement('div');
    this.container.appendChild(this.messagesContainer);
    this.sendMessageButton.addEventListener('click', () => {
      this.sendMessage(this.inputField.value);
      this.inputField.value = '';
    });
    this.inputField.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.sendMessage(this.inputField.value);
        this.inputField.value = '';
      }
    });
  }

  sendMessage(message) {
    const chatMessage = {
      text: message,
      type: 'user'
    };
    this.messages.push(chatMessage);
    this.updateChatLog();
    thisbotResponse(chatMessage.text);
  }

  botResponse(userMessage) {
    // Add your bot's response logic here
    const botMessage = {
      text: `You said: ${userMessage}`,
      type: 'bot'
    };
    this.messages.push(botMessage);
    this.updateChatLog();
  }

  updateChatLog() {
    this.messagesContainer.innerHTML = '';
    this.messages.forEach((message) => {
      const messageElement = document.createElement('div');
      messageElement.textContent = message.text;
      if (message.type === 'bot') {
        messageElement.style.color = 'blue';
      } else {
        messageElement.style.color = 'green';
      }
      this.messagesContainer.appendChild(messageElement);
    });
  }
}

const monitor = new MinimalChatbotMonitor('chat-container');