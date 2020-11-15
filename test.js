// Your web app's Firebase configuration
  let count = 0
  var firebaseConfig = {
    apiKey: "AIzaSyCDEsU6Odd3wU8t4RjsJND6JPNqb_2dmLw",
    authDomain: "testadsitecreator.firebaseapp.com",
    databaseURL: "https://testadsitecreator.firebaseio.com",
    projectId: "testadsitecreator",
    storageBucket: "testadsitecreator.appspot.com",
    messagingSenderId: "174643395081",
    appId: "1:174643395081:web:1c89be6c1a556309c8d6d8",
    measurementId: "G-VTCEXXW2H9"
  };

// Initialize Firebase  

firebase.initializeApp(firebaseConfig);
let database = firebase.database();

let ref = firebase.database().ref("studyverse");


ref.on("value", function (snapshot) {
   
  var stuff = snapshot.val()

  console.log (stuff.docs)
  
  ref = database.ref('studyverse');
  ref.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
      let message = childData.message
      let verse = childData.name
      let savedVerses = document.getElementById("savedVerses").innerHTML += verse+ message +"<br>"; 

    });

   firebase.database().ref('studyverse').remove
});

  

}, function (error) {
   console.log("Error: " + error.code);
});