"use strict";

removeLoadingScreen();
window.addEventListener("load",()=>{
  checkStorage();
  runAnimations();
});

function runAnimations() {


  // EFFECTS ANIMATION
  // all elements that have fadeIn class will get the effect by getting animateFadeIn when they enter viewport
  let elementsToFade = document.querySelectorAll(".fadeIn");
  // all elements that have slideMeRight class will get the effect by getting animateSlideRight when they enter viewport
  let elementsToSlideRight = document.querySelectorAll(".slideMeRight");
  // all elements that have slideMeLeft class will get the effect by getting animateSlideLeft when they enter viewport
  let elementsToSlideLeft = document.querySelectorAll(".slideMeLeft");
  // all elements that have slideMeBottom class will get the effect by getting animateSlideBottom when they enter viewport
  let elementsToSlideBottom = document.querySelectorAll(".slideMeBottom");

  function callbackFunc(entries, observer) {
    entries.forEach((entry) => {
      // var txt = entry.target.classList[0] + " visibility: " + entry.isIntersecting;
      // console.log(entry);
      if (entry.isIntersecting) {
        if (entry.target.classList.contains("fadeIn")) {
          entry.target.classList.add("animateFadeIn");
          return;
        };
        if (entry.target.classList.contains("slideMeRight")) {
          entry.target.classList.add("animateSlideRight");
          return
        };
        if (entry.target.classList.contains("slideMeLeft")) {
          entry.target.classList.add("animateSlideLeft");
          return

        };
        if (entry.target.classList.contains("slideMeBottom")) {
          entry.target.classList.add("animateSlideBottom");

        };
      };
    });
  };

  let options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.0, // even one pixel of the element has to enter viewport to trigger callbackFunction
  };

  let observer = new IntersectionObserver(callbackFunc, options);

  // observing fade elements
  elementsToFade.forEach(function (element) {
    observer.observe(element);
  });
  // observing slide elements
  elementsToSlideRight.forEach(function (element) {
    observer.observe(element);
  });
  elementsToSlideLeft.forEach(function (element) {
    observer.observe(element);
  });
  elementsToSlideBottom.forEach(function (element) {
    observer.observe(element);
  });


};
// end of EFFECTS ANIMATION


// selected elements
const scrollLinks = document.querySelectorAll(".my-nav-link");
const navbar = document.querySelector(".navbar");
const linksContainer = document.getElementById("navbarLinks");
const colapsedNavHeight = 90; 


//nav shadow on page scroll
window.addEventListener("scroll", function () {
  const scrollHeight = window.pageYOffset;
  const containerHeight = linksContainer.getBoundingClientRect().height;
  // if the navbar is open do not do anything and if it is closed then decide accordingly
  if (!(containerHeight > colapsedNavHeight)) { // if it is not open
    if (scrollHeight > colapsedNavHeight) { // if we scrolled past navheight
      navbar.classList.add("shadow");
    } else { // if we are at the starting position
      navbar.classList.remove("shadow");
    };
  };
  // setup back to top button
  const topLink = document.querySelector(".top-link");
  if (scrollHeight > 500) {
    topLink.classList.add("show-link");
  } else {
    topLink.classList.remove("show-link");
  }
});


// ********** scroll correction ************


// select links


scrollLinks.forEach((link) => {
  link.addEventListener("click", scrollToElement)
});

function scrollToElement(event, elementID = 0) {
  let id;
  // prevent default
  if (event != undefined) {
    event.preventDefault();
  };

  // navigate to specific spot
  // if no id is passed in to function get id from event
  if (elementID === 0) {
    id = event.currentTarget.getAttribute("href").slice(1);
  } else { id = elementID };


  let element = document.getElementById(id);

  //if the element is located inside this page's DOM scroll to it
  if (element != null) {

    const navHeight = navbar.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    let position = element.offsetTop - navHeight;


    if (navHeight > colapsedNavHeight) {
      position = position + containerHeight;
    }

    window.scrollTo({
      left: 0,
      top: position,
    });

    // close dropdown menu if it was open
    linksContainer.classList.remove("show");
  }
  // if the element is not on this page(it is on index page) then store it and redirect to index.html
  else {
    storeIdAndRedirect(id);
  };
};

function storeIdAndRedirect(id) {
  // store id
  localStorage.setItem("scrollElementID", id);

  const language = document.documentElement.attributes[0].textContent;
  if (language === "eng") window.location.assign("./index-en.html");
  else window.location.assign("./index.html");
  console.log(language);
};
// on page load check if there is some element ID in the storage

function checkStorage() {
  let elementID = localStorage.getItem("scrollElementID");
  // if there is an ID in the storage
  if (elementID != null) {
    // scroll to it
    scrollToElement(undefined, elementID);
    //clear storage
    localStorage.removeItem("scrollElementID");
  };
};





//tooltips 
(function tooltips() {
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  });
})();

//Loading screen
function removeLoadingScreen() {
  
  
  const loadingContainer = document.getElementById("loading-container");
  // 1. Check if user has already seen the intro screen or not
  const stateData = sessionStorage.getItem('state');
  const loaderImage = document.getElementById("loader-image");
  
  // 2. If user has seen it already remove the loadingContainer immediately
  if (stateData === "seen") {
    
    loadingContainer.classList.add("d-none");
  }else{
  // If this is user's first time, animate logo (default is longFadeIn, to show logo anyway on slow connections before JS has been loaded and had time to decide),
  // and after 1.5 sec animate loading screen removal. If the connection is fast (script is loaded within 5 sec) 
  // longFadeIn will be replaced by animateFadeIn and animation will start without default delay
    loaderImage.classList.remove("longFadeIn");
    loaderImage.classList.add("animateFadeIn");
    setTimeout(() => {
      loadingContainer.classList.add("hideLoadingScreen");
    }, 1500);
    
  };

    enableScroll()
    // 3. mark the intro animation as seen by the user
     sessionStorage.setItem('state', 'seen');
     

};

function enableScroll() { 
document.body.classList.remove("stop-scrolling"); 
}; 



//footer date
const date = document.querySelector(".date");
date.innerHTML = new Date().getFullYear() + ".";












