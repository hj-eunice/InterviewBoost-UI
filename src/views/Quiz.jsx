import React from "react";
import "../styles/quiz.css";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const Quiz = () => {
  return (
    <main className="ib">
      <div className="quiz-page">
        <Header to="/" toText="" />
        <section className="quiz-section">
          <div className="box">
            <div className="section-content quiz-content">
              <h1>Your career path?</h1>
              <p>
                You can master behavioral interviews in two booming career
                tracks.
                <br /> We use AI to help you excel in your desired field.
              </p>
              <div className="quiz-grid">
                <div className="quiz-grid-card">
                  <input type="radio" name="quiz" id="quiz1" />
                  <label htmlFor="quiz1">
                    <Link to="/quiz2">
                      <div className="quiz-option">Product Designer</div>
                    </Link>
                  </label>
                </div>
                <div className="quiz-grid-card">
                  <input type="radio" name="quiz" id="quiz2" />
                  <label htmlFor="quiz2">
                    <Link to="/quiz2">
                      <div className="quiz-option">Software Engineer</div>
                    </Link>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Quiz;
