import React, { useState } from 'react';

function NameInput({ onStart }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() !== "") {
      onStart(name);
    }
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>단어 시험 시작하기</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="이름을 입력하세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: '10px', fontSize: '16px', width: '60%' }}
        />
        <br /><br />
        <button type="submit" style={{ padding: '10px 20px', fontSize: '16px' }}>
          시험 시작
        </button>
      </form>
    </div>
  );
}

export default NameInput;
