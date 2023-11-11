import React from "react";
import { useLocation } from 'react-router-dom';

import "../styles/result.css";
import Header from "../components/Header";
import CelebrateImg from "../assets/img/celebrate.png";
import "bootstrap/dist/css/bootstrap.css";
import ResultAccordion from "../components/ResultAccordion";

const Result = () => {

  const location = useLocation();

  const audioUrl1 = URL.createObjectURL(location.state.first_rawAudio);
  const audioUrl2 = URL.createObjectURL(location.state.second_rawAudio);

  const questions = location.state.questions;
  const answers = location.state.answers;

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
              {/* TODO: Forloop */}
              <ResultAccordion
                resultNo="01/02"
                question={questions[0]}
                answer={answers[1]}
                audioSrc={audioUrl1}
              />
              <ResultAccordion
                resultNo="02/02"
                question={questions[1]}
                answer={answers[2]}
                audioSrc={audioUrl2}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
export default Result;
