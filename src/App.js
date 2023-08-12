import React from "react";
import LandingPage from "./views/LandingPage";
import Quiz from "./views/Quiz";
import Quiz2 from "./views/Quiz2";
import Answer from "./views/Answer";
import Answer2 from "./views/Answer2";
import Result from "./views/Result";
import "./styles/globals.css";
import {
  BrowserRouter as Switch,
  Routes,
  Route,
  Router,
  useLocation,
} from "react-router-dom";

const App = () => {
  return (
    <div>
      <Switch>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/quiz1" element={<Quiz />} />
          <Route exact path="/quiz2" element={<Quiz2 />} />
          <Route exact path="/answer" element={<Answer />} />
          <Route exact path="/answer2" element={<Answer2 />} />
          <Route exact path="/result" element={<Result />} />
        </Routes>
      </Switch>
    </div>
  );
};

export default App;
