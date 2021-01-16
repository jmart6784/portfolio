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
  
  // Change word and animate it with css class name
  const changeWord = () => {
    let cw = wordArray[currentWord];
    let nw = currentWord == words.length - 1 ? wordArray[0] : wordArray[currentWord + 1];

    // animate current word
    for (let i = 0; i < cw.length; i++) {
      animateLetterOut(cw, i);
    }
    
    // animate next word
    for (let i = 0; i < nw.length; i++) {
      nw[i].className = "letter behind";
      nw[0].parentElement.style.opacity = 1;
      animateLetterIn(nw, i);
    }
    
    currentWord = (currentWord == wordArray.length - 1) ? 0 : currentWord + 1;
  }
  
  // Add class name to animate word
  const animateLetterOut = (cw, i) => {
    setTimeout(function() {
      cw[i].className = "letter out";
    }, i*80);
  }
  
  // Add class name to animate word
  const animateLetterIn = (nw, i) => {
    setTimeout(() => {
      nw[i].className = "letter in";
    }, 340+(i*80));
  }
  
  // split words into spans which contain letters
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

  // Hide flipping text when it gets scrolled past
  window.addEventListener("scroll", () => {
    let flipText = document.getElementById("flip-parent-div");
    flipText.style.opacity = "1";

    if (window.scrollY > (flipText.offsetTop + flipText.offsetHeight)) {
      if (flipText.style.opacity === "1") {
        flipText.style.opacity = "0";
      } else {
        flipText.style.opacity = "1";
      }
    };
  });
});

// Change nav bar styling depending where user is located
document.addEventListener("turbolinks:load", () => {
  let navbarDiv = document.getElementById("inner-div");
  navbarDiv.style.backgroundColor = "rgba(0, 0, 0, 0.0)";
  navbarDiv.style.transition = "1.25s";

  if(window.scrollY === 0) {
    navbarDiv.style.backgroundColor = "rgba(0, 0, 0, 0.0)";
  };

  window.addEventListener("scroll", () => {
    if(window.scrollY === 0) {

      requestAnimationFrame(() =>
        setTimeout(() => {
          navbarDiv.style.backgroundColor = "rgba(0, 0, 0, 0.0)";
        })
      );
      
    } else {

      requestAnimationFrame(() =>
        setTimeout(() => {
          navbarDiv.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        })
      );

    }
  });
});


