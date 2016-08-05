/**
 * This is the Javascript code I wrote for the navagation bar animation.
 * When viewing on a mobile device, listens to the navigation icon to expand.
 * Adds and removes the 'active' class to the appropriate navigation buttons.
 */
document.querySelector("li.icon").addEventListener("click", function(event){
   var x = document.querySelector("nav > ul");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
});
var navLinks = document.querySelectorAll("nav > ul > li > a.link"); // Grabs all of the navigation buttons
for(var i=0; i < navLinks.length; i++){ // Loop through each navigation button
  navLinks[i].addEventListener("click", function(event){ // Creates an event listener for each button
    
    
    var reg = new RegExp('[^/]+$', 'i' ); // Regex for grabbing characters after the last / in a string
    var hash = reg.exec(event.target.href); // Strip the location of everything before the # using above RegEx
    document.querySelector("a.active").className = "link"; // Removes the 'active' class from all navigation buttons
    event.target.className += " active"; // Applies the 'active' class the the button that was clicked.
    var contentBlocks = document.querySelectorAll(".content"); // Grab all elements with the class content
    for(var i=0; i < contentBlocks.length; i++){ // Loop through the .content elements
      if(contentBlocks[i].style.opacity > 0) // Checking if element is currently visible, fixes a visual bug.
        fadeOut(contentBlocks[i]); // Fade  out the .content element
    }
    var targetElement = document.querySelector(hash[0]); // Select the .content element that holds our desired content
    setTimeout(function(){  // Wait .5 seconds
      fadeIn(targetElement); // Fade in our content
    }, 500);
    
    
  });
}
document.querySelector(".navbar-brand").addEventListener("click", function(event){ // Listen to the Brand for a cllck.
  document.querySelector("a.active").className = "link"; // Removes the 'active' class from all navigation buttons.
  document.querySelector(".link").className += " active"; // Finds the first navigation button and adds 'active' to it.
});

// fade out animation
function fadeOut(el){
  el.style.opacity = 1;

  (function fade() {
    if ((el.style.opacity -= .1) < 0) {
      el.style.display = "none";
    } else {
      requestAnimationFrame(fade);
    }
  })();
}

// fade in animation
function fadeIn(el){
  el.className = "container content";
  el.style.opacity = 0;
  el.style.display = "block";

  (function fade() {
    var val = parseFloat(el.style.opacity);
    if (!((val += .1) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
}

/**
 * The following code will read the query string and show the proper page on load
 * It will also fix the navigation to be accurate.
 */
function correctNavigation() {
  var action = new RegExp('[^/]+$', 'i' ); // Regex for grabbing characters after the last / in a string
  var host = new RegExp('(^.*)(?=\#)', 'i'); // Regex for grabbing character before the # in a string
  var string = action.exec(window.location.href); // Using above RegEx to strip out the navigation
  var hostname = host.exec(window.location.href); // Using the above RegEx to strip out the hostname
  
  if(string){ // If there is a query string to extract
    var goTo = string[0]; //set goTo to the first item in array
    var links = document.querySelectorAll(".link"); //create an array of the navigation buttons
    for (i = 0; i < links.length; i++) { // Loop through the buttons
      if(links[i].href.substr(hostname[0].length) === goTo){ // If the button is linking to the same page we are looking for
        links[i].className = "link active"; // Set the button to active
        setTimeout(function(){ // Wait .5 seconds
          fadeIn(document.querySelector(goTo)); // Fade in correct .content
        }, 500);
      }
    }
  } else { // No query string to work with loading home page
    document.querySelector(".link").className += " active"; // Setting first navigation button to acitve
    setTimeout(function(){ // Wait .5 seconds
      fadeIn(document.querySelector(".content")); // Fade in first .content
    }, 500);
  }
}

window.onload = correctNavigation; // Run  correctNavigation() on page load.

/**
 * IE10 viewport hack for Surface/desktop Windows 8 bug
 * Copyright 2014-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

(function () {
  'use strict';

  if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
    var msViewportStyle = document.createElement('style')
    msViewportStyle.appendChild(
      document.createTextNode(
        '@-ms-viewport{width:auto!important}'
      )
    )
    document.querySelector('head').appendChild(msViewportStyle)
  }

})();