import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Layout/Header";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import PrivateRoute from "./routes/PrivateRoutes";
import AddBoard from "./pages/Addboard";
import Footer from "./Layout/Footer/index";
import MakeUp from "./pages/MakeUp";
import PersonalColor from "./pages/PersonalColor";
import Board from "./pages/Board";
import Spring from "./pages/Season/Spring";
import Summer from "./pages/Season/Summer";
import Autumn from "./pages/Season/Autumn";
import Winter from "./pages/Season/Winter";
import { useLocation } from "react-router-dom";
import EditBoard from "./pages/EditPage";
import StoryUploader from "./pages/StoryUploader";
import MyProfile from "./pages/MyProfile";
import UserProfile from "./pages/UserProfile";
import Home from "./components/Home";
import BoardList from "./pages/BoardList";
import ChangePc from "./components/ChangePc";
import StoryCreator from "./pages/StoryCreator";
const App = () => {
  const location = useLocation();

  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/" element={<Home />} />
        <Route path="/boardlist" element={<BoardList />} />
        <Route path="/changepc" element={<ChangePc />} />
        <Route
          path="/add-board"
          element={<PrivateRoute path="/add-board" component={AddBoard} />}
        />
        <Route
          path="/makeup"
          element={<PrivateRoute path="/makeup" component={MakeUp} />}
        />
        <Route
          path="/personal"
          element={<PrivateRoute path="/personal" component={PersonalColor} />}
        />
        <Route
          path="/board/:board_id"
          element={<PrivateRoute path="/board/:board_id" component={Board} />}
        />
        <Route
          path="/user/:user_id"
          element={
            <PrivateRoute path="/user/:user_id" component={UserProfile} />
          }
        />
        <Route
          path="/edit-board/:board_id"
          element={
            // URI 파라미터가 존재하므로 전체 url을 PrivateRoute에 넘겨준다
            <PrivateRoute path={`${location.pathname}`} component={EditBoard} />
          }
        />
        <Route
          path="/edit-story/:board_id"
          element={
            <PrivateRoute
              path={`${location.pathname}`}
              component={StoryCreator}
            />
          }
        />
        <Route
          path="/story"
          element={<PrivateRoute path="/story" component={StoryUploader} />}
        />

        <Route path="/board/spring" element={<Spring />} />
        <Route path="/board/summer" element={<Summer />} />
        <Route path="/board/autumn" element={<Autumn />} />
        <Route path="/board/winter" element={<Winter />} />
      </Routes>
      <Footer />
    </React.Fragment>
  );
};
export default App;
