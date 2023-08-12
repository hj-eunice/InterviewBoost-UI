import React, { useState } from "react";
import "../styles/result.css";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import CelebrateImg from "../assets/img/celebrate.png";
import { Accordion, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { MdKeyboardArrowUp } from "react-icons/md";
import PauseIcon from "../assets/img/pause-icon.svg";
import PlayIcon from "../assets/img/play-icon.svg";

const ResultAccordion = (props) => {
  const [open, setOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };
  return (
    <Accordion defaultActiveKey={0}>
      <Card>
        <Card.Header>
          <span className="answer-number">{props.resultNo}</span>
          <Button onClick={toggleOpen} variant="link">
            <p>{props.question}</p>
            <div
              style={
                open
                  ? { transform: "rotate(0deg)" }
                  : { transform: "rotate(180deg)" }
              }
            >
              <MdKeyboardArrowUp />
            </div>
          </Button>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body
            style={
              open ? { height: "100%" } : { overflow: "hidden", height: "7rem" }
            }
          >
            <p>{props.answer}</p>
            <>
              {isAudioPlaying ? (
                <img
                  onClick={() => {
                    setIsAudioPlaying(false);
                  }}
                  src={PauseIcon}
                  alt="PlayIcon"
                />
              ) : (
                <img
                  onClick={() => {
                    setIsAudioPlaying(true);
                  }}
                  src={PlayIcon}
                  alt="PlayIcon"
                />
              )}
            </>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default ResultAccordion;
