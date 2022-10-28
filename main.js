Webcam.set({
    width:350,
    height:300,
    image_format: 'png',
    png_quality: 90
});
 
camera = document.getElementById("camera");
 
Webcam.attach( '#camera' );
 
function take_snapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>'
    });
}

console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/v_sl95BzE/model.json',modelLoaded);

  function modelLoaded() {
    console.log('Model Loaded!');
  }

  function check()
  {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
  }
      
  function gotResult(error, results)
  {
      if(error){
          console.error(error);
      }
      else {
          console.log(results);
          document.getElementById("result_hand_jesture").innerHTML = results[0].label;
          prediction_1 = results[0].label;
          speak();
          if(results[0].label == "Thumbs Up = I hope you are having a great day!") {
              document.getElementById("update_hand_jesture").innerHTML = "&#128077;";
          }
          if(results[0].label == "Peace Sign = Stay calm, cool, and peaceful!") {
              document.getElementById("update_hand_jesture").innerHTML = "&#9996;";
          }
          if(results[0].label == "Perfect Sign = You are perefect, keep being who you are!") {
              document.getElementById("update_hand_jesture").innerHTML = "&#128076;";
          }
      }

      function speak()
{
    var synth = window.SpeechSynthesis;
    speak_data_1 = "The Hand Gesture is "+ prediction_1;
    var utterThis = new SpeechSynthesisUtterance(speek_data_1+speak_data_2);
    utterThis.rate = 0.5;
    synth.speak(utterThis);
}

  }
  