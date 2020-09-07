var bibleBook = 0;
var bibleChapter = 0;
const quoteBtn = document.querySelector(".buttonGetQuote");
const content = document.querySelector(".content");
const contentHeader = document.querySelector(".quoteHeader");
const URL = "http://adsitecreator-com.stackstaging.com/BibleQuoter/Bilble.json";

quoteBtn.addEventListener("click", () => {
  getData(URL);
});

function getData(url) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState != 4) return;
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      // Get a random Book
      numberofBooksBible = Object.keys(response.books).length;
      pickRandomBook();
      // Get a random chapter based on book
      var amountOfChapters = Object.keys(response.books[bibleBook].chapters)
        .length;
      var bibleChapter = Math.floor(Math.random() * amountOfChapters);

      //Get a random verse based on the chapter
      var amountOfVerses = Object.keys(
        response.books[bibleBook].chapters[bibleChapter].verses
      ).length;
      var bibleVerse = Math.floor(Math.random() * amountOfVerses);

      var quoteHeader =
        response.books[bibleBook].chapters[bibleChapter].verses[bibleVerse]
          .name;
      var quote =
        response.books[bibleBook].chapters[bibleChapter].verses[bibleVerse]
          .text;

      console.log(amountOfChapters);
      content.textContent = quote;
      contentHeader.textContent = quoteHeader;
    } else console.log("no");
  };
}
function pickRandomBook() {
  bibleBook = Math.floor(Math.random() * 66);
}
function pickRandomChapter() {
  bibleChapter = Math.floor(Math.random() * amountOfChapters);
}
// function getlengthsofItems() {
//   numberofBooksBible = (Object.keys(response.books)).length

// }
