import React, {useState}from 'react';
import { useNavigate } from 'react-router-dom'; 
import "./Season.scss"
import AddIcon from '@mui/icons-material/Add';

const SeasonSelector = (props) => {
  const navigate = useNavigate()
  const [isCheck, setCheck] = useState(false);

  return (
    <div id="wrapper">
      <div className='circle-container'>
    {isCheck && (
      <>
      <button className="circle" 
        onClick={() => navigate('/board/spring')}
        style={{backgroundColor: "#fff181", opacity: "75%", position:'absolute', bottom:'290px'}}
      >
        봄
      </button>
      <button className="circle" 
        onClick={() => navigate('/board/summer')}
        style={{backgroundColor: "#b3e6c1", opacity: "75%", position:'absolute', bottom:'210px'}}
      >
        여름
      </button>
      <button className="circle" 
        onClick={() => navigate('/board/autumn')}
        style={{backgroundColor: "#f8c69e", opacity: "75%", position:'absolute', bottom:'130px'}}
      >
        가을
      </button>
      <button className="circle" 
          onClick={() => navigate('/board/winter')}
          style={{backgroundColor: "#b0c4de", opacity: "75%",  position:'absolute', bottom:'50px'}}
        >
        겨울
      </button>
    </>
    )}
      <button className="circle" 
          onClick={() => {
            // setCheck로 state값을 변경해주자.
            // e로 상태값을 받아왔다. 클릭시 상태값은 !상태값이므로 값이 반전된다 false -> true
            setCheck((e) => !e);
          }}
          style={{backgroundColor: "#b0c4de", opacity: "75%", position:'absolute'}}
        >
        <AddIcon/>
      </button>
      </div>
    </div>
  );
}

export default SeasonSelector;