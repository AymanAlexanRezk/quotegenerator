const quoteConatiner = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

function showLoadingSpinner() {
  loader.hidden = false;
  quoteConatiner.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteConatiner.hidden = false;
    loader.hidden = true;
  }
}

//? Asynchronous Fetch: Get Quote From an API:
async function getQuote() {
  showLoadingSpinner();
  //* CORS Policy Solution using proxy:
  //* We need to use a Proxy URL to make our API call in order to avoid
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    //* Check if Author field is blank and replace it with 'Unkown'
    if (data.quoteText === "") {
      authorText.innerText = "Unknown";
    } else {
      authorText.innerText = data.quoteAuthor;
    }
    //* Dynamically reduce font size for long quotes:
    if (data.quoteText.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    //authorText.innerText = data.quoteAuthor;
    quoteText.innerText = data.quoteText;
    removeLoadingSpinner();
  } catch (error) {
    getQuote();
  }
}

// ? Tweet Quote:
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - By ${author}`;
  window.open(twitterUrl, "_blank");
}

// ? Event Listeners:
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

// ? On Load:
getQuote();
