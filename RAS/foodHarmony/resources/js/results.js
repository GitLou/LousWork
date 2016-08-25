/**
 * results.js
 * All JavaScript related to the results.html
 * 
 * TO DO:
 * Pagination:
 *  - 3 column = 9 per page
 *  - 2 column = 4 per page
 *  - 1 column = 1 per page
 *
 * Setting Filters:
 *  Use POST data from index.html to determine initial filters.
 *
 * API Calls:
 *  Create API calls where mentioned below to send/receive/update assets
 *
 * Filtering results from API
 *  Write code to filter results from API according to the defined filters
 */

/** Global Variables */
var resultsContainer = $("#results");
var resultLayout = 3;
var perPage = 9;
var filterType,filterCuisine,filterCost;
var apiResult = [];

/** Stock Images */
var stockImageLocation = "resources/images/stock/";
var stockImages = [
  ['all','_misc.png'],
  ['bar','barfood.png'],
  ['breakfast','breakfast.png'],
  ['chinese','chinese.png'],
  ['coffee','coffee.png'],
  ['dessert','dessert.png'],
  ['fast','fastfood.png'],
  ['french','french.png'],
  ['german','german.png'],
  ['hungarian','hungarian.png'],
  ['italian','italian.png'],
  ['mexican','mexican.png'],
  ['pizza','pizza.png'],
  ['steak','steak.png'],
  ['thai','thai.png']
];

/** START TEST API DATA */
apiResult = [{
  id: 0,
  types: ['casual', 'nightin'],
  cusines: ['bar', 'italian'],
  cost: 3,
  name: "Bocktown Beer & Grill",
  image: null,
  likes: 100,
  dislikes: 5
}, {
  id: 1,
  types: ['casual', 'nightin'],
  cusines: ['breakfast','coffee', 'dessert', 'american'],
  cost: 2,
  name: "Eat 'n Park (Robinson)",
  image: null,
  likes: 56,
  dislikes: 35
}, {
  id: 2,
  types: ['casual', 'nightin'],
  cusines: ['chinese'],
  cost: 2,
  name: "Wai Wai Buffet",
  image: null,
  likes: 150,
  dislikes: 2
}, {
  id: 3,
  types: ['casual', 'nightin'],
  cusines: ['coffee'],
  cost: 2,
  name: "Starbucks #12345",
  image: null,
  likes: 450,
  dislikes: 6
}, {
  id: 4,
  types: ['casual', 'nightin'],
  cusines: ['dessert'],
  cost: 3,
  name: "Cold Stone Creamery (Robinson)",
  image: null,
  likes: 54,
  dislikes: 1
}, {
  id: 5,
  types: ['casual', 'nightin'],
  cusines: ['fast'],
  cost: 3,
  name: "McDonalds #999999",
  image: null,
  likes: 7,
  dislikes: 102
}, {
  id: 6,
  types: ['casual', 'nightin'],
  cusines: ['bar', 'pizza', 'italian'],
  cost: 3,
  name: "Primanti Bros. (Strip District)",
  image: "https://www.primantibros.com/resources/images/pdf/PB_menu_cover_thumb_suburban.jpg",
  likes: 1007,
  dislikes: 102
}];
/** END OF TEST API DATA */

/**
 * Parse provided JSON, filtering out requsted results. Returning the filtered results to be displayed.
 * @param {json} data
 * @return {json} filter
 */
function filter(data) {
  //TO DO
  displayResults(data);
}

/**
 * Parse provided JSON, prnt results to screen.
 * @param {json} results
 */
function displayResults(results) {
  var newResult, restaurantLink, restaurantName, restaurantImage, restaurantActions, resIMG, result, i, j, imgType, resultLayoutCSS, heightBuffer;

  /** Validate results and sort by most liked */
  if (typeof results === 'string') {
    results = JSON.parse(results);
  }
  results.sort(function(a, b) {
    if ((a.likes - a.dislikes) > (b.likes - b.dislikes)) {
      return -1;
    }
    if ((a.likes - a.dislikes) < (b.likes - b.dislikes)) {
      return 1;
    }
    return 0;
  });
  
  /** Clear results so we can repopulate it further down */
  resultsContainer.html("");
  
  /** Handle empty an result **/
  if(results.length <= 0){
    var NaNResults = '<div class="row"><div class="col span-3-of-3 center">We don\'t seem to have what you are looking for right now.<br />Don\'t give up! The right match is out there somewhere.</div></div>';
    resultsContainer.append(NaNResults);
    $("#resultsContainer").fadeIn("slow");
    return;
  }
  
  /** Loop through each result & print it to the page */
  for (i = 0; i < results.length; i++) {
    
    /** Set result to the current record */
    result = results[i];
    
    /** Determine which image to show */
    if (result.image) {
      resIMG = result.image;
    } else {
      imgType = result.cusines[0];

      for(j = 0; j < stockImages.length; j++){
        if(imgType === stockImages[j][0]){
          resIMG = stockImageLocation + stockImages[j][1];
        }
      }
      if(!resIMG){
        resIMG = stockImageLocation + stockImages[0][1];
      }
    }
    
    /** Determine grid layout for resuilt */
    if(resultLayout > 1){
      resultLayoutCSS = "span-1-of-" + resultLayout;
    } else {
      resultLayoutCSS = "span-3-of-3";
    }
    
    /** Build the HTML for the result */
    restaurantActions = '<div class="restaurantActions">';
    restaurantActions += '<span class="pull-right"><button id="dislike' + result.id + '" class="btn btn-default" title="It wasn\'t for me."><i class="fa fa-ban"></i></button>&nbsp;<sub id="dislikes' + result.id + '">' + result.dislikes + '</sub></span>';
    restaurantActions += '<span class="pull-right"><button id="like' + result.id + '" class="btn btn-default" title="I loved it!"><i class="fa fa-heart"></i></button>&nbsp;<sub id="likes' + result.id + '">' + result.likes + '</sub></span>';
    restaurantActions += '</div>';
    restaurantImage = '<div class="restaurantImage" title="' + result.name + '\r\nClick for more information..."><img src="' + resIMG + '"></div>';
    restaurantName = '<div class="restaurantName">' + result.name + '</div>';
    restaurantLink = '<div id="info' + result.id + '" class="restaurantLink" title="' + result.name + '\r\nClick for more information...">' + restaurantName + restaurantImage + '</div>';
    newResult = '<div class="result col ' + resultLayoutCSS + '">' + restaurantLink + restaurantActions + '</div>';
    
    /** Print this result to the page */
    resultsContainer.append(newResult);

    /** Generate event handlers for like, dislike, and info actions */
    (function(id) {
      $("button#like" + id).click(function() {
        addLike(id);
      });
      $("button#dislike" + id).click(function() {
        addDislike(id);
      });
      $("#info" + id).click(function() {
        /**
        * Feature: Include all asset information in popInfo()
        * Pro(s): Less API Calls
        * Con(s): Possible performance hit, Out of date information
        */
        popInfo(id);
      });
    })(result.id);

    /**
     * After last record is processed:
     * - FadeIn results ( Makes the initial page load more visually appealing )
     * - Fix images so they are all the same height
     * - Add CSS to allow images to keep their aspect ratio
     */
    if (i === parseInt(results.length - 1)) {
      heightBuffer = 0.7;
      $("#resultsContainer").fadeIn("slow");
      var maxHeight = parseInt($("#results .result img").css("width")) + "px";
      if(parseInt($("#results .result img").css("width")) >= parseInt($( window ).height() * heightBuffer)){
        maxHeight = parseInt($( window ).height() * heightBuffer) + "px";
      }
      $("#results img").css({
        "width": "auto",
        "max-width": "100%",
        "max-height": maxHeight,
        "height": maxHeight
      });
    }
  }
}

/**
 * Increment like counter, decrement dislike counter if needed, and make an API call to update for everyone else
 * @param {number} resId
 */
function addLike(resId) {
  if ($("#like" + resId).hasClass("btn-selected")) {
    /** Do nothing, asset is already liked */
    return;
  } else {
    /**
     * Check if user has previously disliked the restaurant
     * If so remove a dislike from the count
     */
    if ($("#dislike" + resId).hasClass("btn-selected")) {
      var currentDislikeCount = parseInt($("#dislikes" + resId).html());
      currentDislikeCount -= 1;
      $("#dislikes" + resId).html(currentDislikeCount);
    }
    
    /**
     * Increase like counter
     * Update like counter for asset
     * Update CSS to show asset is liked
     */
    var currentLikeCount = parseInt($("#likes" + resId).html());
    currentLikeCount += 1;
    $("#likes" + resId).html(currentLikeCount);
    $("#like" + resId).removeClass("btn-default").addClass("btn-selected");
    $("#dislike" + resId).removeClass("btn-selected").addClass("btn-default");
    
    /**
     * API Call:
     * PUT increment like counter for asset & decrement dislike counter for asset if needed
     */
    //TO DO
  }
}

/**
 * Increment like counter, decrement dislike counter if needed, and make an API call to update for everyone else
 * @param {number} resId
 */
function addDislike(resId) {
  if ($("#dislike" + resId).hasClass("btn-selected")) {
    /** Do nothing, asset is already disliked */
    return;
  } else {
    /**
     * Check if user has previously liked the restaurant
     * If so remove a like from the count
     */
    if ($("#like" + resId).hasClass("btn-selected")) {
      var currentLikeCount = parseInt($("#likes" + resId).html());
      currentLikeCount -= 1;
      $("#likes" + resId).html(currentLikeCount);
    }
    
    /**
     * Increase dislike counter
     * Update dislike counter for asset
     * Update CSS to show asset is disliked
     */
    var currentDislikeCount = parseInt($("#dislikes" + resId).html());
    currentDislikeCount += 1;
    $("#dislikes" + resId).html(currentDislikeCount);
    $("#dislike" + resId).removeClass("btn-default").addClass("btn-selected");
    $("#like" + resId).removeClass("btn-selected").addClass("btn-default");
    
    /**
     * API Call:
     * PUT increment dislike counter for asset & decrement like counter for asset if needed
     */
    //TO DO
  }
}

/**
 * Set filter variables & reload results
 */
function setFilters(){
  resultLayout = $("#resultLayoutType").val();
  filterType = $("#restaurantTypeSearch").val();
  filterCuisine = $("#foodTypeSearch").val();
  filterCost = $("#costLevelSearch").val();
  
  /** Setting results per page */
  switch(resultLayout){
    case 1:
      perPage = 1;
      break;
    case 2:
      perPage = 2;
      break;
    default:
      perPage = 9;
  }
  
  filter(JSON.stringify(apiResult));
}

/**
 * Show other information about the asset
 * @param {number} resId
 */
function popInfo(resId) {
  /**
   * API Call:
   * GET information about asset
   *
   *  OR
   *
   * Pull from @params instead of another API Call
   */
   //TO DO
  
  /** Hide Overflow of html, visual improvement when modal is open */
  $("html").css("overflow", "hidden");
  
  /**
   * Feature: Make modal width responsive
   * Pro(s): Looks better on all screen/window sizes
   * Con(s): More work
   */
  var modalWidth = "1200px";
  
  /** Display Modal with other info about asset */
  $("#modal").dialog({
    autoOpen: true,
    width: modalWidth,
    modal: true,
    title: "More Information",
    buttons: {
      Close: function() {
        $(this).dialog("close");
        /** Setting overflow of html back to normal */
        $('html').css("overflow", "visible");
      }
    },
    open: function(event, ui) {
      $(this).parent().focus();
    }
  });
}

/**
 * Run the following after the page renders.
 */
$().ready(function() {
  /** Define elements that will use jQuery UI tooltips */
  $('#resultsContainer').tooltip();
  $('#modal > .row').tooltip();
  
  /**
   * Process POST Data & Set filters
   *\
   //TO DO
  
  /**
   * API Call
   * GET results from API
   * result apiResult
   */
  //TO DO
   
  /** Send API Result through the filters */
  filter(JSON.stringify(apiResult));
  
  /** Create event listener for the Apply Filters button */
  $("#applyFiltersButton").click(function(){setFilters();});
});
