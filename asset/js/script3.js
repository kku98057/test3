const startBtn = document.querySelector(".start_btn");
const qna = document.querySelector(".qna");
const result = document.querySelector(".result");
const start = document.querySelector(".start");
let endPoint = qnaList.length;
let select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// 버튼클릭
startBtn.addEventListener("click", startBtnHandler);

function startBtnHandler() {
  start.style.transition = "opacity 0.3s";
  start.style.opacity = 0;
  setTimeout(() => {
    start.style.display = "none";
  }, 500);
  qna.style.transition = "opacity 0.3s";
  qna.style.display = "flex";
  setTimeout(() => {
    qna.style.opacity = 1;
  }, 500);

  //   addAnswer
  let qIndex = 0;
  next(qIndex);
}
function addAnswer(text, qIndex, idx) {
  const qnaUl = document.querySelector(".qna_ul");
  const qLi = document.createElement("li");
  qLi.className = "qna_li";
  qLi.innerHTML = text;
  qnaUl.append(qLi);

  qLi.addEventListener("click", () => {
    const qLis = document.querySelectorAll(".qna_li");
    qLis.forEach((list) => {
      list.remove();
    });
    next(++qIndex);
  });

  let target = qnaList[qIndex].a[idx].type;

  for (let i = 0; i < target.length; i++) {
    select[target[i]] += 1;
  }
}

function calResult() {
  let result = select.indexOf(Math.max(...select));
  return result;
}
function goResult() {
  let point = calResult();
  const resultText = document.querySelector(".result_1_p");
  const resultTitle = document.querySelector("#result");
  const resultImg = document.createElement("img");
  const resultImgDiv = document.querySelector(".result_img");
  const resultSrc = `./asset/img/image-${point}.png`;

  qna.style.opacity = 0;
  setTimeout(() => {
    qna.style.display = "none";
  }, 500);
  result.style.display = "flex";
  result.style.transition = "opacity 0.3s";
  setTimeout(() => {
    result.style.opacity = 1;
  }, 500);

  resultImg.id = "resultImg";
  resultImg.src = resultSrc;
  resultImg.alt = point;
  resultImgDiv.append(resultImg);
  resultTitle.innerHTML = infoList[point].name;
  resultText.innerHTML = infoList[point].desc;
}

function next(qIndex) {
  if (qIndex === endPoint) {
    goResult();
    return;
  } else {
    const qnaTitle = document.querySelector("#question");
    qnaTitle.innerHTML = qnaList[qIndex].q;
    for (let i = 0; i < qnaList[qIndex].a.length; i++) {
      addAnswer(qnaList[qIndex].a[i].answer, qIndex, i);
    }
  }
}

//스타트버튼 -> 다음화면전환 -> 질문추가 -> 결과
