const quoteContainer = document.querySelector('#quote-container')
const quoteText = document.querySelector('#quote')
const authorText = document.querySelector('#author')
const book = document.querySelector('#book')
const twitterButton = document.querySelector('#twitter')
const newQuoteButton = document.querySelector('#new-quote')
const loader = document.querySelector('#loader')

function showLoadingSpinner() {
  loader.hidden = false
  quoteContainer.hidden = true
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false
    loader.hidden = true
  }
}

async function getQuote() {
  showLoadingSpinner()
  const proxyURL = 'https://obscure-fortress-56951.herokuapp.com/'
  const apiURL = 'https://v2-api.sheety.co/a284b79d17f1e87195fea23fb131faf5/sciFiQuotes/quotes'
  try {
    const response = await fetch(proxyURL + apiURL)
    const data = await response.json()
    const randomNumber = Math.floor(Math.random() * data.quotes.length)

    // If author is blank, add 'Unknown'
    if (data.quotes[randomNumber].author === '') {
      authorText.innerText = 'Unknown'
    } else {
      authorText.innerText = data.quotes[randomNumber].author
    }

    quoteText.innerText = data.quotes[randomNumber].quote
    book.innerText = data.quotes[randomNumber].book

    removeLoadingSpinner()
  } catch (error) {
    for (let i = 0; i < error.length; i++) {
      if (i > 5) {
        console.log('shit is haxed!')
      } else {
        getQuote()
      }
    }
    console.log(`Whoops, no quote! You fucked up ${error}`)
  }
}

function tweetQuote() {
  const quote = quoteText.innerText
  const author = authorText.innerText
  const twitterURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`

  window.open(twitterURL, '_blank')
}

// Event listener
newQuoteButton.addEventListener('click', getQuote)
twitterButton.addEventListener('click', tweetQuote)

// On load
getQuote()
