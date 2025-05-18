import React from 'react';
import * as XLSX from 'xlsx';

function ExcelUpload({ onQuestionsReady }) {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet);

      const questions = rows.map(row => ({
        word: row.word,
        choices: [
          row.choice1, row.choice2, row.choice3, row.choice4,
          row.choice5, row.choice6, row.choice7, row.choice8
        ],
        answer: row.answer
      }));

      onQuestionsReady(questions);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>시험 문제 엑셀 파일 업로드</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
    </div>
  );
}

export default ExcelUpload;
