import * as React from "react";
import "./header.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { jwtUtils } from "../../utils/jwtUtils";
import { useEffect, useState } from "react";
import { setToken } from "../../redux/reducers/AuthReducer";

//MUI
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";

const drawerWidth = 240;

const Header = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.Auth.token);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (jwtUtils.isAuth(token)) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [token]);

  // 비동기로 처리!
  const logout = async () => {
    localStorage.removeItem("userid");
    await dispatch(setToken(""));
    alert("로그아웃 되었습니다😎");
    navigate("/");
  };

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const goNav = (item) => {
    if (item === "게시판") {
      navigate("/boardlist");
    } else if (item === "로그아웃") {
      logout();
    } else if (item === "내 프로필") {
      navigate("/myprofile");
    } else if (item === "글쓰기") {
      navigate("/add-board");
    } else if (item === "로그인") {
      navigate("/login");
    } else if (item === "회원가입") {
      navigate("/register");
    } else if (item === "컬러 진단") {
      navigate("/personal");
    } else if (item === "화장 시뮬레이션") {
      navigate("/makeup");
    }
  };

  const navItems = [
    "게시판",
    "글쓰기",
    "내 프로필",
    "컬러 진단",
    "화장 시뮬레이션",
    "로그아웃",
  ];
  const navItems2 = ["게시판", "글쓰기", "로그인", "회원가입"];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <div className="header-title">
          <Link to="/">
            <span>My PC</span>
          </Link>
        </div>
      </Typography>
      <Divider />
      <List>
        {isAuth ? (
          <>
            {navItems.map((item) => (
              <ListItem key={item} disablePadding>
                <ListItemButton
                  onClick={() => {
                    goNav(item);
                  }}
                  sx={{ textAlign: "center" }}
                >
                  <ListItemText primary={item} />
                </ListItemButton>
              </ListItem>
            ))}
          </>
        ) : (
          <>
            {navItems2.map((item) => (
              <ListItem key={item} disablePadding>
                <ListItemButton
                  onClick={() => {
                    goNav(item);
                  }}
                  sx={{ textAlign: "center" }}
                >
                  <ListItemText primary={item} />
                </ListItemButton>
              </ListItem>
            ))}
          </>
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className="header-wrapper">
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { sm: "none" } }}
      >
        <MenuIcon />
      </IconButton>
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
      >
        <div className="header-title">
          <Link to="/">
            <span>My PC</span>
          </Link>
        </div>
      </Typography>
      <div className="header-menu">
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Link to="/boardlist">게시판</Link>
          <Link to="/add-board">글쓰기</Link>
          {isAuth ? (
            <>
              <Link to="/personal">컬러 진단</Link>
              <Link to="/makeup">화장 시뮬레이션</Link>
              <Link to="/myprofile">내 프로필</Link>
              <Link to="#" onClick={logout}>
                로그아웃
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">로그인</Link>
              <Link to="/register">회원가입</Link>
            </>
          )}
        </Box>
      </div>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </div>
  );
};

export default Header;
