import React from "react";
import { useLocation } from 'react-router-dom';

import "../styles/result.css";
import Header from "../components/Header";
import CelebrateImg from "../assets/img/celebrate.png";
import "bootstrap/dist/css/bootstrap.css";
import ResultAccordion from "../components/ResultAccordion";

const Result = () => {

  const location = useLocation();

  const audioUrl = URL.createObjectURL(location.state.rawAudio);

  return (
    <main className="result-page">
      <Header to="/begin" showPracticeAgainBtn={true} />
      <section className="result-section">
        <div className="box">
          <div className="result-content">
            <img src={CelebrateImg} alt="CelebrateImg" />
            <h3>
              Congrats, you just made it! Let's take a moment to review your answers.
            </h3>
            <div className="result-box">
              <ResultAccordion
                resultNo="01/01"
                question={location.state.question}
                answer={location.state.transcript}
                audioSrc={audioUrl}
              />
              {/*
              <ResultAccordion
                resultNo="02/10"
                question="How did you collaborate with your team members?"
                answer="Live View has unique use cases It’s difficult to keep the same DNA from the core maps design system. If I stick to the core design system, then the solution is not creative enough to solve the user problem in AR. Whereas, if we focus on just our use case, then the our design.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex dsa ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
              />
              */}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
export default Result;
