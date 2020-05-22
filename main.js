// Hiding the header

var prevScrollpos = window.pageYOffset;

window.onscroll = function() {
var currentScrollPos = window.pageYOffset;
var d = document.documentElement;
var offset = d.scrollTop + window.innerHeight;
var height = d.offsetHeight;

  if (prevScrollpos > currentScrollPos) {
    document.getElementById("header").style.top = "0";
  } 
  else {
    document.getElementById("header").style.top = "-75px";
  }

  if (window.pageYOffset <= 0) {
    return;
  }

  if (offset >= height) {
    document.getElementById("header").style.top = "-75px";
  }

  prevScrollpos = currentScrollPos;
}

// Progress bar

const article = document.querySelector ("article");
const progressBar = document.querySelector (".progress");

window.addEventListener ("scroll", () => {

  if(article === null){
    return;
  }

    let scrollValue = window.scrollY;
    let articleHeight = article.scrollHeight - window.innerHeight;

    let progressPercentage = (scrollValue / articleHeight) * 100;

    progressBar.style.width = progressPercentage + "%";

})

// Move headline into header

myID = document.getElementById("headline");

var myScrollFunc = function() {

  if(myID === null){
    return;
  }

  var y = window.scrollY;
  if (y >= 150) {
    myID.className = "header_headline show"
  } 
  else {
    myID.className = "header_headline hide"
  }
};

window.addEventListener("scroll", myScrollFunc);

window.setTimeout(function() {
  if(document.getElementById("headline") === null){
    return;
  }
  document.getElementById("headline").style.visibility = 'visible';
}, 1100); 

// Calculate read time

const paragraphs = document.querySelectorAll("article p")
const readTimeDiv = document.querySelector(".read-time")

const calculateReadTime =() => {

  if(readTimeDiv === null){
    return;
  }

    let NumberOfWords = 0;
    const averageWPM = 265;

    paragraphs.forEach(paragraph => {
        NumberOfWords += paragraph.innerHTML.split(" ").length;
    });

    let readTime = NumberOfWords / averageWPM;

    readTimeDiv.innerHTML = Math.round(readTime) + " min read";

}

calculateReadTime();

// Copy link to clipboard

  function copyText() {
    var copyText = document.getElementById("myInput");
    copyText.select();
    document.execCommand("copy");
    var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2500);
  }

// Lazy loading

document.addEventListener("DOMContentLoaded", function() {
  var lazyloadImages;    

  if ("IntersectionObserver" in window) {
    lazyloadImages = document.querySelectorAll(".article_image");
    var imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var image = entry.target;
          image.src = image.dataset.src;
          image.classList.remove("article_image");
          imageObserver.unobserve(image);
        }
      });
    });

    lazyloadImages.forEach(function(image) {
      imageObserver.observe(image);
    });
  } else {  
    var lazyloadThrottleTimeout;
    lazyloadImages = document.querySelectorAll(".article_image");
    
    function lazyload () {
      if(lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout);
      }    

      lazyloadThrottleTimeout = setTimeout(function() {
        var scrollTop = window.pageYOffset;
        lazyloadImages.forEach(function(img) {
            if(img.offsetTop < (window.innerHeight + scrollTop)) {
              img.src = img.dataset.src;
              img.classList.remove('article_image');
            }
        });
        if(lazyloadImages.length == 0) { 
          document.removeEventListener("scroll", lazyload);
          window.removeEventListener("resize", lazyload);
          window.removeEventListener("orientationChange", lazyload);
        }
      }, 20);
    }

    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
  }
})


