document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("video");
  const canvas = document.getElementById("canvas");
  const captureButton = document.getElementById("captureButton");
  const uploadForm = document.getElementById("uploadForm");
  const imageDataInput = document.getElementById("imageData");
  const constraints = {
    video: true,
  };

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (err) {
      console.error("getUserMedia 오류: ", err);
    });

  captureButton.addEventListener("click", function () {
    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/jpeg");
    imageDataInput.value = imageData;

    // 촬영 버튼 비활성화
    captureButton.disabled = true;

    // 웹캠 비디오 숨기기
    video.style.display = "none";

    // 이미지를 중앙에 그리기
    const image = new Image();
    image.src = imageData;
    image.onload = function () {
      const x = (canvas.width - image.width) / 2;
      const y = (canvas.height - image.height) / 2;
      context.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 지우기
      context.drawImage(image, x, y, image.width, image.height);

      // Correct! 문구 보이기
      const correctText = document.createElement("p");
      correctText.textContent = "Correct!";
      correctText.style.textAlign = "center";
      correctText.style.fontSize = "24px";
      document.body.appendChild(correctText);

      // Instagram 페이지로 이동
      setTimeout(function () {
        window.location.href = "https://www.instagram.com/";
      }, 2000); // 2초 후에 이동
    };
  });
});
