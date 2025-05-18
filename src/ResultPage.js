// src/ResultPage.js (시험ID 기준 점수 저장 구조 + 관리자 실명 보기 + 시험 초기화)
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function ResultPage({ username, score }) {
  const [searchParams] = useSearchParams();
  const [ranking, setRanking] = useState([]);
  const [myRank, setMyRank] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const testId = searchParams.get('testId');

  useEffect(() => {
    if (!testId) return;

    const storageKey = `results-${testId}`;
    const prev = JSON.parse(localStorage.getItem(storageKey) || '[]');

    const anonId = `익명${prev.length + 1}`;
    const newEntry = { name: username, score, anonId };
    const updated = [...prev, newEntry];

    localStorage.setItem(storageKey, JSON.stringify(updated));

    const sorted = [...updated].sort((a, b) => b.score - a.score);
    setRanking(sorted);

    const rank = sorted.findIndex(e => e.name === username) + 1;
    setMyRank(rank);
  }, [username, score, testId]);

  const handleReset = () => {
    if (window.confirm('정말 이 시험 결과를 초기화하시겠습니까?')) {
      localStorage.removeItem(`results-${testId}`);
      alert('시험 결과가 초기화되었습니다. 페이지를 새로고침하세요.');
    }
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>시험 완료!</h2>
      <p><strong>{username}</strong>님의 점수는</p>
      <h1>{score}점 / 100점</h1>
      {myRank && <p>전체 중 <strong>{myRank}등</strong>입니다.</p>}

      <br />
      <button onClick={() => setShowAll(!showAll)}>
        {showAll ? '닫기' : '전체 랭킹 보기'}
      </button>

      {showAll && (
        <div style={{ marginTop: '1rem' }}>
          <h3>전체 랭킹</h3>
          <ol style={{ textAlign: 'left', display: 'inline-block' }}>
            {ranking.map((r, i) => (
              <li key={i}>{r.anonId} - {r.score}점</li>
            ))}
          </ol>
        </div>
      )}

      <br /><br />
      <details>
        <summary style={{ cursor: 'pointer' }}>🔒 관리자용 실명 전체 보기</summary>
        <div style={{ marginTop: '1rem' }}>
          <h4>실명 리스트</h4>
          <ul style={{ textAlign: 'left', display: 'inline-block' }}>
            {ranking.map((r, i) => (
              <li key={i}>{r.name} ({r.anonId}) - {r.score}점</li>
            ))}
          </ul>
          <br />
          <button
            onClick={handleReset}
            style={{ backgroundColor: '#f44336', color: 'white', padding: '10px 20px', border: 'none' }}
          >
            시험 결과 초기화
          </button>
        </div>
      </details>
    </div>
  );
}

export default ResultPage;
