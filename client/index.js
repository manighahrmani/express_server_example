async function fetchMessages() {
  let messages = [];

  // Fetch messages from the server
  try {
    const response = await fetch('/api/messages');
    messages = await response.json();
  } catch (error) {
    messages = ['Error fetching messages.'];
  }

  renderMessages(messages);
}

function renderMessages(messages) {
  const messagesList = document.querySelector('#messages');
  messagesList.innerHTML = ''; // Clear previous messages

  // Create a list item for each message
  messages.forEach((message) => {
    const li = document.createElement('li');
    li.textContent = message.content;
    messagesList.append(li);
  });
}

function pageLoaded() {
  const getButton = document.querySelector('#get-messages');
  getButton.addEventListener('click', fetchMessages);
}

pageLoaded();
