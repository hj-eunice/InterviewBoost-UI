import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

import RecordRTC from 'recordrtc';

import "../styles/answer.css";
import "../styles/quiz.css";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import AnswerIcon from "../assets/img/record-icon.svg";
import DoneIcon from "../assets/img/done-icon.svg";
import PauseIcon from "../assets/img/pause-icon.svg";
import PlayIcon from "../assets/img/play-icon.svg";
import { gsap } from "gsap";
import $ from "jquery";

const Answer = () => {

  const location = useLocation();

  const timelineRef = useRef(null);
  const intervalRef = useRef(null);
  const [giveAnswer, setGiveAnswer] = useState(true);
  const [doneGivingAnswer, setDoneGivingAnswer] = useState(false);
  const [reDoAnswer, setReDoAnswer] = useState(false);
  const [color, setColor] = useState("#1373ea");
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [showTimer, setShowTimer] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isTextareaDisabled, setIsTextareaDisabled] = useState(false);

  // start of audio recording
  const recorderRef = useRef(null);
  const audioRef = useRef(new Audio());
  const micRef = useRef(null);

  // transcription
  const [transcript, setTranscript] = useState("");
  const [isTranscribing, setIsTranscribing] = useState(false);

  const handleStartRecording = () => {
    // make sure to stop the audio
    handleStopAudio();
    // reset transcript
    setTranscript("");

    if (!micRef.current) {
      navigator.mediaDevices.getUserMedia({
        audio: true
      }).then(mic => {
        micRef.current = mic;

        recorderRef.current = new RecordRTC(mic, {
          type: 'audio',
          numberOfAudioChannels: 2,
          bufferSize: 4096,
          sampleRate: 44100
        });
        recorderRef.current.startRecording();
      }).catch(error => {
        alert('Unable to capture your microphone. Please check console logs.');
        return;
      });
    }
  };

  const speechToText = () => {
    var fileReader = new FileReader();
    fileReader.readAsDataURL(recorderRef.current.getBlob());
    fileReader.onloadend = () => {
      var base64String = fileReader.result;
      var fileBase64 = base64String.substr(base64String.indexOf(',') + 1);

      var data = new FormData();
      data.append("fileBase64", fileBase64);

      const req = {
        method: "POST",
        body: data
      };

      fetch(process.env.REACT_APP_API_BASE_URL + "/transcribe", req)
      .then(resp => resp.json())
      .then(json => {
        setTranscript(json.transcript);
        setIsTranscribing(false);
      })
      .catch(err => console.log(err));
    };
  };

  const handleStopRecording = () => {
    if (recorderRef.current.getState() !== "recording") return;

    recorderRef.current.stopRecording(() => {
      audioRef.current.src = recorderRef.current.toURL();

      setIsTranscribing(true);
      speechToText();

      micRef.current.stop();
      micRef.current = null;
    });
  };

  const handlePlayAudio = () => {
    audioRef.current.onended = () => {
      setIsAudioPlaying(false);
    };
    audioRef.current.play();
    setIsAudioPlaying(true);
  };

  const handleStopAudio = () => {
    audioRef.current.pause();
    audioRef.currentTime = 0;

    setIsAudioPlaying(false);
  };
  // end of audio recording

  const navigate = useNavigate();
  const handleSubmitAnswer = () => {

    if (!recorderRef.current || !recorderRef.current.getBlob()) {
      alert("Please record your answer to submit.");
      return;
    }

    navigate("/result", {
      state: {
        question: location.state.question,
        transcript: transcript,
        rawAudio: recorderRef.current.getBlob()
      }
    });
  };

  useEffect(() => {
    timelineRef.current = gsap.timeline({
      paused: true,
    });

    timelineRef.current
      .to(".prog", {
        width: "100%",
        duration: 240,
        ease: "linear",
      })
      .to(
        ".prog",
        {
          backgroundColor: "#CB7C1E",
          duration: 0,
        },
        "122"
      )
      .to(
        ".timer",
        {
          color: "#CB7C1E",
          duration: 0,
        },
        "122"
      )
      .to(
        ".timer",
        {
          color: "#D91826",
          duration: 0,
        },
        "182"
      )
      .to(
        ".prog",
        {
          backgroundColor: "#D91826",
          duration: 0,
        },
        "182"
      );
  }, []);
  useEffect(() => {
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        setIsActive(false);
      } else {
        setIsActive(true);
      }
    });

    if (showTimer && isActive) {
      intervalRef.current = setInterval(() => {
        if (seconds < 59) {
          setSeconds(seconds + 1);
        }
        if (seconds === 59) {
          if (minutes === 4) {
            clearInterval(intervalRef.current);
          } else {
            setMinutes(minutes + 1);
            setSeconds(0);
          }
        }
        if (minutes === 1) {
          setColor("#CB7C1E");
        }
        if (minutes === 2) {
          setColor("#D91826");
        }
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [showTimer, minutes, seconds, isActive]);

  const minutesDisplay = String(minutes).padStart(2, "0");
  const secondsDisplay = String(seconds).padStart(2, "0");
  const handleAnswerClick = () => {
    setShowTimer(true);
    handleStartRecording();
  };
  const handleDoneClick = () => {
    handleStopRecording();
    clearInterval(intervalRef.current);
  };
  const handleRedoClick = () => {
    clearInterval(intervalRef.current);
    setShowTimer(false);
    setMinutes(0);
    setSeconds(0);
    setColor("#1373ea");
    setShowTimer(true);
    handleStartRecording();
  };
  const toggleTextareaDisable = () => {
    setIsTextareaDisabled(!isTextareaDisabled);
  };

  const [startFunction, setStartFunction] = useState(false);

  const handleRedoNextAfterFourMins = () => {
    setStartFunction(true);
  };

  useEffect(() => {
    let timer;
    if (startFunction) {
      timer = setTimeout(() => {
        handleStopRecording();

        setGiveAnswer(false);
        setDoneGivingAnswer(false);
        setReDoAnswer(true);
        timelineRef.current.pause();
        clearInterval(intervalRef.current);
        setStartFunction(false);
      }, 242000); // 240,000 milliseconds = 4 minutes
    }

    return () => {
      if (timer) {
        clearTimeout(timer); // Clear the timeout if the component is unmounted
      }
    };
  }, [startFunction]);
  const timerDisplayBlock = () => {
    $(".timer").css({
      display: "block",
    });
  };

  return (
    <main className="ib">
      <div className="answer-page">
        <Header to="/begin" toText="Your difficulty level?" />
        <section className="answer-section">
          {/* style={{ color: color }} */}
          <div className="prog"></div>
          <div className="timer">
            {minutesDisplay}:{secondsDisplay}
          </div>
          <div className="answer-section-top">
            <div className="box">
              <div className="answer-content">
                <span className="answer-number">1/1</span>
                <h3>{location.state.question}</h3>
              </div>
            </div>
          </div>
          <div className="answer-section-bottom">
            <div className="box">
              <div className="answer-textbox">
                <textarea
                  disabled={isTextareaDisabled}
                  name=""
                  id=""
                  defaultValue={transcript}
                  readOnly
                ></textarea>
              </div>
              <div className="answer-btn-box">
                <div className="pause-play-box">
                  {reDoAnswer ? (
                    <>
                      {isAudioPlaying ? (
                        <img
                          onClick={() => {
                            audioRef.current.pause();
                            setIsAudioPlaying(false);
                          }}
                          src={PauseIcon}
                          alt="PlayIcon"
                        />
                      ) : (
                        <img
                          onClick={() => {
                            handlePlayAudio();
                          }}
                          src={PlayIcon}
                          alt="PlayIcon"
                        />
                      )}
                    </>
                  ) : null}
                </div>
                {giveAnswer ? (
                  <div className="btn-flexbox">
                    <button
                      onClick={() => {
                        setGiveAnswer(false);
                        setDoneGivingAnswer(true);
                        timelineRef.current.restart();
                        handleAnswerClick();
                        toggleTextareaDisable();
                        handleRedoNextAfterFourMins();
                        timerDisplayBlock();
                      }}
                      className="btn-blue"
                    >
                      <img src={AnswerIcon} alt="AnswerIcon" />
                      Answer
                    </button>
                    <button className="btn-outline" onClick={handleSubmitAnswer}>Next</button>
                  </div>
                ) : null}
                {doneGivingAnswer ? (
                  <button
                    onClick={() => {
                      setDoneGivingAnswer(false);
                      setReDoAnswer(true);
                      timelineRef.current.pause();
                      handleDoneClick();
                      toggleTextareaDisable();
                    }}
                    className="btn-outline"
                  >
                    <img src={DoneIcon} alt="DoneIcon" />
                    Done
                  </button>
                ) : null}
                {reDoAnswer ? (
                  <div className="btn-flexbox">
                    <button
                      onClick={() => {
                        setDoneGivingAnswer(true);
                        setReDoAnswer(false);
                        timelineRef.current.restart();
                        handleRedoClick();
                        toggleTextareaDisable();
                        handleRedoNextAfterFourMins();
                      }}
                      className="btn-outline"
                    >
                      Redo
                    </button>
                    <button className="btn-blue" onClick={handleSubmitAnswer}>Next</button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Answer;
