const Login = async (username, password) => {
  const response = await fetch(
    "https://decent-shirlee-blasome-c39fcfbb.koyeb.app/api/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    }
  );
  const data = await response.json();
  return data;
};

const Signup = async (username, password, bio, avatar) => {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  if (bio) {
    formData.append("bio", bio);
  }
  if (avatar) {
    formData.append("avatar", avatar);
  }

  const response = await fetch(
    `https://decent-shirlee-blasome-c39fcfbb.koyeb.app/api/user?username=${username}`,
    {
      method: "POST",

      body: formData,
    }
  );
  const data = await response.json();
  return data;
};

export { Login, Signup };
