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

  const [question, setQuestion] = useState("");
  const handleQuestion = (questionText) => {
    setQuestion(questionText);
  };

  switch (step) {
    case 1:
      return (
        <JobTitle
          nextStep={nextStep}
          // handleFormData={handleFormData}
          formData={formData}
          handleQuestion={handleQuestion}
        />
      );
    // case 2:
    //   return (
    //     <JobLevel
    //       nextStep={nextStep}
    //       prevStep={prevStep}
    //       handleFormData={handleFormData}
    //     />
    //   );
    case 2:
      navigate("/answer", {
        state: {
          question: question,
        }
      });
      
      break;

    default:
      return;
  }
}

export default Config;