import "./StoryTextArea.scss";

const ShopInfo = ({
  setAddress,
  setShop,
  setStyle,
  setStyleInfo,
  address,
  shopname,
  stylename,
  styleinfo,
}) => {
  return (
    <div>
      <div className="story-textarea-wrapper">
        <h4>Item 상세정보 입력</h4>
        <input
          onChange={(e) => {
            setShop(e.target.value);
          }}
          className="info"
          placeholder="업체명을 입력하세요"
          value={shopname}
        />
        <input
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          className="info"
          placeholder="주소를 입력하세요"
          value={address}
        />
        <input
          onChange={(e) => {
            setStyle(e.target.value);
          }}
          className="info"
          placeholder="제품명을 입력해주세요"
          value={stylename}
        />
        <textarea
          onChange={(e) => {
            setStyleInfo(e.target.value);
          }}
          className="textarea"
          placeholder="내용을 입력하세요"
          value={styleinfo}
        />
      </div>
    </div>
  );
};
export default ShopInfo;
