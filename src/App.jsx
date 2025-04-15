

import { useEffect, useState } from 'react';
import { generate } from 'random-words';
import Result from './Result';
import { motion } from 'motion/react';

function App() {
  const WORD_COUNT = 30;

  const [generatedWords, setGeneratedWords] = useState(generate(WORD_COUNT));
  const [currentWord, setCurrentWord] = useState('');
  const [activeWord, setActiveWord] = useState(0);
  const [correctWord, setCorrectWord] = useState(Array(WORD_COUNT).fill(false));
  const [timer, setTimer] = useState(30);
  const [correctWordCount, setCorrectWordCount] = useState(0);
  const [wrongWordCount, setWrongWordCount] = useState(0);
  const [typedWords, setTypedWords] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [testRunning, setTestRunning] = useState(true);

  useEffect(() => {
    if (!timerRunning) return;

    const intervalID = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(intervalID);
          setTimerRunning(false);
          setTestRunning(false);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(intervalID);
  }, [timerRunning]);

  const takeTestAgain = () => {
    setGeneratedWords(generate(WORD_COUNT));
    setTestRunning(true);
    setCurrentWord('');
    setActiveWord(0);
    setCorrectWord(Array(WORD_COUNT).fill(false));
    setCorrectWordCount(0);
    setWrongWordCount(0);
    setTypedWords(0);
    setTimer(30);
    setTimerRunning(false);
  };

  const startTimer = () => {
    setActiveWord(0);
    setCurrentWord('');
    setCorrectWordCount(0);
    setTimerRunning(true);
  };

  const spaceClicked = (word) => {
    if (!word.endsWith(' ')) {
      setCurrentWord(word);
      return;
    }

    const trimmedWord = word.trim();
    const isCorrect = trimmedWord === generatedWords[activeWord];

    setCorrectWord((prev) => {
      const newCorrectWords = [...prev];
      newCorrectWords[activeWord] = isCorrect;
      return newCorrectWords;
    });

    setCorrectWordCount((prev) => (isCorrect ? prev + 1 : prev));
    setWrongWordCount((prev) => (!isCorrect ? prev + 1 : prev));
    setTypedWords((prev) => prev + 1);
    setActiveWord((prev) => (prev === WORD_COUNT - 1 ? 0 : prev + 1));
    setCurrentWord('');

    if (activeWord === WORD_COUNT - 1) {
      setGeneratedWords(generate(WORD_COUNT));
      setCorrectWord(Array(WORD_COUNT).fill(false));
    }
  };

  const keyPressed = (e) => {
    if (e.key.length === 1) {
      const keySound = new Audio('/keySound.mp3');
      keySound.volume = 0.3;
      keySound.play();
    }
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-start sm:justify-center bg-neutral-900 text-white px-4 py-8"
      style={{
        backgroundImage: `radial-gradient(circle at 0.5px 0.5px, rgba(6,182,212,0.2) 0.5px, transparent 0)`,
        backgroundSize: '8px 8px',
        backgroundRepeat: 'repeat',
      }}
    >
      {testRunning ? (
        <>
          {/* Heading */}
          <motion.h1
            className="text-3xl sm:text-4xl font-bold text-[#fefae0] mb-8 sm:mb-12 tracking-wide font-mono"
            animate={{
              scale: 3,
            }}
          >
            TypeRush ⌨️
          </motion.h1>

          {/* Timer */}
          <div
            className={`h-14 w-14 sm:h-16 sm:w-16 flex items-center justify-center text-xl font-bold text-white rounded-full shadow-lg ${
              timerRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-600'
            }`}
          >
            {timer}
          </div>

          {/* Word Box */}
          

          <div className="mt-6 h-45 sm:h-45 w-full max-w-3xl px-2 py-3 border-2 border-gray-600 rounded-xl  bg-gray-800 text-white flex flex-wrap gap-2
         shadow-[0_4px_20px_rgba(255,255,255,0.1)]   
          ">
            {generatedWords.map((eachWord, index) => (
              <span
                key={index}
                className={`text-base sm:text-lg font-semibold px-2 py-1 rounded-md ${
                  index < activeWord
                    ? correctWord[index]
                      ? 'bg-green-500 text-black'
                      : 'bg-red-500 text-black'
                    : 'text-gray-300'
                }`}
              >
                {eachWord}
              </span>
            ))}
          </div>

          {/* Input Box */}
          <input
            type="text"
            className={`mt-6 h-12 w-full max-w-md p-3 text-base sm:text-lg text-gray-900 rounded-lg border-2 outline-none transition-all duration-300
              ${
                currentWord === generatedWords[activeWord].slice(0, currentWord.length)
                  ? 'border-green-500 bg-green-100'
                  : 'border-red-500 bg-red-100'
              }`}
            value={currentWord}
            onChange={(e) => spaceClicked(e.target.value)}
            onKeyDown={keyPressed}
            autoFocus
          />

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:gap-8 items-center">
            <motion.button
              className="px-6 py-2 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-lg transition-all duration-300"
              onClick={startTimer}
              

              whileHover={{
                scale: 1.2,
              }}
            >
              ▶️ Start
            </motion.button>
            <motion.button
              className="px-6 py-2 bg-red-500 hover:bg-red-600 text-black font-semibold rounded-lg transition-all duration-300"
              onClick={takeTestAgain}
              whileHover={{
                scale: 1.2,
              }}
            >
              🔄 Restart
            </motion.button>
          </div>
        </>
      ) : (
        <Result
          correctWords={correctWordCount}
          wrongWords={wrongWordCount}
          accuracy={Math.round((correctWordCount / typedWords) * 100)}
          speed={Math.round((correctWordCount * 60) / (30 - timer))}
          takeTest={takeTestAgain}
        />
      )}

      
    </div>
  );
}

export default App;




