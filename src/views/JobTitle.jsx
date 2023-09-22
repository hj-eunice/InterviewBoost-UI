import React from 'react';
import "../styles/quiz.css";
import Header from "../components/Header";

const JobTitle = ({ nextStep, handleFormData }) => {

  const submitFormData = e => {
    e.preventDefault();
    handleFormData('jobTitle', e);
    nextStep();
  };

  return (
    <main className="ib">
      <div className="quiz-page">
        <Header to="/" toText="" />
        <section className="quiz-section">
          <div className="box">
            <div className="section-content quiz-content">
              <h1>Your career path?</h1>
              <p>
                You can master behavioral interviews in two booming career tracks.
                <br /> We use AI to help you excel in your desired field.
              </p>
              <div className="quiz-grid">
                <div className="quiz-grid-card">
                  <button className="quiz-option" onClick={submitFormData} value="product designer">Product Designer</button>
                </div>
                <div className="quiz-grid-card">
                  <button className="quiz-option" onClick={submitFormData} value="software engineer">Software Engineer</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default JobTitle;