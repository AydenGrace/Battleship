const BASE_URL = "http://localhost:5000/api/rooms";

export async function createRoom(_id) {
  try {
    const response = await fetch(`${BASE_URL}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: _id }),
    });
    const message = await response.json();
    return message;
  } catch (error) {
    console.error(error);
  }
}


export async function getRoom(_id) {
  try {
    const response = await fetch(`${BASE_URL}/get`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id }),
    });
    const message = await response.json();
    return message;
  } catch (error) {
    console.error(error);
  }
}