const createPost = async (caption, image) => {
  try {
    // Convert blob URL to Blob
    const response = await fetch(image);
    const blob = await response.blob();

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("image", blob, "image.jpg");
    console.log("Blob type:", blob.type);
    console.log("Blob size:", blob.size);
    return false;
    const postResponse = await fetch(
      "https://decent-shirlee-blasome-c39fcfbb.koyeb.app/api/post",
      {
        method: "POST",
        headers: {
          Authorization: `token ${localStorage.getItem("token")}`,
        },
        credentials: "include",
        body: formData,
      }
    );

    const data = await postResponse.json();
    console.log("Response:", data);
    return postResponse.status === 201;
  } catch (error) {
    console.error("Error creating post:", error);
    return false;
  }
};

const deletePost = async (postId) => {
  const response = await fetch(
    "https://decent-shirlee-blasome-c39fcfbb.koyeb.app/api/post",
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ postId }),
    }
  );
};
const addLike = async (postId) => {
  const response = await fetch(
    "https://decent-shirlee-blasome-c39fcfbb.koyeb.app/api/like",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ postid: postId }),
    }
  );
  console.log(response);
  if (response.status !== 201) {
    return "";
  }
  const data = await response.json();
  return data.likeid;
};

const removeLike = async (postId) => {
  const response = await fetch(
    "https://decent-shirlee-blasome-c39fcfbb.koyeb.app/api/like",
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ postid: postId }),
    }
  );
  const data = await response.json();
  console.log(data);
  if (response.status !== 200) {
    console.error("Error:", response);
    throw new Error("Error removing like");
  }
  return "";
};
const editPost = async (postId, caption, image) => {
  const formData = new FormData();
  formData.append("postid", postId);
  formData.append("caption", caption);
  if (image) {
    const response = await fetch(image);
    const blob = await response.blob();
    formData.append("image", blob, "image.jpg");
  }

  try {
    const response = await fetch(
      `https://decent-shirlee-blasome-c39fcfbb.koyeb.app/api/post`,
      {
        method: "PUT",
        headers: {
          Authorization: `token ${localStorage.getItem("token")}`,
        },
        body: formData,
      }
    );

    const data = await response.json();
    return response.ok;
  } catch (error) {
    console.error("Error editing post:", error);
    return false;
  }
};

export { createPost, deletePost, addLike, removeLike, editPost };
