import React, { Component } from 'react';
import "../styles/quiz.css";
import Header from "../components/Header";

export default class JobLevel extends Component {
  continue = e => {
    e.preventDefault();
    this.props.handleChange('jobLevel', e);
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    return (
      <main className="ib">
        <div className="quiz-page">
          <Header to="/begin" toText="Your career path?" clickEventHandler={this.back} />
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
                    <button className="quiz-option" onClick={this.continue} value="entry">Entry level</button>
                  </div>
                  <div className="quiz-grid-card">
                    <button className="quiz-option" onClick={this.continue} value="mid">Mid level</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  };
}
