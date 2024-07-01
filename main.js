let num = 0;
let chances = 3;
let inputNum = document.getElementById("input-number");
let goButton = document.getElementById("go-button");
let resetButton = document.getElementById("reset-button");
let resultArea = document.getElementById("resultArea");
let chanceArea = document.getElementById("chances");
let history = [];
let answer = document.getElementById("answer");
let historyArea = document.getElementById("history-area");

goButton.addEventListener("click", go);
resetButton.addEventListener("click", reset);
inputNum.addEventListener("focus", function () {
  inputNum.value = "";
});

function randomNum() {
  num = Math.floor(Math.random() * 100) + 1;
  console.log("정답", num);
}

function go() {
  if (resultArea.style.display == "none") {
    resultArea.style.display = "";
  }

  if (inputNum.value == "") {
    resultArea.textContent = "숫자가 입력되지 않았습니다.";
    return;
  }

  if (inputNum.value < 1 || inputNum.value > 100) {
    resultArea.textContent = "1~100 사이의 숫자를 입력해주세요.";
    return;
  }

  if (history.includes(inputNum.value)) {
    resultArea.textContent = "이전에 입력한 숫자입니다!";
    return;
  }

  chances--;
  chanceArea.textContent = `남은 기회 : ${chances}`;
  historyArea.textContent = `지금까지 입력한 숫자는 ... ${history}`;
  history.push(inputNum.value);
  
  if (inputNum.value == num) {
    chanceArea.style.display = "none";
    resultArea.innerHTML =
      "읿 정답 읿<br>" + `${3 - chances + 1}번 만에 정답을 맞췄습니다!`;
    goButton.disabled = true;
  } else if (inputNum.value > num) {
    resultArea.textContent = "입력한 숫자보다 작은 숫자 입니다.";
  } else {
    resultArea.textContent = "입력한 숫자보다 큰 숫자 입니다.";
  }

  if (chances == 0) {
    resultArea.textContent = "게임 오버!";
    goButton.disabled = true;
  }
}

function reset() {
  inputNum.value = "";
  resultArea.style.display = "none";
  chances = 3;
  chanceArea.textContent = `남은 기회 : ${chances}`;
  goButton.disabled = false;
  randomNum();
  history = [];
  historyArea.textContent = "";
  answer.textContent = `정답은 ${num}!!`;
}

randomNum();
answer.textContent = `정답은 ${num}!!`;
