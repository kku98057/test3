// start버튼 클릭 -> 첫번째 질문 및 질의문항 -> 문항 클릭 시 다음번째 질문 및 질의문항 -> 질의문항 응답에 대한 결과값 호출

// start 버튼

const startBtn = document.querySelector(".start_btn");
const start = document.querySelector(".start");
const qna = document.querySelector(".qna");
const result = document.querySelector(".result");
const qustions = document.querySelector("#question");
const qnaUl = document.querySelector(".qna_ul");
const endPoint = qnaList.length;
const select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
startBtn.addEventListener("click", startBtnHandler);

function startBtnHandler() {
  start.style.display = "none";
  qna.style.display = "flex";
  let qIdx = 0;
  nextQuestion(qIdx);
}

// 첫 질문

function addQuestion(text, qIdx, idx) {
  const list = document.createElement("li");
  list.className = "qna_li";
  list.innerHTML = text;
  qnaUl.append(list);

  list.addEventListener("click", () => {
    const answerList = document.querySelectorAll(".qna_li");

    let target = qnaList[qIdx].a[idx].type;
    for (let i = 0; i < target.length; i++) {
      select[target[i]] += 1;
    }

    nextQuestion(++qIdx);
    answerList.forEach((list, index) => {
      list.remove();
    });
  });
}
function calResult() {
  let result = select.indexOf(Math.max(...select));
  return result;
}
function goResult() {
  let point = calResult();

  const resultImg = document.createElement("img");
  const resultImgDiv = document.querySelector(".result_img");
  const descTitle = document.querySelector("#result");
  const desc = document.querySelector(".result_1_p");
  let imgSrc = `./asset/img/image-${point}.png`;
  resultImg.id = "resultImg";
  resultImg.src = imgSrc;
  resultImg.alt = point;
  resultImgDiv.append(resultImg);
  qna.style.display = "block";
  result.style.display = "flex";
  desc.innerHTML = infoList[point].desc;
  descTitle.innerHTML = infoList[point].name;
}
function nextQuestion(qIdx) {
  if (qIdx === endPoint) {
    goResult();
    return;
  }
  qustions.innerHTML = qnaList[qIdx].q;
  for (let i = 0; i < qnaList[qIdx].a.length; i++) {
    addQuestion(qnaList[qIdx].a[i].answer, qIdx, i);
  }
}
