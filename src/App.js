import React, { useEffect } from "react";
import LandingPage from "./views/LandingPage";
import Config from "./views/Config";
import Answer from "./views/Answer";
import Answer2 from "./views/Answer2";
import Result from "./views/Result";
import "./styles/globals.css";
import {
  BrowserRouter as Switch,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
  useEffect(() => {
    document.title = 'InterviewBooster.us';
  }, []);

  return (
    <div>
      <Switch>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/begin" element={<Config />} />
          {/* <Route exact path="/quiz2" element={<Quiz2 />} /> */}
          <Route exact path="/answer" element={<Answer />} />
          <Route exact path="/answer2" element={<Answer2 />} />
          <Route exact path="/result" element={<Result />} />
        </Routes>
      </Switch>
    </div>
  );
};

export default App;
