// const BASE_URL = "http://localhost:5000/api/users";
const BASE_URL = "https://battleship-zb1l.onrender.com/api/users";

export async function signup(values) {
  try {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const message = await response.json();
    return message;
  } catch (error) {
    console.error(error);
  }
}

export async function signin(values) {
  try {
    const response = await fetch(`${BASE_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const newUser = await response.json();
    return newUser;
  } catch (error) {
    console.error(error);
  }
}

export async function getUsers() {
  if (!localStorage.getItem("user")) {
    return [];
  }
  const { user } = JSON.parse(localStorage.getItem("user"));
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    });
    const allOtherUsers = await response.json();
    return allOtherUsers;
  } catch (error) {
    console.error(error);
  }
}

export async function getUserHistory() {
  if (!localStorage.getItem("user")) {
    return [];
  }
  const { user } = JSON.parse(localStorage.getItem("user"));
  try {
    const response = await fetch(`${BASE_URL}/history`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user._id }),
    });
    const UserHistory = await response.json();
    return UserHistory;
  } catch (error) {
    console.error(error);
  }
}
