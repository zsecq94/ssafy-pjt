import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Button,
  Dialog,
  DialogContent,
  IconButton,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./signup.scss";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import Personalcolor from "../../pages/PersonalColor";
import SignPersonalColor from "../SignPersonalColor/index";

const SignUp = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("올바른 이메일 형식이 아닙니다!")
      .required("이메일을 입력하세요!"),
    username: Yup.string()
      .min(2, "닉네임은 최소 2글자 이상입니다!")
      .max(10, "닉네임은 최대 10글자입니다!")
      .matches(
        /^[가-힣a-zA-Z][^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]*$/,
        "닉네임에 특수문자가 포함되면 안되고 숫자로 시작하면 안됩니다!"
      )
      .required("닉네임을 입력하세요!"),
    password: Yup.string()
      .min(8, "비밀번호는 최소 8자리 이상입니다")
      .max(16, "비밀번호는 최대 16자리입니다!")
      .required("패스워드를 입력하세요!")
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[^\s]*$/,
        "알파벳, 숫자, 공백을 제외한 특수문자를 모두 포함해야 합니다!"
      ),
    password2: Yup.string()
      .oneOf([Yup.ref("password"), null], "비밀번호가 일치하지 않습니다!")
      .required("필수 입력 값입니다!"),
    personalcolor: Yup.string().required("필수 입력 값입니다!"),
  });
  const submit = async (values) => {
    const { email, username, password, personalcolor, userimgurl } = values;

    //signup data

    const signupData = {
      email: email,
      username: username,
      password: password,
      personalcolor: personalcolor,
      userimgurl: userimgurl,
    };

    try {
      const response = await axios.post("/api/signup", signupData);

      if (response.data.message == 0) {
        toast.success(
          <h3>
            회원가입이 완료되었습니다.
            <br />
            로그인 하세요😎
          </h3>,
          {
            position: "top-center",
            autoClose: 2000,
          }
        );
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(<h3>이미 있는 회원입니다.</h3>);
      }
    } catch (e) {
      // 서버에서 받은 에러 메시지 출력
      toast.error(e.response.data.message + "😭", {
        position: "top-center",
      });
    }
  };

  // modal이 보이는 여부 상태
  const [show, setShow] = useState(false);
  return (
    <Formik
      initialValues={{
        email: "",
        username: "",
        password: "",
        password2: "",
        personalcolor: "",
        userimgurl:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      }}
      validationSchema={validationSchema}
      onSubmit={submit}
      validateOnMount={true}
    >
      {({ values, handleSubmit, handleChange, errors }) => (
        <div className="signup-wrapper">
          <ToastContainer />
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="input-forms">
              <div className="input-forms-item">
                <div className="input-label">이메일</div>
                <TextField
                  value={values.email}
                  name="email"
                  variant="outlined"
                  onChange={handleChange}
                />
                <div className="error-message">{errors.email}</div>
              </div>
              <div className="input-forms-item">
                <div className="input-label">닉네임</div>
                <TextField
                  value={values.username}
                  name="username"
                  variant="outlined"
                  onChange={handleChange}
                />
                <div className="error-message">{errors.username}</div>
              </div>
              <div className="input-forms-item">
                <div className="input-label">비밀번호</div>
                <TextField
                  value={values.password}
                  name="password"
                  variant="outlined"
                  type="password"
                  onChange={handleChange}
                />
                <div className="error-message">{errors.password}</div>
              </div>
              <div className="input-forms-item">
                <div className="input-label">비밀번호 확인</div>
                <TextField
                  value={values.password2}
                  name="password2"
                  variant="outlined"
                  type="password"
                  onChange={handleChange}
                />
                <div className="error-message">{errors.password2}</div>
              </div>
              <div className="input-forms-item">
                <div className="input-label">당신의 퍼스널 컬러는?</div>
                <FormControl>
                  <Select
                    value={values.personalcolor}
                    name="personalcolor"
                    label="Personalcolor"
                    variant="outlined"
                    onChange={handleChange}
                  >
                    <MenuItem value={"none"}>모름</MenuItem>
                    <MenuItem value={"spring"}>Warm Spring</MenuItem>
                    <MenuItem value={"summer"}>Cool Summer</MenuItem>
                    <MenuItem value={"autumn"}>Warm Autumn</MenuItem>
                    <MenuItem value={"winter"}>Cool Winter</MenuItem>
                  </Select>
                </FormControl>
                <div className="error-message">{errors.personalcolor}</div>
                <h4>
                  My PC를 모른다면? :{" "}
                  <Button
                    onClick={() => {
                      setShow(true);
                    }}
                  >
                    My PC 진단하기
                  </Button>
                </h4>
              </div>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
              >
                회원가입
              </Button>
            </div>
          </form>

          <Dialog open={show}>
            <DialogContent
              style={{ position: "relative", textAlign: "center" }}
            >
              <DisabledByDefaultOutlinedIcon onClick={() => setShow(false)} />
              <SignPersonalColor />
            </DialogContent>
          </Dialog>
        </div>
      )}
    </Formik>
  );
};

export default SignUp;
