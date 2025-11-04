import React, { useState, useEffect } from 'react';
import { Trophy, Brain, Target, Zap, CheckCircle, XCircle, Award, TrendingUp } from 'lucide-react';

const LSATApp = () => {
  const [currentView, setCurrentView] = useState('home');
  const [userStats, setUserStats] = useState({
    totalPoints: 0,
    streak: 0,
    level: 1,
    logicalReasoning: 0,
    analyticalReasoning: 0,
    readingComp: 0
  });
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [gameMode, setGameMode] = useState(null);

  const questionSets = {
    logical: [
      {
        id: 1,
        type: "Logical Reasoning",
        question: "All politicians are good speakers. Some lawyers are politicians. Therefore:",
        options: [
          "All lawyers are good speakers",
          "Some lawyers are good speakers",
          "No lawyers are good speakers",
          "All good speakers are lawyers"
        ],
        correct: 1,
        explanation: "If some lawyers are politicians, and all politicians are good speakers, then those lawyers who are politicians must be good speakers. So 'some lawyers are good speakers' is the valid conclusion."
      },
      {
        id: 2,
        type: "Logical Reasoning",
        question: "The city's new policy requires all restaurants to display calorie information. This will help reduce obesity because:",
        assumption: "Which assumption does this argument rely on?",
        options: [
          "People care about their health",
          "People will change their eating habits based on calorie information",
          "Restaurants have accurate calorie information",
          "Obesity is only caused by restaurant food"
        ],
        correct: 1,
        explanation: "The argument assumes that displaying information will lead to behavior change. Without this assumption, the policy wouldn't reduce obesity."
      },
      {
        id: 3,
        type: "Logical Reasoning",
        question: "Studies show that people who drink coffee live longer. Therefore, coffee must be healthy.",
        flaw: "What is the flaw in this reasoning?",
        options: [
          "Correlation doesn't imply causation",
          "Not everyone drinks coffee",
          "Some studies are unreliable",
          "Coffee has caffeine"
        ],
        correct: 0,
        explanation: "This is a classic correlation vs. causation error. People who drink coffee might live longer for other reasons (lifestyle, genetics, etc.), not because of the coffee itself."
      }
    ],
    analytical: [
      {
        id: 4,
        type: "Analytical Reasoning",
        question: "Five students (A, B, C, D, E) sit in a row. A sits next to B. C doesn't sit at either end. D sits somewhere to the right of E. Which arrangement is possible?",
        options: [
          "A-B-C-E-D",
          "E-A-B-C-D",
          "B-A-C-D-E",
          "C-A-B-E-D"
        ],
        correct: 1,
        explanation: "Option E-A-B-C-D satisfies all conditions: A next to B (check), C not at ends (check), D to the right of E (check)."
      },
      {
        id: 5,
        type: "Analytical Reasoning",
        question: "Three doctors (X, Y, Z) work different shifts. X works before Y. Z doesn't work the last shift. Y doesn't work the first shift. What's the order?",
        options: [
          "X-Y-Z",
          "X-Z-Y",
          "Z-X-Y",
          "Y-Z-X"
        ],
        correct: 1,
        explanation: "X before Y (rules out options with Y before X). Z not last (eliminates some). Y not first (confirms X is first). Answer: X-Z-Y."
      }
    ],
    reading: [
      {
        id: 6,
        type: "Reading Comprehension",
        passage: "The concept of 'wisdom of crowds' suggests that large groups can make better decisions than individuals. However, this only works when group members think independently. If everyone follows the same leader or shares the same biases, the crowd becomes no wiser than a single person.",
        question: "The author would most likely agree with which statement?",
        options: [
          "Groups always make better decisions than individuals",
          "Independent thinking is crucial for collective wisdom",
          "Leaders should always guide group decisions",
          "Biases never affect group decisions"
        ],
        correct: 1,
        explanation: "The passage emphasizes that wisdom of crowds only works with independent thinking, making option B the best answer."
      }
    ]
  };

  const startGame = (mode) => {
    setGameMode(mode);
    let questions;
    switch(mode) {
      case 'logical':
        questions = questionSets.logical;
        break;
      case 'analytical':
        questions = questionSets.analytical;
        break;
      case 'reading':
        questions = questionSets.reading;
        break;
      default:
        questions = [...questionSets.logical, ...questionSets.analytical, ...questionSets.reading];
    }
    setCurrentQuestion(questions[Math.floor(Math.random() * questions.length)]);
    setCurrentView('game');
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const checkAnswer = () => {
    if (selectedAnswer === null) return;
    
    setShowResult(true);
    if (selectedAnswer === currentQuestion.correct) {
      setUserStats(prev => ({
        ...prev,
        totalPoints: prev.totalPoints + 10,
        streak: prev.streak + 1,
        [gameMode === 'logical' ? 'logicalReasoning' : 
         gameMode === 'analytical' ? 'analyticalReasoning' : 'readingComp']: 
         prev[gameMode === 'logical' ? 'logicalReasoning' : 
              gameMode === 'analytical' ? 'analyticalReasoning' : 'readingComp'] + 10
      }));
    } else {
      setUserStats(prev => ({ ...prev, streak: 0 }));
    }
  };

  const nextQuestion = () => {
    startGame(gameMode);
  };

  const HomeView = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 pt-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Brain className="w-12 h-12 text-yellow-300" />
            <h1 className="text-4xl font-bold text-white">LSAT Master</h1>
          </div>
          <p className="text-blue-100">Level up your critical thinking!</p>
        </div>

        <div className="bg-white rounded-2xl p-6 mb-6 shadow-2xl">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
              <div className="text-2xl font-bold text-gray-800">{userStats.totalPoints}</div>
              <div className="text-sm text-gray-600">Points</div>
            </div>
            <div>
              <Zap className="w-8 h-8 mx-auto mb-2 text-orange-500" />
              <div className="text-2xl font-bold text-gray-800">{userStats.streak}</div>
              <div className="text-sm text-gray-600">Streak</div>
            </div>
            <div>
              <Award className="w-8 h-8 mx-auto mb-2 text-purple-500" />
              <div className="text-2xl font-bold text-gray-800">{userStats.level}</div>
              <div className="text-sm text-gray-600">Level</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => startGame('logical')}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl p-6 shadow-lg transform transition hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <h3 className="text-xl font-bold mb-1">Logical Reasoning</h3>
                <p className="text-blue-100 text-sm">Master arguments & flaws</p>
              </div>
              <Target className="w-10 h-10" />
            </div>
            <div className="mt-3 bg-blue-400 bg-opacity-30 rounded-lg p-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{userStats.logicalReasoning} XP</span>
              </div>
              <div className="w-full bg-blue-300 bg-opacity-30 rounded-full h-2 mt-1">
                <div 
                  className="bg-yellow-300 h-2 rounded-full"
                  style={{width: `${Math.min(userStats.logicalReasoning, 100)}%`}}
                />
              </div>
            </div>
          </button>

          <button
            onClick={() => startGame('analytical')}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl p-6 shadow-lg transform transition hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <h3 className="text-xl font-bold mb-1">Analytical Reasoning</h3>
                <p className="text-green-100 text-sm">Solve logic games</p>
              </div>
              <Brain className="w-10 h-10" />
            </div>
            <div className="mt-3 bg-green-400 bg-opacity-30 rounded-lg p-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{userStats.analyticalReasoning} XP</span>
              </div>
              <div className="w-full bg-green-300 bg-opacity-30 rounded-full h-2 mt-1">
                <div 
                  className="bg-yellow-300 h-2 rounded-full"
                  style={{width: `${Math.min(userStats.analyticalReasoning, 100)}%`}}
                />
              </div>
            </div>
          </button>

          <button
            onClick={() => startGame('reading')}
            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl p-6 shadow-lg transform transition hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <h3 className="text-xl font-bold mb-1">Reading Comprehension</h3>
                <p className="text-purple-100 text-sm">Analyze passages</p>
              </div>
              <TrendingUp className="w-10 h-10" />
            </div>
            <div className="mt-3 bg-purple-400 bg-opacity-30 rounded-lg p-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{userStats.readingComp} XP</span>
              </div>
              <div className="w-full bg-purple-300 bg-opacity-30 rounded-full h-2 mt-1">
                <div 
                  className="bg-yellow-300 h-2 rounded-full"
                  style={{width: `${Math.min(userStats.readingComp, 100)}%`}}
                />
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  const GameView = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-4 flex justify-between items-center">
          <button
            onClick={() => setCurrentView('home')}
            className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg hover:bg-opacity-30"
          >
            ← Back
          </button>
          <div className="flex gap-2">
            <div className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg">
              🔥 {userStats.streak}
            </div>
            <div className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg">
              ⭐ {userStats.totalPoints}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-2xl">
          <div className="mb-4">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
              {currentQuestion?.type}
            </span>
          </div>

          {currentQuestion?.passage && (
            <div className="bg-blue-50 p-4 rounded-lg mb-4 border-l-4 border-blue-500">
              <p className="text-gray-700 leading-relaxed">{currentQuestion.passage}</p>
            </div>
          )}

          <h2 className="text-xl font-bold text-gray-800 mb-6">
            {currentQuestion?.assumption || currentQuestion?.flaw || currentQuestion?.question}
          </h2>

          <div className="space-y-3">
            {currentQuestion?.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => !showResult && setSelectedAnswer(idx)}
                disabled={showResult}
                className={`w-full text-left p-4 rounded-xl border-2 transition transform hover:scale-102 ${
                  showResult
                    ? idx === currentQuestion.correct
                      ? 'bg-green-100 border-green-500'
                      : idx === selectedAnswer
                      ? 'bg-red-100 border-red-500'
                      : 'bg-gray-50 border-gray-200'
                    : selectedAnswer === idx
                    ? 'bg-purple-100 border-purple-500 scale-102'
                    : 'bg-white border-gray-300 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    showResult && idx === currentQuestion.correct
                      ? 'bg-green-500 text-white'
                      : showResult && idx === selectedAnswer
                      ? 'bg-red-500 text-white'
                      : selectedAnswer === idx
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className="flex-1 text-gray-800">{option}</span>
                  {showResult && idx === currentQuestion.correct && (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  )}
                  {showResult && idx === selectedAnswer && idx !== currentQuestion.correct && (
                    <XCircle className="w-6 h-6 text-red-500" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {showResult && (
            <div className={`mt-6 p-4 rounded-xl ${
              selectedAnswer === currentQuestion.correct
                ? 'bg-green-50 border-2 border-green-500'
                : 'bg-red-50 border-2 border-red-500'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {selectedAnswer === currentQuestion.correct ? (
                  <>
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <span className="font-bold text-green-800">Correct! +10 XP</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-6 h-6 text-red-600" />
                    <span className="font-bold text-red-800">Incorrect</span>
                  </>
                )}
              </div>
              <p className="text-gray-700">{currentQuestion.explanation}</p>
            </div>
          )}

          <div className="mt-6">
            {!showResult ? (
              <button
                onClick={checkAnswer}
                disabled={selectedAnswer === null}
                className={`w-full py-4 rounded-xl font-bold text-white transition ${
                  selectedAnswer === null
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transform hover:scale-105'
                }`}
              >
                Check Answer
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-4 rounded-xl font-bold transform hover:scale-105 transition"
              >
                Next Question →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return currentView === 'home' ? <HomeView /> : <GameView />;
};

export default LSATApp;