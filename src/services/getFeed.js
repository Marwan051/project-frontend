const getFeedScrollContent = async () => {
  const response = await fetch(
    "https://decent-shirlee-blasome-c39fcfbb.koyeb.app/api/feed",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `token ${localStorage.getItem("token")}`,
      },
      credentials: "include",
    }
  );
  const data = await response.json();
  console.log("feed scroll data :", data);
  if (response.status !== 200) {
    throw new Error("Failed to fetch data");
  }
  return data;
};

const getProfileScrollContent = async (userid) => {
  const response = await fetch(
    `https://decent-shirlee-blasome-c39fcfbb.koyeb.app/api/post?userid=${userid}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `token ${localStorage.getItem("token")}`,
      },
      credentials: "include",
    }
  );
  const data = await response.json();
  console.log(userid);
  if (response.status !== 200) {
    console.log("Error:", response);
  }
  return data;
};

const getIsFollowing = async (followerId, followingId) => {
  try {
    const response = await fetch(
      `https://decent-shirlee-blasome-c39fcfbb.koyeb.app/api/isfollowing?followerid=${followerId}&followingid=${followingId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `token ${localStorage.getItem("token")}`,
        },
        credentials: "include",
      }
    );
    if (response.status !== 200) {
      return "";
    }
    const data = await response.json();
    console.log(data);
    return data.followid;
  } catch (e) {
    return "";
  }
};

const getIsLiked = async (postId, userId) => {
  const response = await fetch(
    `https://decent-shirlee-blasome-c39fcfbb.koyeb.app/api/isliked?postid=${postId}&userid=${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `token ${localStorage.getItem("token")}`,
      },
      credentials: "include",
    }
  );
  console.log(response);
  if (response.status !== 200) {
    return "";
  }
  const data = await response.json();
  return data.likeid;
};

export {
  getFeedScrollContent,
  getProfileScrollContent,
  getIsFollowing,
  getIsLiked,
};
