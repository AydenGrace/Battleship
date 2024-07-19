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

export async function joinRoom(code, _id) {
  try {
    const response = await fetch(`${BASE_URL}/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, userId: _id }),
    });
    const message = await response.json();
    return message;
  } catch (error) {
    console.error(error);
  }
}

export async function Ready(code, _id) {
  try {
    const response = await fetch(`${BASE_URL}/ready`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, userId: _id }),
    });
    const message = await response.json();
    return message;
  } catch (error) {
    console.error(error);
  }
}

export async function Start(code, _id) {
  try {
    const response = await fetch(`${BASE_URL}/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, userId: _id }),
    });
    const message = await response.json();
    return message;
  } catch (error) {
    console.error(error);
  }
}

export async function PreparationsCompleted(roomId, userId, map, ships) {
  try {
    const response = await fetch(`${BASE_URL}/preparationsCompleted`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomId, userId, map, ships }),
    });
    const message = await response.json();
    return message;
  } catch (error) {
    console.error(error);
  }
}

export async function Shoot(roomId, ShooterId, X, Y) {
  try {
    const response = await fetch(`${BASE_URL}/shoot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomId, ShooterId, X, Y }),
    });
    const message = await response.json();
    return message;
  } catch (error) {
    console.error(error);
  }
}
