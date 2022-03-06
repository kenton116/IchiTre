'use strict';
const mondaiButton = document.getElementById("mondai-button");
const createMondaiButton = document.getElementById("create-mondai");
const mondaiArea = document.getElementById("mondai-area");
const questionInput = document.getElementById("question");
const answerInput = document.getElementById("answer");
const titleInput = document.getElementById("title");
const subjectInput = document.getElementById("subject");
const newArea = document.getElementById("new-area");
const trainingButton = document.getElementById("training-button");
const questionPreview = document.getElementById('question-preview');
const answerPreview = document.getElementById('answer-preview');

mondaiButton.onclick = () => {
  newArea.className = 'new-area-open';
}

createMondaiButton.onclick = () => {
  const question = questionPreview.src;
  newArea.className = 'new-area-close';
  const answer = answerPreview.src;
  const title = titleInput.value;
  const subject = subjectInput.value

  if(question || answer || title || subject) {
    const array = {
      title: title,
      question: question,
      answer: answer,
      subject: subject,
      createdAt: time
    }
    const now = new Date();
    const year = now.getFullYear();
    const month  = now.getMonth();
    const date  = now.getDate();
    const time = year + '年' + month + '月' + date + '日';  
    const data = JSON.stringify(array);
    localStorage.setItem(localStorage.length + 1 , data);
  } else {
    alert('入力されていない箇所があるようです。')
  }
}

function previewQuestionFile(file) {
  const questionReader = new FileReader();
  questionReader.onload = (function(e) {
    questionPreview.src = e.target.result;
  });
  questionReader.readAsDataURL(file.files[0]);
}

function previewAnswerFile(file) {
  const answerReader = new FileReader();
  answerReader.onload = (function(e) {
    answerPreview.src = e.target.result;
  });
  answerReader.readAsDataURL(file.files[0]);
}

trainingButton.onclick = () => {
}

for (let i = 1; i <= localStorage.length; i++) {
  const data = localStorage.getItem(i);
  const array = JSON.parse(data);
  console.log(array);
  
}