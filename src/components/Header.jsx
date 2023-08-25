import React from "react";
import { MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";
const Header = (props) => {
  return (
    <header className="ib">
      <div className="header-box">
        <div className="header-content">
          <div className="header-left">
            {props.showPracticeAgainBtn ? (
              <Link to="/quiz1" className="btn-blue">
                Practice again
              </Link>
            ) : props.clickEventHandler ? (
              <Link to={props.to} onClick={props.clickEventHandler}>
                <MdArrowBack /> <span>{props.toText}</span>
              </Link>
            ) : (
              <Link to={props.to}>
                <MdArrowBack /> <span>{props.toText}</span>
              </Link>
            )}
          </div>
          <div className="header-right">
            <Link to="/">InterviewBoost</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
