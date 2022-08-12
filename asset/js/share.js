function setshare() {
  let shereResultImg = document.querySelector(".result_img");
  let shereResultAlt = shereResultImg.firstElementChild.alt;

  const shareTitle = "십이간지 연애유형 결과";
  const shareDes = infoList[shereResultAlt].name;
  const shareImage = `/asset/img/image-${shereResultAlt}.png`;
  const shareURL = `https://kku98057.github.io/test3/page/result-${shereResultAlt}.html`;

  console.log(shareURL);

  Kakao.Share.sendDefault({
    objectType: "feed",
    content: {
      title: shareTitle,
      description: shareDes,
      imageUrl: shareImage,
      link: {
        mobileWebUrl: shareURL,
        webUrl: shareURL,
      },
    },
    buttons: [
      {
        title: "결과확인하기",
        link: {
          mobileWebUrl: shareURL,
          webUrl: shareURL,
        },
      },
    ],
  });
}
