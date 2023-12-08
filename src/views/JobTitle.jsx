import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import "../styles/quiz.css";
import Header from "../components/Header";

// const JobTitle = ({ nextStep, handleFormData }) => {
const JobTitle = ({ nextStep, formData, handleQuestion }) => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const submitFormData = e => {
    e.preventDefault();
    // handleFormData('jobTitle', e);
    // nextStep();

    setIsLoading(true);

    formData = {
      ...formData,
      "jobTitle": e.target.value
    }

    const data = new FormData();
    data.append("job_title", formData.jobTitle);

    const req = {
      method: "POST",
      body: data
    };
    
    fetch(process.env.REACT_APP_API_BASE_URL + "/questions/first", req)
    .then(resp => resp.json())
    .then(json => {
      // handleQuestion(json.question);
      // nextStep();
      navigate("/answer", {
        state: {
          question: json.question,
          id: json.id,
        }
      });
    })
    .catch(err => console.log(err));
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
            {isLoading && <div className="section-content quiz-content">
              <p>
                Generating questions...
              </p>
            </div>}
          </div>
        </section>
      </div>
    </main>
  );
}

export default JobTitle;