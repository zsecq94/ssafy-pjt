import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { jwtUtils } from "../../utils/jwtUtils";
import axios from "axios";
import "./changepc.scss";

// MUI
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";
import PersonalColor from "../../pages/PersonalColor";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";

const ChangePc = () => {
  const token = useSelector((state) => state.Auth.token);
  const [user, setUser] = useState([]);
  const [show, setShow] = useState(false);
  const [pc, setPc] = useState("");

  const navigate = useNavigate();

  const handleChange = (event) => {
    setPc(event.target.value);
  };
  // console.log(pc);

  const user_id = jwtUtils.getId(token);
  useEffect(() => {
    const data = { id: user_id };
    axios
      .get("/get/user", { params: data })
      .then((V) => {
        setUser(V.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user_id]);

  const pcSubmit = async () => {
    if (pc) {
      try {
        const formData = new FormData();
        formData.append("id", user_id);
        formData.append("pc", pc);
        await axios.post("/update/userpc", formData);
        navigate("/makeup");
        alert("내 PC 변경 성공👍");
      } catch (error) {
        console.log(error);
        alert("변경 실패🤢");
      }
    } else {
      alert("내 PC를 선택해주세요!");
    }
  };

  return (
    <div className="changepc-wrapper">
      <br />
      <h1>내 PC 변경하기</h1>
      <br />
      <br />
      <h2>현재 PC : {user.personalcolor}</h2>
      <div className="changepc-selector">
        <h2>변경할 PC : </h2>
        <Box sx={{ marginLeft: "1%", minWidth: 120, maxWidth: 300 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">PC 선택</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={pc}
              label="PC 선택하기"
              onChange={handleChange}
            >
              <MenuItem value={"spring"}>Warm Spring</MenuItem>
              <MenuItem value={"summer"}>Cool Summer</MenuItem>
              <MenuItem value={"autumn"}>Warm Autumn</MenuItem>
              <MenuItem value={"winter"}>Cool Winter</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <Button variant="outlined" size="large" onClick={() => setShow(true)}>
        내 PC 진단하기
      </Button>
      <br />
      <br />
      <Button variant="outlined" size="large" onClick={pcSubmit}>
        내 PC 변경하기
      </Button>
      <Dialog open={show}>
        <DialogContent style={{ position: "relative", textAlign: "center" }}>
          <Button onClick={() => setShow(false)}>뒤로가기</Button>
          <PersonalColor />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChangePc;
