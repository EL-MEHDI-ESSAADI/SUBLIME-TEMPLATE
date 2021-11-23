// set global variabls
let preloader = document.querySelector(".preloader");
let landingMainCont = document.querySelector(".landing .main_content");
let sectionsForAni = document.querySelectorAll(".anm-int");
let openMenuBtn = document.querySelector(".open-button");
let closeMenuBtn = document.querySelector(".close-button");
let menu = document.querySelector(".nav_content");
let openIframeBtn = document.querySelector(".icon-container");
let closeIframeBtn = document.querySelector(".clossVideo-btn");
let iframeVideo = document.querySelector(".video");
let myIframe = document.querySelector("iframe");
// testomonials slide variabls 
let testiSlidesCon = document.querySelector(".testimonials .slidesContainer");
let testiSlides = document.querySelectorAll(".testimonials .slidesContainer .slide");
let testiCounter = 1;
let testiQueue = [];
let testiIsFree = true;


// ################## the opening of the page ##################

// scroll to top
window.scrollTo(0, 0);
// set sectioins animation
window.addEventListener("scroll", sectionsAnim);
// add event listner to window for load
window.addEventListener("load", windLoadFun);

// ################## Menu controle ##################

// set open menu event listenr
openMenuBtn.onclick = () => {
  menu.classList.toggle("openAndclose");
  document.body.style.overflow = "hidden";
};
// set open menu event listenr
closeMenuBtn.onclick = () => {
  menu.classList.toggle("openAndclose");
  document.body.style.overflow = "initial";
};

// ################## iframe  Controle ##################

// add evenet listener to open video btn
openIframeBtn.onclick = () => {
  iframeVideo.style.display = "flex";
};
// add evenet listener to close video btn
closeIframeBtn.addEventListener("click", closeIframe);


// ################## Testimonials control ##################
// reset slides
testiSlides.forEach((slide, index) => {
  if (index === 0) {
    let clonedNode = slide.cloneNode(true);
    clonedNode.classList.add("firstClone");
    testiSlidesCon.append(clonedNode);
  }
  if (index === testiSlides.length - 1) {
    let clonedNode = slide.cloneNode(true);
    clonedNode.classList.add("lastClone");
    testiSlidesCon.prepend(clonedNode);
    testiSlides = document.querySelectorAll(".testimonials .slidesContainer .slide");
  }
});

// move to first slide
testiSlidesCon.style.transform = `translateX( ${-100 * testiCounter}%)`;

// add event listeners to slides Containers
testiSlidesCon.addEventListener("transitionend", (_) => {
  if (testiSlides[testiCounter].classList.contains("lastClone")) {
    testiSlidesCon.style.transition = "none";
    testiCounter = testiSlides.length - 2;
    testiSlidesCon.style.transform = `translateX( ${-100 * testiCounter}%)`;
  }
  if (testiSlides[testiCounter].classList.contains("firstClone")) {
    testiSlidesCon.style.transition = "none";
    testiCounter = 1;
    testiSlidesCon.style.transform = `translateX( ${-100 * testiCounter}%)`;
  }
  setTimeout(_ => {
    if(testiQueue.length) {
        testiSlidesCon.style.transition = "transform .7s";
      if (testiQueue[0] == "next") {
        testiCounter++
      } else {
        testiCounter--
      }
      testiSlidesCon.style.transform = `translateX( ${-100 * testiCounter}%)`;
      testiQueue.shift();
    }else {
      testiIsFree = true
    }
  },0)
});

// add event listeners to bullets Containers
document
  .querySelector(".testimonials .shufel")
  .addEventListener("click", function (e) {
    let target = e.target;
    let activeEl = document.querySelector(".testimonials .shufel span.active");
    if (target.nodeName === "SPAN") {
      let activeINdex = activeEl.dataset.index;
      let targetINdex = target.dataset.index;
      let Times = Math.abs(activeINdex - targetINdex);
      if (activeINdex > targetINdex) {
        for (let i = 0; i < Times; i++) {
          if(testiIsFree) {
            testiSlidesCon.style.transition = "transform .7s";
            testiCounter--;
            testiSlidesCon.style.transform = `translateX( ${-100 * testiCounter}%)`;
            testiIsFree = false;
            continue;
          }
          testiQueue.push("prev");
        }
        activeEl.classList.remove("active");
        target.classList.add("active");
      } else if (activeINdex < targetINdex) {
        for (let i = 0; i < Times; i++) {
          if(testiIsFree) {
            testiSlidesCon.style.transition = "transform .7s";
            testiCounter++;
            testiSlidesCon.style.transform = `translateX( ${-100 * testiCounter}%)`;
            testiIsFree = false;
            continue;
          }
          testiQueue.push("next");
        }
        activeEl.classList.remove("active");
        target.classList.add("active");
      }
    }
  });



// ################## Functions ##################

function closeIframe() {
  iframeVideo.classList.add("close_anm");
  myIframe.src = "";
  setTimeout((_) => {
    myIframe.src =
      "https://player.vimeo.com/video/117310401?autoplay=1&color=01aef0&title=0&byline=0&portrait=0";
    iframeVideo.style.display = "none";
    iframeVideo.classList.remove("close_anm");
  }, 500);
}

function windLoadFun() {
  // hide the shufels
  preloader.classList.add("spnaTransbg");
  // set for preloader bg transparnt
  preloader.style.backgroundColor = "transparent";
  // set the home magic
  landingMainCont.classList.add("homeMagic");
  // hide the preloader
  setTimeout(() => {
    preloader.style.display = "none";
  }, 1000);
  setTimeout(() => {
    landingMainCont.classList.remove("homeMagic");
  }, 2000);
}
function sectionsAnim() {
  sectionsForAni.forEach((el) => {
    let distance = 100;
    let current = el;
    // get the distance  between page top and the element elemen
    while (current) {
      distance += current.offsetTop;
      current = current.offsetParent;
    }
    if (window.scrollY + window.innerHeight > distance) {
      el.classList.add("anm_Magic");
    }
    if (
      sectionsForAni[sectionsForAni.length - 1].classList.contains("anm_Magic")
    ) {
      window.removeEventListener("scroll", sectionsAnim);
    }
  });
}
