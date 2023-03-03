import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Season.scss";
import { Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const SeasonSelector = (props) => {
  const navigate = useNavigate();
  const [isCheck, setCheck] = useState(false);

  return (
    <div id="wrapper">
      <Grid container>
        <Grid item></Grid>
        <Grid item></Grid>
        <Grid item>
          <Grid
            container
            justify="space-between"
            alignItems="center"
            spacing={5}
            direction="column"
          >
            {isCheck && (
              <>
                <Grid item>
                  <button
                    className="circle"
                    onClick={() => navigate("/board/spring")}
                    style={{ backgroundColor: "#fff181", opacity: "75%" }}
                  >
                    봄
                  </button>
                </Grid>
                <Grid item>
                  <button
                    className="circle"
                    onClick={() => navigate("/board/summer")}
                    style={{ backgroundColor: "#b3e6c1", opacity: "75%" }}
                  >
                    여름
                  </button>
                </Grid>
                <Grid item>
                  <button
                    className="circle"
                    onClick={() => navigate("/board/autumn")}
                    style={{ backgroundColor: "#f8c69e", opacity: "75%" }}
                  >
                    가을
                  </button>
                </Grid>
                <Grid item>
                  <button
                    className="circle"
                    onClick={() => navigate("/board/winter")}
                    style={{ backgroundColor: "#b0c4de", opacity: "75%" }}
                  >
                    겨울
                  </button>
                </Grid>
              </>
            )}
            <Grid item>
              <button
                className="circle"
                onClick={() => {
                  // setCheck로 state값을 변경해주자.
                  // e로 상태값을 받아왔다. 클릭시 상태값은 !상태값이므로 값이 반전된다 false -> true
                  setCheck((e) => !e);
                }}
                style={{ backgroundColor: "#b0c4de", opacity: "75%" }}
              >
                <AddIcon />
              </button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default SeasonSelector;
