// Your web app's Firebase configuration

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


document.body.style.zoom = "100%";
var bibleBook = 0;
var bibleChapter = 0;
var quoteHeader = "";
var quote = "";
var response = "";
const quoteBtn = document.querySelector(".buttonGetQuote");
const nextVerseBtn = document.querySelector(".nextVerse");
const backVerseBtn = document.querySelector(".backVerse");
const nextChapterBtn = document.querySelector(".nextChapter");
const prevChapterBtn = document.querySelector(".prevChapter");
const copyVerseBtn = document.querySelector(".copyVerse");
const content = document.querySelector(".content");
const content1 = document.querySelector(".content1");
const contentHeader = document.querySelector(".quoteHeader");
const URL =
  "http://adsitecreator-com.stackstaging.com/BibleQuoter/KJVBible.json";
//const URL = "http://proverbs1816.com/KJVBible.html";

// Navigation Buttons
copyVerseBtn.addEventListener("click", () => {
  copyVerseToFirebase()
})


prevChapterBtn.addEventListener("click", () => {
  bibleChapter = bibleChapter - 1;
  displayChapterVerse();
});

nextChapterBtn.addEventListener("click", () => {
  bibleChapter = bibleChapter + 1;
  displayChapterVerse();
});

nextVerseBtn.addEventListener("click", () => {
  bibleVerse = bibleVerse + 1;
  displayChapterVerse();
});

backVerseBtn.addEventListener("click", () => {
  bibleVerse = bibleVerse - 1;
  displayChapterVerse();
});

quoteBtn.addEventListener("click", () => {
  getData(URL);
});

function getData(url) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState != 4) return;
    if (xhr.status === 200) {
      response = JSON.parse(xhr.responseText);

      // Turn on Bible Nav Buttons
      document.getElementById("Buttons").style.display = "inline";
      window.scrollBy(-75, 200);

      // Get a random Book
      numberofBooksBible = Object.keys(response.books).length;

      pickRandomBook();
      // Get a random chapter based on book
      amountOfChapters = Object.keys(response.books[bibleBook].chapters).length;
      bibleChapter = Math.floor(Math.random() * amountOfChapters);

      //Get a random verse based on the chapter
      amountOfVerses = Object.keys(
        response.books[bibleBook].chapters[bibleChapter].verses
      ).length;
      bibleVerse = Math.floor(Math.random() * amountOfVerses);

      displayChapterVerse();
    } else console.log("no");
  };
}
function pickRandomBook() {
  // bibleBook = Math.floor(Math.random() * 66);
  bibleBook = document.getElementById("myList").value;
  if (bibleBook > 38) {
    document.getElementById("myImage").src = "./Jesus.jpg";
  } else {
    document.getElementById("myImage").src = "./Moses.jpg";
  }
}
function displayChapterVerse() {
  quoteHeader =
    response.books[bibleBook].chapters[bibleChapter].verses[bibleVerse].name;
  quote =
    response.books[bibleBook].chapters[bibleChapter].verses[bibleVerse].text;

  // content.textContent = quote;
  contentHeader.textContent = quoteHeader;
  // Get a differnt translation
  var forNewVersion = "https://bible-api.com/" + quoteHeader;
  getDiffVersion(forNewVersion);
}
// function getlengthsofItems() {
//   numberofBooksBible = (Object.keys(response.books)).length

// }

function getDiffVersion(url1) {
  const xhr1 = new XMLHttpRequest();
  xhr1.open("GET", url1);
  xhr1.send();
  xhr1.onreadystatechange = function () {
    if (xhr1.readyState != 4) return;
    if (xhr1.status === 200) {
      response1 = JSON.parse(xhr1.responseText);
      console.log(response1.text);
      content1.textContent = response1.text;
    }
  };
}

function copyVerseToFirebase() {
  
  database.ref("studyverse").push({
    name: quoteHeader,
    message: quote
    
  })
}
var ref = firebase.database().ref("studyverse");

ref.on("value", function (snapshot) {
  
  
  var stuff = snapshot.val()
  console.log(stuff)
  ref = database.ref('studyverse');
  ref.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
      console.log(childData.name)
    });
});

  

}, function (error) {
   console.log("Error: " + error.code);
});
