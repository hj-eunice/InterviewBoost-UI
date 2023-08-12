import React from "react";
import "../styles/quiz.css";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const Quiz2 = () => {
  return (
    <main className="ib">
      <div className="quiz-page">
        <Header to="/quiz1" toText="Your career path?" />
        <section className="quiz-section">
          <div className="box">
            <div className="quiz-content">
              <h1>Your difficulty level?</h1>
              <p>
                We provide tailored interview prompt based on preferred level of
                difficulty.
              </p>
              <div className="quiz-grid">
                <div className="quiz-grid-card">
                  <input type="radio" name="quiz" id="quiz1" />
                  <label htmlFor="quiz1">
                    <Link to="/answer">
                      <div className="quiz-option">Entry level</div>
                    </Link>
                  </label>
                </div>
                <div className="quiz-grid-card">
                  <input type="radio" name="quiz" id="quiz2" />
                  <label htmlFor="quiz2">
                    <Link to="/answer">
                      <div className="quiz-option">Mid level</div>
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

export default Quiz2;
