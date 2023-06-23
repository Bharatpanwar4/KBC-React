import { useEffect, useMemo, useState } from "react";
import "./app.css";
import moneyPyramid from "./assets/data/moneyPramid";
import Start from "./components/Start";
import data from "./assets/data/qusetions";
import Quiz from "./components/Quiz";
import Timer from "./components/Timer";

// import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

function App() {
  const [userName, setUserName] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("₹ 0");
  // const { width, height } = useWindowSize()
  useEffect(() => {
    questionNumber > 1 &&
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [questionNumber]);

  useMemo(() => moneyPyramid, []);

  return (
    <div className="app">
      {userName ? (
        <>
          <div className="main">
            {stop ? (
              <h1 className="endText">{userName},You earned: {earned}</h1>
            ) : questionNumber === 16 ? (
              <>
              <Confetti/>
              
              <h1 className="endText">
              <pre>Congratulations {userName}, you are a Millionaire!  </pre>
              <pre style={{textAlign:'center',padding:'10px'}}> You Won ₹ 1000000000</pre>
            </h1>
            
          
              </>
              
            ) : (
              <>
                <div className="top">
                  <div className="timer">
                    <Timer setStop={setStop} questionNumber={questionNumber} />
                  </div>
                </div>
                <div className="bottom">
                  <Quiz
                    data={data}
                    setStop={setStop}
                    setQuestionNumber={setQuestionNumber}
                    questionNumber={questionNumber}
                  />
                </div>
              </>
            )}
          </div>
          <div className="pyramid">
            <ul className="moneyList">
              {moneyPyramid.map((e) => (
                <li
                  className={
                    questionNumber === e.id
                      ? "moneyListItem active"
                      : "moneyListItem"
                  }
                  key={e.id}
                >
                  <span className="moneyListItemNumber">{e.id}</span>
                  <span className="moneyListItemAmount">{e.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <Start setUserName={setUserName} />
      )}
    </div>
  );
}

export default App;
