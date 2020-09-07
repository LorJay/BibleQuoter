var bibleBook = 0;
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
      // console.log(response.contents.verse);
      numberofBooksBible = (Object.keys(response.books)).length
      pickRandomBook()
      var quoteHeader = (response.books[bibleBook].chapters[2].verses[1].name); 
      var quote = (response.books[bibleBook].chapters[2].verses[1].text);
      
      console.log(numberofBooksBible)
      content.textContent = quote;
      contentHeader.textContent = quoteHeader;
    } else console.log("no");
  }
}
function pickRandomBook() {
  bibleBook = Math.floor(Math.random() * 66); 

}

function getlengthsofItems() {
  numberofBooksBible = (Object.keys(response.books)).length

}