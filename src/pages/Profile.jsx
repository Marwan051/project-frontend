import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router";
import ScrollView from "../components/ScrollView";
import "../assets/styles/profile.css";
import SideBar from "../components/SideBar";
import photo from "../assets/images/no-photo.jpg";
import { follow, getUserData, unfollow } from "../services/getProfile";
import { getIsFollowing, getProfileScrollContent } from "../services/getFeed";
import useAuth from "../components/AuthContext";
import Loading from "../components/Loading";
const Profile = () => {
  const { userid, username } = useParams();
  const { userId } = useAuth();
  const scrollRef = useRef(null);
  const [followed, setFollowed] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [profileData, setProfileData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUserData(username);
        setUserData(user);
        const isFollowing = await getIsFollowing(userId, user.userid);
        console.log("isFollowing", isFollowing);
        setFollowed(isFollowing);
        if (user?.userid) {
          const posts = await getProfileScrollContent(user.userid);
          console.log("other posts", posts);
          setProfileData(posts);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userid]);

  const handleClick = async (e) => {
    console.log("followed", followed);
    if (followed.length !== 0) {
      const unfollowResp = await unfollow(followed);
      if (unfollowResp) {
        setFollowed("");
      } else {
        alert("Error unfollowing");
      }
    } else {
      const followResp = await follow(userData.userid, userId);
      console.log(followResp);
      if (followResp.length !== 0) {
        setFollowed(followResp);
      } else {
        alert("Error following");
      }
    }
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <SideBar scrollRef={scrollRef} />
      <div className="profile-header">
        <div className="start">
          <img
            className="profile-photo"
            src={userData.avatar ?? photo}
            alt="profile photo"
          />
          <div className="user-info">
            <h1>{username}</h1>
            <p className="bio">{userData?.bio || "No bio yet..."}</p>
          </div>
        </div>
        <div className="end">
          {userId === userData.userid ? null : (
            <button
              className={`follow-btn ${
                followed.length === 0 ? null : "followed"
              }`}
              onClick={handleClick}
            >
              {followed ? "Following" : "Follow"}
            </button>
          )}
        </div>
      </div>
      <ScrollView
        scrollRef={scrollRef}
        posts={profileData.map((post) => ({
          user: {
            userid: userData.userid,
            username: userData.username,
            bio: userData.bio,
            photo: userData.avatar,
          },
          post: post,
        }))}
      />
    </>
  );
};

export default Profile;
