// src/App.js (시험 ID 기반 + 복사 가능한 링크 항상 표시)
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ExcelUpload from './ExcelUpload';
import NameInput from './NameInput';
import QuizPage from './QuizPage';
import ResultPage from './ResultPage';

function App() {
  const [searchParams] = useSearchParams();
  const [questions, setQuestions] = useState([]);
  const [step, setStep] = useState('loading');
  const [username, setUsername] = useState('');
  const [score, setScore] = useState(0);
  const [generatedLink, setGeneratedLink] = useState('');

  const testId = searchParams.get('testId');

  useEffect(() => {
    if (testId) {
      const stored = localStorage.getItem(`exam-${testId}`);
      if (stored) {
        setQuestions(JSON.parse(stored));
        setStep('name');
      } else {
        alert('시험 ID가 유효하지 않거나 문제가 없습니다.');
      }
    } else {
      setStep('create');
    }
  }, [testId]);

  const handleExcelUpload = (q) => {
    const generatedId = `test-${Date.now()}`;
    const link = `http://localhost:3000/?testId=${generatedId}`;
    localStorage.setItem(`exam-${generatedId}`, JSON.stringify(q));
    setGeneratedLink(link);
    setQuestions(q);
    setStep('name');
  };

  const startQuiz = (name) => {
    setUsername(name);
    setStep('quiz');
  };

  const finishQuiz = (finalScore) => {
    setScore(finalScore);
    setStep('result');
  };

  return (
    <div>
      {(step === 'create' || generatedLink) && (
        <>
          {step === 'create' && <ExcelUpload onQuestionsReady={handleExcelUpload} />}
          {generatedLink && (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <p>시험 링크가 생성되었습니다! 아래 주소를 학생에게 전달하세요:</p>
              <input
                type="text"
                value={generatedLink}
                readOnly
                style={{ width: '80%', padding: '10px', fontSize: '14px' }}
              />
              <br />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedLink);
                  alert('링크가 복사되었습니다!');
                }}
                style={{ marginTop: '10px', padding: '10px 20px' }}
              >
                링크 복사하기
              </button>
            </div>
          )}
        </>
      )}
      {step === 'name' && <NameInput onStart={startQuiz} />}
      {step === 'quiz' && <QuizPage questions={questions} onFinish={finishQuiz} />}
      {step === 'result' && <ResultPage username={username} score={score} />}
      {step === 'loading' && <p style={{ textAlign: 'center', paddingTop: '2rem' }}>로딩 중...</p>}
    </div>
  );
}

export default App;
