// const BASE_URL = "http://localhost:5000/api/messages";
const BASE_URL = "https://battleship-zb1l.onrender.com/api/messages";

export async function sendMessage(messageToSend, ReceiverId) {
  if (!localStorage.getItem("user")) return [];

  const { user } = JSON.parse(localStorage.getItem("user"));
  try {
    const response = await fetch(`${BASE_URL}/send/${ReceiverId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: messageToSend, id: user._id }),
    });
    const message = await response.json();
    return message;
  } catch (error) {
    console.error(error);
  }
}

export async function getAllMessages(selectedConversation) {
  if (!localStorage.getItem("user")) return [];

  const { user } = JSON.parse(localStorage.getItem("user"));
  try {
    const response = await fetch(`${BASE_URL}/${selectedConversation._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: user._id }),
    });
    const message = await response.json();
    return message;
  } catch (error) {
    console.error(error);
  }
}
