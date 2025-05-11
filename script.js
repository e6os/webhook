// Function to send messages
async function sendMessage(webhook, content) {
  await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content })
  });
}

// Function to delete webhook
async function deleteWebhook() {
  const webhookUrl = document.getElementById('webhook').value.trim();

  if (!webhookUrl) {
    alert('Please provide a webhook URL to delete');
    return;
  }

  // Extract the webhook ID and token
  const webhookId = webhookUrl.split('/')[5];
  const webhookToken = webhookUrl.split('/')[6];

  const apiUrl = `https://discord.com/api/webhooks/${webhookId}/${webhookToken}`;

  try {
    // Send a DELETE request to the Discord API
    const response = await fetch(apiUrl, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert('Webhook deleted successfully');
    } else {
      const errorText = await response.text();
      alert('Error deleting webhook: ' + errorText);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to delete webhook');
  }
}

// Function to start spamming messages
async function startSpam() {
  const webhook = document.getElementById('webhook').value.trim();
  const message = document.getElementById('message').value;
  const count = parseInt(document.getElementById('count').value);
  const delay = parseInt(document.getElementById('delay').value);

  if (!webhook || !message || isNaN(count) || isNaN(delay)) {
    alert('Please fill all fields correctly.');
    return;
  }

  for (let i = 0; i < count; i++) {
    try {
      await sendMessage(webhook, message);
      console.log(`Sent message ${i + 1}`);
    } catch (err) {
      console.error(`Error sending message ${i + 1}`, err);
      break;
    }
    await new Promise(res => setTimeout(res, delay));
  }
}
