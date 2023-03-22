import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Search from "./Search.jsx";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import useAvatar from "../hooks/useAvatar.jsx";
import InstagramIcon from "@mui/icons-material/Instagram";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import Badge from "@mui/material/Badge";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

const pages = ["Search", "Followers", "Followings", "Post"];
const settings = [
  {
    name: "Profile",
    href: "/profile",
  },
  {
    name: "Logout",
    href: "/logout",
  },
];

function ResponsiveAppBar(props) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [options, setOptions] = React.useState([]);
  const [openSearch, setOpenSearch] = React.useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSearchChange = (e) => {
    fetch(`/api/search?q=${e.target.value}`, {
      headers: {
        "content-type": "application/json&charset=utf-8",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        if (data.length !== 0) {
          setOptions(data);
        }
      });
  };

  return (
    <AppBar sx={{ position: "sticky", top: 0 }}>
      <Search
        onChange={handleSearchChange}
        options={options}
        open={openSearch}
        onClose={() => setOpenSearch(false)}
      />
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <InstagramIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              fontFamily: "Quicksand",
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            UR's Net
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <InstagramIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "Quicksand",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            UR's Net
          </Typography>
          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            style={{
              paddingRight: "25px",
            }}
          ></Box>

          <Box
            sx={{
              flexGrow: 0,
              display: "flex",
              justifyContent: "space-between",
              width: "16vw",
            }}
          >
            <Tooltip title="Search Users">
              <IconButton
                size="small"
                onClick={() => setOpenSearch(true)}
                sx={{ color: "white" }}
              >
                <SearchRoundedIcon sx={{ color: "white" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="My Network">
              <IconButton size="small" sx={{ color: "white" }}>
                <PeopleAltRoundedIcon sx={{ color: "white" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Accounts Settings">
              <IconButton
                component="a"
                href="/setting"
                size="small"
                sx={{ color: "white" }}
              >
                <SettingsRoundedIcon sx={{ color: "white" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Notifications">
              <IconButton size="small" sx={{ color: "white" }}>
                <Badge
                  color="error"
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  badgeContent={10}
                  max={100}
                >
                  <NotificationsRoundedIcon sx={{ color: "white" }} />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="View Profile">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {useAvatar(
                  props.profileImg,
                  40,
                  40,
                  props.userName,
                  props.color
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.name} component="a" href={setting.href}>
                  {setting.name}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
