'use strict';
const mondaiButton = document.getElementById('mondai-button');
const createMondaiButton = document.getElementById('create-mondai');
const mondaiAreaTop = document.getElementById('mondai-area-top');
const questionInput = document.getElementById('question');
const answerInput = document.getElementById('answer');
const titleInput = document.getElementById('title');
const subjectInput = document.getElementById('subject');
const newArea = document.getElementById('new-area');
const trainingButton = document.getElementById('training-button');
const questionPreview = document.getElementById('question-preview');
const answerPreview = document.getElementById('answer-preview');
const questionShow = document.getElementById('show-question');
const answerShow = document.getElementById('show-answer');
const titleShow = document.getElementById('show-title');
const subjectShow = document.getElementById('show-subject');
const createdAtShow = document.getElementById('show-createdAt');
const mondaiResetButton = document.getElementById('mondai-reset');
const trainingArea = document.getElementById('training-area');
const trainingMondai = document.getElementById('training-mondai');
const answerShowButton = document.getElementById('show-answer-button');

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

function training() {
  const random = Math.floor( Math.random() * (localStorage.length - 1 + 1)) + 1;
  const mondai = localStorage.getItem(random);
  const array = JSON.parse(mondai);
  console.log(array);
  titleShow.innerText = array.title;
  questionShow.src = array.question;
  answerShow.src = '';
  subjectShow.innerText = array.subject;
  createdAtShow.innerText = array.createdAt;
  answerShowButton.className = 'area-open button';
  answerShowButton.onclick = () => {
    answerShow.src = array.answer;
    answerShowButton.className = 'area-close';
    setTimeout(function() {
      training()
    }, 15000)
  }
}


mondaiButton.onclick = () => {
  newArea.className = 'area-open';
  mondaiButton.className = 'area-close';
}

mondaiResetButton.onclick = () => {
  const result = confirm('本当に全ての問題を削除しますか？')
  if(result) {
    localStorage.clear();
    alert('全ての問題を削除しました。');
    location.reload();
  } else {
    alert('キャンセルしました。')
  }
}

createMondaiButton.onclick = () => {
  const question = questionPreview.src;
  newArea.className = 'area-close';
  const answer = answerPreview.src;
  const title = titleInput.value;
  const subject = subjectInput.value;
  const now = new Date();
  const year = now.getFullYear();
  const month  = now.getMonth();
  const date  = now.getDate();
  const time = year + '年' + month + '月' + date + '日';

  if(question || answer || title || subject) {
    const array = {
      title: title,
      question: question,
      answer: answer,
      subject: subject,
      createdAt: time
    }
    const mondai = JSON.stringify(array);
    localStorage.setItem(localStorage.length + 1 , mondai);
    alert('問題を追加しました。');
    location.reload();
  } else {
    alert('入力されていない箇所があるようです。')
  }
}

trainingButton.onclick = () => {
  trainingArea.className = 'area-open';
  trainingButton.className = 'area-close';
  training();
}

window.onload = function() {
  for (let i = 1; i <= localStorage.length; i++) {
    const mondai = localStorage.getItem(i);
    const array = JSON.parse(mondai);
    console.log(array);
    mondaiAreaTop.insertAdjacentHTML('beforeend', '<tr class="mondai-div"><td class="mondai-title">' + array.title + '</td><td><img src="' + array.question + '" class="thumbnail"></td><td><img src="' + array.answer + '" class="thumbnail"></td><td><p class="mondai-subject">' + array.subject + '</p></td><td><p class="mondai-createdat">' + array.createdAt + '</p></td><td><button onclick="localStorage.removeItem(' + i + ');location.reload();" class="button">問題を削除</button></td></tr>');
  }
}