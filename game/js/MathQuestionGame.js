import React, { useState, useEffect } from "react";
import Button from "./Button";

const MathQuestionGame = () => {
    function shuffle(a) {
        for (let i = a.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [a[i - 1], a[j]] = [a[j], a[i - 1]];
        }
    }

    const randomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min)
    }
    const operationTab = ["+", "-", "*"];
    const [operation, setOperation] = useState(operationTab[Math.floor(Math.random()*operationTab.length)]);
    const [numA, setNumA] = useState(randomNumber(1,10));
    const [numB, setNumB] = useState(randomNumber(1,10));
    const [buttonTab, setButtonTab] = useState([]);
    const [time, setTime] = useState(3);
    const [blockButtons, setBlockButtons] = useState(false);
    const [answer, setAnswer] = useState(false);
    const [answerText, setAnswerText] = useState(false);
    const [passedTime, setPassedTime] = useState(3);
    const [result, setResult] = useState("");

    const calculator = (num1, num2, operation) => {
        switch (operation) {
            case "+": {
                return num1 + num2;
            }
            case "-": {
                return num1 - num2;
            }
            case "*": {
                return num1 * num2;
            }
            default:
                return num1 + num2;
        }
    }

    const generateAnswerText = () => {
        if (answer === calculator(numA, numB, operation)) {
            setAnswerText("Gratulacje");
            setBlockButtons(true);
            setPassedTime(3);
            setTime(0);
        }
        else {
            setAnswerText("Błędna odpowiedz");
            setBlockButtons(true);
            setTime(0);
            setPassedTime(3);
        }
    }

    useEffect(() => {
        const countDown = setInterval(() => {
            if (!answer) {
                setPassedTime(prevState => prevState - 0.1)
            } else {
                let timeResult = (3 - passedTime).toFixed(1);
                setResult(timeResult);
            }
        }, [100]);
        return () => {
            clearInterval(countDown);
        }
    }, [answer])

    useEffect(() => {
        const numberTab = [calculator(numA, numB, operation)];
        while (numberTab.length !== 4) {
            const num = randomNumber(1,10);
            if (!numberTab.includes(num)) {
                numberTab.push(num);
            }
        }
        shuffle(numberTab);
        setButtonTab(numberTab);
    },[numA]);

    useEffect(() => {
        const intervalID = setInterval(() => {
            setTime(prev => {
                if (prev > 0 && !answerText) {
                    return prev - 1;
                }
                else {
                    clearInterval(intervalID);
                    setBlockButtons(true);//TODO
                    if (!answerText) {
                        setAnswerText("Czas minął");
                    }
                    return 0;
                }
            })
        }, 1000);
        return () => {
            clearInterval(intervalID);
        }
    }, [answerText, numA]);
    useEffect(() => {
        if (answer) {
            generateAnswerText();
        }
    }, [answer]);
    const startAgain = () => {
        setOperation(operationTab[Math.floor(Math.random() * operationTab.length)]);
        setNumA(randomNumber(1, 10));
        setNumB(randomNumber(1, 10));
        setBlockButtons(false);
        setAnswer(false);
        setAnswerText(false);
        setTime(3);
        setPassedTime(3);
        setResult("");
    }

    const answerColor = (answer) => {
        if (answer === "Gratulacje") {
            return <h1 style={{color: "green"}}>{answerText}</h1>
        } else {
            return <h1 style={{color: "red"}}>{answerText}</h1>
        }
    }
    return (
        <div>
            <button onClick={startAgain}>Start again</button>
            <h1>{numA} {operation} {numB} =</h1>
            <div>
                {
                    buttonTab.map((el, index) => {
                        return (
                            <Button
                                key={index}
                                number={el}
                                disabledState={blockButtons}
                                getNumber={setAnswer} />
                        )
                    } )
                }
            </div>
            <h3>00:{time === 10 ? time : `0${time}`}</h3>
            {answerText && answerColor(answerText)}
            {result && <h4>Twoja odpowiedź zajęła Ci <strong style={{color: "blueviolet"}}>{result}</strong> sekundy</h4>}
        </div>
    );
};

export default MathQuestionGame;
