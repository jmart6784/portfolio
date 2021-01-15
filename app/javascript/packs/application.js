import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"

Rails.start()
Turbolinks.start()
ActiveStorage.start()


document.addEventListener("turbolinks:load", () => {
  let words = document.querySelectorAll(".word");
  let wordArray = [];
  let currentWord = 0;
  
  words[currentWord].style.opacity = 1;

  words.forEach(word => {
    splitLetters(word);
  });
  
  const changeWord = () => {
    let cw = wordArray[currentWord];
    let nw = currentWord == words.length - 1 ? wordArray[0] : wordArray[currentWord + 1];
    
    for (let i = 0; i < cw.length; i++) {
      animateLetterOut(cw, i);
    }
    
    for (let i = 0; i < nw.length; i++) {
      nw[i].className = "letter behind";
      nw[0].parentElement.style.opacity = 1;
      animateLetterIn(nw, i);
    }
    
    currentWord = (currentWord == wordArray.length - 1) ? 0 : currentWord + 1;
  }
  
  const animateLetterOut = (cw, i) => {
    setTimeout(function() {
      cw[i].className = "letter out";
    }, i*80);
  }
  
  const animateLetterIn = (nw, i) => {
    setTimeout(() => {
      nw[i].className = "letter in";
    }, 340+(i*80));
  }
  
  function splitLetters(word) {
    let content = word.textContent;
    word.textContent = "";
    let letters = [];

    for (let i = 0; i < content.length; i++) {
      let letter = document.createElement("span");
      letter.className = "letter";

      if (content.charAt(i) === "_") {
        letter.style.opacity = "0";
      };

      letter.textContent = content.charAt(i);
      word.appendChild(letter);
      letters.push(letter);
    }
    
    wordArray.push(letters);
  }
  
  changeWord();
  setInterval(changeWord, 4000);
});