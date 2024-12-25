import { FiHome } from "react-icons/fi";
import { GoPlusCircle } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import AddPost from "../components/AddPost";
import { TbLogout2 } from "react-icons/tb";
import { useNavigate } from "react-router";
import { useRef, useState, useEffect } from "react";
import useAuth from "./AuthContext";

import "../assets/styles/sideBar.css";
import { getProfileList } from "../services/getProfile";
import SearchedAccount from "./SearchedAccount";
const SideBar = ({ scrollRef }) => {
  const { logout } = useAuth();
  const dialogRef = useRef(null);
  let navigate = useNavigate();
  const openDialog = () => {
    dialogRef.current.showModal();
  };

  const closeDialog = () => {
    dialogRef.current.close();
  };
  const [search, setSearch] = useState(false);
  const [searchedAccounts, setSearchedAccounts] = useState([]);
  const searchBox = useRef(null);

  useEffect(() => {
    if (search) {
      searchBox.current.focus();
    } else {
      setSearchedAccounts([]);
    }
  }, [search]);

  const handleProfileSearch = async (e) => {
    e.preventDefault();
    const searchValue = searchBox.current.value;
    if (searchValue === "") {
      setSearchedAccounts([]);
      return;
    }
    const accounts = await getProfileList(searchValue);
    console.log(accounts);
    setSearchedAccounts(accounts);
  };

  return (
    <div className="sidebar">
      <div className="top">
        <h1 className="title">Flower Garden</h1>
        <div className="icons">
          <FiHome
            onClick={() => {
              const currentPath = window.location.pathname;
              if (currentPath !== "/home") {
                navigate("/home");
              }
              window.location.reload();
              scrollRef.current.scrollTo({ top: 0, behavior: "instant" });
            }}
          />
          <GoPlusCircle onClick={openDialog} />
          <AddPost ref={dialogRef} onClose={closeDialog} />
          <CiSearch
            onClick={() => {
              setSearch((prev) => !prev);
            }}
          />
          <TbLogout2 onClick={() => logout()} />
        </div>
      </div>
      <div className="bottom">
        {search && (
          <>
            <form className="searchbox" onSubmit={handleProfileSearch}>
              <input
                type="text"
                placeholder="Search"
                ref={searchBox}
                style={{ fontFamily: "Times New Roman, Times, serif" }}
              />
            </form>
            <div className="searched-accounts">
              {searchedAccounts.length !== 0 ? (
                searchedAccounts.map((account) => (
                  <SearchedAccount
                    key={account.userid}
                    username={account.username}
                    userimage={account.avatar}
                    userid={account.userid}
                  />
                ))
              ) : (
                <div
                  style={{
                    fontSize: "2.5rem",
                    textAlign: "center",
                    marginTop: "1rem",
                  }}
                >
                  No accounts found
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SideBar;
