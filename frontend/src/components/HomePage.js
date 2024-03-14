// TODO: Create a home page for the Bear Bazaar
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Transact from "./Transact";
import ViewBid from "./ViewBid";
import ViewMatched from "./ViewMatched";
import Faq from "./Faq";
import Profile from "./Profile";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";

function HomePage() {
  const { isLoggedIn, logout, isLoading } = useAuth();
  const [selectedTab, setSelectedTab] = useState("transact");
  const navigate = useNavigate();

  const changeTab = (e, tab) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      navigate("/auth");
    }
  }, [isLoggedIn, isLoading, navigate]);

  return (
    !isLoading &&
    isLoggedIn && (
      <Box sx={{ width: "100%" }}>
        <Tabs value={selectedTab} onChange={changeTab} aria-label="mui tab bar">
          <Tab label="Transact" value="transact" />
          <Tab label="My Bid" value="myBid" />
          <Tab label="Match" value="match" />
          <Tab label="FAQ" value="faq" />
          <Box sx={{ flexGrow: 1 }} />
          <Tab
            value="profile"
            icon={
              <Avatar>
                <PersonIcon />
              </Avatar>
            }
          />
          <Tab label="Logout" value="logout" onClick={logout} />
        </Tabs>
        <Box>
          <div className="container-main">
            {selectedTab === "transact" && <Transact />}
            {selectedTab === "faq" && <Faq />}
            {selectedTab === "myBid" && <ViewBid />}
            {selectedTab === "match" && <ViewMatched />}
            {selectedTab === "profile" && <Profile />}
          </div>
        </Box>
      </Box>
    )
  );
}

export default HomePage;
