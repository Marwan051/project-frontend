import { useNavigate } from "react-router";
import NoPhoto from "../assets/images/default_profile.svg";
const SearchedAccount = ({ userimage, username, userid }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/profile/${userid}/${username}`);
  };

  return (
    <div className="searched-account" onClick={handleClick}>
      {userimage ? (
        <img src={userimage} alt={username} className="user-avatar" />
      ) : (
        <img src={NoPhoto} alt={username} className="user-avatar" />
      )}
      <span className="username">{username}</span>
    </div>
  );
};

export default SearchedAccount;
