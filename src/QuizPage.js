import React, { useState, useEffect } from 'react';

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function QuizPage({ questions, onFinish }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [shuffledChoices, setShuffledChoices] = useState([]);

  const current = questions[currentIndex];

  useEffect(() => {
    setShuffledChoices(shuffle(current.choices));
    setSelected(null);
  }, [currentIndex]);

  const handleSubmit = () => {
    const isCorrect = selected === current.answer;
    const newScore = score + (isCorrect ? 1 : 0);

    if (currentIndex + 1 < questions.length) {
      setScore(newScore);
      setCurrentIndex(currentIndex + 1);
    } else {
      const percentScore = Math.round((newScore / questions.length) * 100);
      onFinish(percentScore);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h3>문제 {currentIndex + 1} / {questions.length}</h3>
      <p><strong>단어:</strong> {current.word}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {shuffledChoices.map((choice, idx) => (
          <button
            key={idx}
            onClick={() => setSelected(choice)}
            style={{
              backgroundColor: selected === choice ? '#add8e6' : '#f0f0f0',
              padding: '10px',
              border: '1px solid #ccc',
              width: '45%'
            }}
          >
            {choice}
          </button>
        ))}
      </div>
      <br />
      <button
        onClick={handleSubmit}
        disabled={selected === null}
        style={{ padding: '10px 20px' }}
      >
        다음
      </button>
    </div>
  );
}

export default QuizPage;
