import React from 'react';
import "../styles/quiz.css";
import Header from "../components/Header";

const JobLevel = ({ nextStep, prevStep, handleFormData }) => {

  const submitFormData = e => {
    e.preventDefault();
    handleFormData('jobLevel', e);
    nextStep();
  };

  const back = e => {
    e.preventDefault();
    prevStep();
  };

  return (
    <main className="ib">
      <div className="quiz-page">
        <Header to="/begin" toText="Your career path?" clickEventHandler={back} />
        <section className="quiz-section">
          <div className="box">
            <div className="quiz-content">
              <h1>Your difficulty level?</h1>
              <p>
                We provide tailored interview prompt based on preferred level of difficulty.
              </p>
              <div className="quiz-grid">
                <div className="quiz-grid-card">
                  <button className="quiz-option" onClick={submitFormData} value="entry-level">Entry level</button>
                </div>
                <div className="quiz-grid-card">
                  <button className="quiz-option" onClick={submitFormData} value="mid-level">Mid level</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default JobLevel;