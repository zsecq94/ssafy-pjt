import "./textArea.scss";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const TextArea = ({
  setTitle,
  setContent,
  setColor,
  title,
  content,
  personalcolor,
}) => {
  // console.log(title)
  // console.log(content)
  return (
    <div className="textArea-wrapper">
      <input
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        className="title"
        placeholder="제목을 입력하세요"
        value={title}
      />
      <textarea
        onChange={(e) => {
          setContent(e.target.value);
        }}
        className="text"
        placeholder="내용을 입력하세요"
        value={content}
      />
      <div className="input-label">당신의 퍼스널 컬러는?</div>
      <FormControl>
        <Select
          name="personalcolor"
          label="Personalcolor"
          variant="outlined"
          value={personalcolor}
          onChange={(e) => {
            setColor(e.target.value);
          }}
        >
          <MenuItem value={"spring"}>Warm Spring</MenuItem>
          <MenuItem value={"summer"}>Cool Summer</MenuItem>
          <MenuItem value={"autumn"}>Warm Autumn</MenuItem>
          <MenuItem value={"winter"}>Cool Winter</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
export default TextArea;
