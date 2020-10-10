var response = "";
const quoteBtn = document.querySelector(".buttonGetQuote");
const content = document.querySelector(".content");
const contentHeader = document.querySelector(".quoteHeader");
const URL =
  "http://api.openweathermap.org/data/2.5/weather?q=denver&appid=bc8e090086131a3e407a885a22852ced";
//const URL = "http://proverbs1816.com/KJVBible.html";

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
      response = JSON.parse(xhr.responseText);
      console.log(response);
    }
  };
}
