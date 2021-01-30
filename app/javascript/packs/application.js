import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"

Rails.start()
Turbolinks.start()
ActiveStorage.start()

// Flip text
document.addEventListener("turbolinks:load", () => {
  let words = document.querySelectorAll(".word");

  if (document.body.contains(document.querySelector(".word"))) {
    
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
    const hideFlip = () => {
      let flipText = document.getElementById("flip-parent-div");

      if (document.body.contains(flipText)) {

        flipText.style.opacity = "1";

        if (window.scrollY > (flipText.offsetTop + flipText.offsetHeight)) {
          if (flipText.style.opacity === "1") {
            flipText.style.opacity = "0";
          } else {
            flipText.style.opacity = "1";
          }
        };

      }
    };

    hideFlip();

    window.addEventListener("scroll", hideFlip);
  };
});

// Change nav bar styling depending where user is located
document.addEventListener("turbolinks:load", () => {
  let navbarDiv = document.getElementById("nav-dark-blur");
  navbarDiv.style.backgroundColor = "rgba(0, 0, 0, 0.0)";
  navbarDiv.style.transition = "1.25s";

  if(window.scrollY === 0) {
    navbarDiv.style.backgroundColor = "rgba(0, 0, 0, 0.0)";
  } else {
    navbarDiv.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
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

// About me html code animation
document.addEventListener("turbolinks:load", () => {
  let amCode = document.getElementById("am-code");
  let blinker = document.getElementById("text-blinker");

  if (document.body.contains(amCode)) {
    blinker.style.opacity = "1";

    // text editor blinker animation
    setInterval(() => {
      if (blinker.style.opacity === "1") {
        blinker.style.opacity = "0";
      } else {
        blinker.style.opacity = "1";
      };
    }, 500);

    let ary = "<h1>Hello World!</h1>".split("");

    let counter = 0;
    let finished = false;

    const typer = () => {
      
      if (amCode.textContent.length > 21) {
        amCode.textContent = "";
        counter = 0;
      } else {
        if (amCode.textContent != "<h1>Hello World!</h1>" && !finished) {
          finished = false;
          amCode.textContent += ary[counter];
          counter += 1;
        } else {

          setTimeout(() => {
            finished = true;

            if (amCode.textContent === "") {
              setTimeout(() => {
                finished = false;
              }, 2500);
              
            };
            
            counter = 0;
      
            if (amCode.textContent.length != 0) {
              amCode.textContent = amCode.textContent.substring(0, amCode.textContent.length - 1);
            };
          }, 2500);

        };
      };
    };

    setInterval(typer, 250);
  };
});

// content reveal on scroll
document.addEventListener("turbolinks:load", () => {
  let allContent = document.querySelectorAll(".content");

  allContent.forEach(content => {
    content.style.opacity = "0";
    content.style.transition = "2s";

    if (window.scrollY >= content.getBoundingClientRect().top) {
      requestAnimationFrame(() =>
        setTimeout(() => {
          content.style.opacity = "1";
        })
      );
    } else {
      requestAnimationFrame(() =>
        setTimeout(() => {
          content.style.opacity = "0";
        })
      );
    }
  });

  allContent.forEach(content => {
    content.style.opacity = "0";
    content.style.transition = "2s";

    document.addEventListener('scroll', () => {
      if (window.scrollY >= content.getBoundingClientRect().top) {
        requestAnimationFrame(() =>
          setTimeout(() => {
            content.style.opacity = "1";
          })
        );
      } else {
        requestAnimationFrame(() =>
          setTimeout(() => {
            content.style.opacity = "0";
          })
        );
      }
    });
  });

});

// Mobile 100vh style fix
document.addEventListener("turbolinks:load", () => {
  const appHeight = () => {
    const doc = document.querySelector("body");
    const staticDiv = document.getElementById("static-index-container");

    if (document.body.contains(staticDiv)) {
      staticDiv.style.marginTop = `${window.innerHeight}px`;
    };

    doc.style.height = `${window.innerHeight}px`;
  };

  window.addEventListener('resize', appHeight);
  appHeight();
});

// nav links to scroll to a page location
document.addEventListener("turbolinks:load", () => {
  const scrollTo = (selector, yOffset = 0) => {
    const element = document.querySelector(selector);
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
  
    window.scrollTo({top: y, behavior: 'smooth'});
  };

  let optionsDiv = document.querySelector(".mobile-inner-div");
  optionsDiv.style.transform = "translate(-100%, -100%)";
  optionsDiv.style.transition = "1s";
  optionsDiv.style.borderRadius = "100%";

  // Hide menu options when link is clicked
  const hide = () => {
    requestAnimationFrame(() =>
      setTimeout(() => {
        optionsDiv.style.transform = "translate(-100%, -100%)";
        optionsDiv.style.borderRadius = "100%";
      })
    );
  };

  let home = document.querySelectorAll(".home-link");

  if (home.length != 0) {

    home.forEach(link => {
      link.addEventListener("click", () => {
        window.scrollTo({top: 0, behavior: "smooth"});
        hide();
      });
    });
  
    let about = document.querySelectorAll(".about-link");

    about.forEach(link => {
      link.addEventListener("click", () => {
        scrollTo("#about-me-div", -200);
        hide();
      });
    });
  
    let skills = document.querySelectorAll(".skills-link");

    skills.forEach(link => {
      link.addEventListener("click", () => {
        scrollTo("#skills-container", -200);
        hide();
      });
    });
  
    let projects = document.querySelectorAll(".projects-link");

    projects.forEach(link => {
      link.addEventListener("click", () => {
        scrollTo("#projects-container", -200);
        hide();
      });
    });
  
    let contact = document.querySelectorAll(".contact-link");

    contact.forEach(link => {
      link.addEventListener("click", () => {
        scrollTo("#contact-container", 0);
        hide();
      });
    });
  };
});

// Mobile nav bar animations
document.addEventListener("turbolinks:load", () => {
  let hamburger = document.getElementById("mobile-ham");
  let optionsDiv = document.querySelector(".mobile-inner-div");
  optionsDiv.style.transform = "translate(-100%, -100%)";
  optionsDiv.style.transition = "1s";
  optionsDiv.style.borderRadius = "100%";

  hamburger.addEventListener("click", () => {
    if (optionsDiv.style.transform === "translate(-100%, -100%)") {
      requestAnimationFrame(() =>
        setTimeout(() => {
          optionsDiv.style.transform = "translate(0%, 0%)";
          optionsDiv.style.borderRadius = "0%";
        })
      );
    } else {
      requestAnimationFrame(() =>
        setTimeout(() => {
          optionsDiv.style.transform = "translate(-100%, -100%)";
          optionsDiv.style.borderRadius = "100%";
        })
      );
    };
  });
});