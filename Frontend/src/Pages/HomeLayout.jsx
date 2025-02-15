import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ArticleIcon from "@mui/icons-material/Article";
import Navbar from '../Components/Navbar';

const HomeLayout = () => {
  const [value, setValue] = useState("/home");
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  async function fetchUserDetails() {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/get-user`, {
        method: "GET",
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const result = await response.json();
      setUser(result.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div style={{ paddingBottom: "56px" }}>
      <Navbar user={user && user.name ? user : null} />
      <Outlet />

      <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            if (newValue === "news") {
              window.open("https://www.livemint.com", "_blank"); // Open LiveMint in a new tab
            } else {
              setValue(newValue);
              navigate(newValue);
            }
          }}
          showLabels
        >
          <BottomNavigationAction label="Home" value="/home" icon={<HomeIcon />} />
          <BottomNavigationAction label="Position" value="/home/position" icon={<LocationOnIcon />} />
          <BottomNavigationAction label="Fund" value="/home/money" icon={<AttachMoneyIcon />} />
          <BottomNavigationAction label="News" value="news" icon={<ArticleIcon />} />
        </BottomNavigation>
      </Paper>
    </div>
  );
};

export default HomeLayout;
