// start 버튼

const startBtn = document.querySelector(".start_btn");
// section
const start = document.querySelector(".start");
const qna = document.querySelector(".qna");
const result = document.querySelector(".result");
const endPoint = qnaList.length;
const resultImg = document.getElementById("resultImg");
const select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let turn = true;

startBtn.addEventListener("click", startHandler);
// question
const question = document.getElementById("question");
const qUl = document.querySelector(".qna_ul");

function startHandler() {
  if (turn === true) {
    const tl = gsap.timeline();
    tl.to(start, {
      opacity: 0,
      duration: 0.3,
    })
      .to(start, {
        display: "none",
        duration: 0.1,
      })
      .to(qna, {
        display: "flex",
        duration: 0.1,
      })
      .from(qna, {
        opacity: 0,
        duration: 0.3,
      });
    let qidx = 0;
    goNext(qidx);
    turn = false;
  }
}

// add answer
function addAnswer(text, qidx, idx) {
  const list = document.createElement("li");
  list.className = "qna_li";
  list.innerHTML = text;
  qUl.append(list);
  list.addEventListener("click", (e) => {
    const answerList = document.querySelectorAll(".qna_li");
    let target = qnaList[qidx].a[idx].type;
    console.log(target);
    for (let i = 0; i < target.length; i++) {
      select[target[i]] += 1;
    }

    goNext(++qidx);
    answerList.forEach((answer, index) => {
      answer.remove();
      answer.innerHTML = qnaList[qidx].a[index].answer;
    });
  });
}

function calResult() {
  let result = select.indexOf(Math.max(...select));
  return result;
}
function setResult() {
  let point = calResult();
  const resultName = document.getElementById("result");
  resultName.innerHTML = infoList[point].name;

  let resultImg = document.createElement("img");
  const imgDiv = document.querySelector(".result_img");
  let imgURL = `./asset/img/image-${point}.png`;
  resultImg.src = imgURL;
  resultImg.id = "resultImg";
  resultImg.alt = point;
  imgDiv.appendChild(resultImg);

  const resultDesc = document.querySelector(".result_1");
  resultDesc.innerHTML = infoList[point].desc;
}
function getResult() {
  const tl = gsap.timeline();
  tl.to(qna, {
    opacity: 0,
    duration: 0.3,
  })
    .to(qna, {
      display: "none",
      duration: 0.1,
    })
    .to(result, {
      display: "flex",
      duration: 0.1,
    })
    .to(result, {
      opacity: 1,
      duration: 0.3,
    });
  setResult();
  calResult();
}
// question
function goNext(qidx) {
  if (qidx === endPoint) {
    getResult(qidx);
  } else {
    question.innerHTML = qnaList[qidx].q;
    for (let i = 0; i < qnaList[qidx].a.length; i++) {
      addAnswer(qnaList[qidx].a[i].answer, qidx, qnaList[qidx].a[i].type);
    }
  }
}
