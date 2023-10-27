import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import JobTitle from './JobTitle';
import JobLevel from './JobLevel';

const Config = () => {

  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobLevel: ""
  });

  // Proceed to next step
  const nextStep = () => {
    setStep(step + 1);
  };

  // Go back to prev step
  const prevStep = () => {
    setStep(step - 1);
  };

  // Handle fields change
  const handleFormData = (input, e) => {
    setFormData(prevState => ({
      ...prevState,
      [input]: e.target.value
    }));
  };

  switch (step) {
    case 1:
      return (
        <JobTitle
          nextStep={nextStep}
          handleFormData={handleFormData}
        />
      );
    case 2:
      return (
        <JobLevel
          nextStep={nextStep}
          prevStep={prevStep}
          handleFormData={handleFormData}
        />
      );
    case 3:
      const data = new FormData();
      data.append("job_title", formData.jobTitle);
      data.append("job_level", formData.jobLevel);

      const req = {
        method: "POST",
        body: data
      };
      
      fetch(process.env.REACT_APP_API_BASE_URL + "/questions/first", req)
      .then(resp => resp.json())
      .then(json => navigate("/answer", {
        state: {
          question: json.question
        }
      }))
      .catch(err => console.log(err));
      
      break;

    default:
      return;
  }
}

export default Config;