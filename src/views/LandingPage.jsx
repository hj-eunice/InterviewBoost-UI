import React from "react";
import { Link } from "react-router-dom";
import "../styles/landingpage.css";

const LandingPage = () => {
  return (
    <main className="ib">
      <div className="landing-page">
        <div className="box">
          <div className="landing-page-content">
            <h1>InterviewBoost</h1>
            <p>
              Ace Product Design and Engineering Interviews. Prepare swiftly for
              your next interview with practice key questions, gain valuable
              insights into your answers, and enhance your interviewing skills
            </p>
            <Link className="btn-blue" to="/quiz1">
              Start practicing
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
