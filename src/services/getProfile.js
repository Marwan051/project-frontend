const getProfileList = async (userid) => {
  const response = await fetch(
    `https://decent-shirlee-blasome-c39fcfbb.koyeb.app/api/user?username=${userid}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `token ${localStorage.getItem("token")}`,
      },
      credentials: "include",
    }
  );
  const data = await response.json();
  console.log(data);
  return data;
};

const getUserData = async (username) => {
  const response = await fetch(
    `https://decent-shirlee-blasome-c39fcfbb.koyeb.app/api/user?username=${username}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
      Authorization: `token ${localStorage.getItem("token")}`,
    }
  );
  const data = await response.json();

  console.log(data);
  return data[0];
};
const follow = async (followingId) => {
  const response = await fetch(
    "https://decent-shirlee-blasome-c39fcfbb.koyeb.app/api/follow",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `token ${localStorage.getItem("token")}`,
      },
      credentials: "include",
      body: JSON.stringify({
        following: followingId,
      }),
    }
  );
  if (response.status === 201) {
    const data = await response.json();
    return data.followid;
  }
  return "";
};

const unfollow = async (followingId) => {
  const formData = new FormData();
  formData.append("followid", followingId);
  const response = await fetch(
    "https://decent-shirlee-blasome-c39fcfbb.koyeb.app/api/follow",
    {
      method: "DELETE",
      headers: {
        Authorization: `token ${localStorage.getItem("token")}`,
      },
      credentials: "include",
      body: formData,
    }
  );

  if (response.status !== 200) {
    return false;
  }
  return true;
};
export { getProfileList, getUserData, follow, unfollow };
