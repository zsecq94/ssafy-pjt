import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Formik} from "formik";
import * as Yup from "yup";
import "./ColorSelector.scss";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ColorSelector = () => {

  const validationSchema = Yup.object().shape({
    personalcolor: Yup.string()
    .required("필수 입력 값입니다!"
    ),
  });

  return (
    <Formik
      initialValues={{
        personalcolor: "",
      }}
      validationSchema={validationSchema}
      validateOnMount={true}
    >
      {({values, handleChange, errors}) => (
        <div className="textArea-wrapper">
          <ToastContainer/>
            <div className="input-forms-item">
              <div className="input-label">당신의 퍼스널 컬러는?</div>
                <FormControl>
                  <Select
                    value={values.personalcolor}
                    name="personalcolor"
                    label="Personalcolor"
                    variant="outlined"
                    color="primary"
                    onChange={handleChange}
                  >
                    <MenuItem value={"spring"}>Warm Spring</MenuItem>
                    <MenuItem value={"summer"}>Cool Summer</MenuItem>
                    <MenuItem value={"autumn"}>Warm Autumn</MenuItem>
                    <MenuItem value={"winter"}>Cool Winter</MenuItem>
                  </Select>
                </FormControl>
              <div className="error-message">
                {errors.personalcolor}
              </div>
          </div>
        </div>
      )}
    </Formik>
  );

};

export default ColorSelector;