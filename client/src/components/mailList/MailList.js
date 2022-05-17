import "./mailList.css";

const MailList = () => {
  return (
    <div className="mail">
      <div className="mail-info">
        <h2 className="mail-title">Save time, save money!</h2>
        <span className="mail-desc">
          Sign up and we'll send the best deals to you
        </span>
      </div>
      <div className="mail-input-container">
        <input
          type="email"
          placeholder="Your Email"
          name=""
          id=""
          className="mail-input"
        />
        <button className="mail-button">Subscribe</button>
      </div>
    </div>
  );
};

export default MailList;
