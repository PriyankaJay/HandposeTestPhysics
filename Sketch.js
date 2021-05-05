let handpose;
let video;
let predictions = [];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  handpose = ml5.handpose(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new hand poses are detected
  handpose.on("predict", results => {
    predictions = results;
  });

  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  console.log("Model ready!");
}

function draw() {
  image(video, 0, 0, width, height);

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
}
var jsonString ;

 function SendJsonToUnity() {
   window.unityInstance.SendMessage('Json_Import', 'TestJson',jsonString);
 }
let one ={handposeValues: { one :{ x:0, y:0,z:0}}};

var all;
//var two=[];
// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];

    for (let j = 0; j < prediction.landmarks.length; j += 1) {

///if(j==0)
//{
//  two.length = 0;
//}
      const keypoint = prediction.landmarks[j];
      fill(0, 255, 0);
      noStroke();
      ellipse(keypoint[0], keypoint[1], 10, 10);



 one.handposeValues["one"+j] =   {x:keypoint[0], y:keypoint[1],z:keypoint[2]};

//two.push(one);

    }


      jsonString = JSON.stringify(one.handposeValues);

      console.log(one.handposeValues);
  SendJsonToUnity();
  }

}
