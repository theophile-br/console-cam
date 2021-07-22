function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const symboles = ["/", "\\", "|", "o", "O"];
const charSize = 13;
const height = 480;
const width = 640;
const heightASCI = document.getElementById("canvasOutput").height;
const widthASCI = document.getElementById("canvasOutput").width;
document.getElementById("terminal").style.width = `${widthASCI}px`;
document.getElementById("termScreen").style.height = `${heightASCI}px`;
const spacingX = 6;
const spacingY = 12;
let video = document.getElementById("videoInput");
navigator.mediaDevices
  .getUserMedia({ video: true, audio: false })
  .then(function (stream) {
    video.srcObject = stream;
    video.play();
    return new Promise((resolve) => (video.onplaying = resolve))
      .then(async () => {
        document.getElementById("waiting").style.display = "none";
        document.getElementById("cmd").style.display = "inline-block";
        await new Promise((resolve) => setTimeout(() => resolve(), 1000));
        document.getElementById("cmd").style.display = "none";
        let canvasFrame = document.getElementById("canvasInput");
        let context = canvasFrame.getContext("2d");
        let canvasOut = document.getElementById("canvasOutput");
        let ctxout = canvasOut.getContext("2d");
        ctxout.font = `bold ${charSize} monospace`;
        let src = new cv.Mat(height, width, cv.CV_8UC4);
        let dst = new cv.Mat();
        const FPS = 30;
        function processVideo() {
          ctxout.fillStyle = `#151515`;
          ctxout.clearRect(0, 0, canvasOut.width, canvasOut.height);
          ctxout.rect(0, 0, canvasOut.width, canvasOut.height);
          ctxout.fill();
          let begin = Date.now();
          context.drawImage(video, 0, 0, width, height);
          src.data.set(context.getImageData(0, 0, width, height).data);
          cv.resize(
            src,
            dst,
            new cv.Size(widthASCI, heightASCI),
            0,
            0,
            cv.INTER_AREA
          );
          const xRand = getRandomInt(widthASCI);
          const yRand = getRandomInt(heightASCI);
          for (let y = 0; y < heightASCI; y += spacingY) {
            for (let x = 0; x < widthASCI; x += spacingX) {
              r = dst.ucharPtr(y, x)[0];
              g = dst.ucharPtr(y, x)[1];
              b = dst.ucharPtr(y, x)[2];
              ctxout.fillStyle = `white`;
              // > Artifacts
              ctxout.fillRect(xRand, yRand, spacingX, spacingY);
              /* 
                > Pixel Art
                ctxout.fillStyle = `rgb(${r},${g},${b})`;
                ctxout.fillRect(x, y, spacingX, spacingY);
                */
              ctxout.fillStyle = `rgb(${r},${g},${b})`;
              const i = ((symboles.length - 1) * r) / 255;
              ctxout.fillText(symboles[Math.round(i)], x, y);
            }
          }
          // > Schedule at FPS.
          let delay = 1000 / FPS - (Date.now() - begin);
          setTimeout(processVideo, delay);
        }
        // > Schedule first one.
        setTimeout(processVideo, 0);
      })
      .catch((err) => {
        console.log("An error occurred! " + err);
      });
  })
  .catch(function (err) {
    console.log("An error occurred! " + err);
  });
