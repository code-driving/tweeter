/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//escape function
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//create a tweet element
const createTweetElement = (tweet) => {
  let $tweet = $(`
  <article class="tweet-article">
  <header class="tweet-header">
  <div>
  <img src=${tweet.user.avatars} alt="User face" />
  <p>${tweet.user.name}</p>
  </div>
  <div><p>${tweet.user.handle}</p></div>
  </header>
  
  <div class="content">
  <p>
  ${escape(tweet.content.text)}
  </p>
  </div>
  <footer class="tweet-footer">
  <div><p>${new Date(tweet.created_at).toLocaleString()}</p></div>
  <div class="tweet-icons">
  <button><i class="fas fa-flag"></i></button>
  <button><i class="fas fa-retweet"></i></button>
  <button><i class="fas fa-heart"></i></button>
  </div>
  </footer>
  </article>
  `);
  return $tweet;
};

//slide in and out of the error section
const validateError = (error) => {
  if (error === "empty") {
    $(".error").hide();
    $(".error").empty();
    $(".error").append("<p>Your tweet is empty</p>");
    $(".error").slideDown("slow");
  } else if (error === "extra") {
    $(".error").hide();
    $(".error").empty();
    $(".error").append("<p>Your tweet is too long</p>");
    $(".error").slideDown("slow");
  } else {
    $(".error").hide();
    $(".error").empty();
  }
};

//render all tweets on a page
const renderTweets = (tweets) => {
  $("#tweets-container").empty();
  for (let tweetObj of tweets) {
    $("#tweets-container").prepend(createTweetElement(tweetObj));
  }
};

//send tweets to a server
const sendTweetToServer = (tweet) => {
  $.ajax({
    url: "/tweets",
    method: "POST",
    data: tweet,
  })
    .then((res) => {
      loadTweets();
      console.log("Tweet has been sent", res);
    })
    .catch((err) => console.log(err));
};

//fetch tweets with Ajax
const loadTweets = () => {
  $.ajax({
    url: "/tweets",
    method: "GET",
  })
    .then((res) => {
      renderTweets(res);
    })
    .catch((err) => console.log(err));
};

//get decoded tweet text from the form 
const getDecodedTweet = (encodedStr) => {
  let text = "";
  for (let index in encodedStr) {
    if (index > 4) {
      text += encodedStr[index];
    }
  }
  return decodeURIComponent(text);
};

//handle form submission
const handleSubmit = (event) => {
  event.preventDefault();
  const data = $("form").serialize();
  const dataLength = getDecodedTweet(data).length;
  //validate the form
  if (dataLength === 0) {
    validateError("empty");
  } else if (dataLength > 140) {
    validateError("extra");
  } else {
    validateError();
    sendTweetToServer(data);
    $(".tweet-compose").val("").keyup().focus();
  }
};

$(document).ready(function () {
  loadTweets();
  $("form").on("submit", handleSubmit);
  $(".tweet-compose").keypress(function (e) {
    if (e.which === 13) {
      handleSubmit(e);
      return false;
    }
  });

  //manage css functionality
  $(".new-tweet").hide();

  $("nav button").on("click", function () {
    $(".new-tweet").slideToggle("slow");
    $(".tweet-compose").focus();
  });

  $(".tweet-compose").on("keyup", function () {
    $(".error").css("display", "none");
  });

  $("nav button").hover(function () {
    $(this).fadeOut(200);
    $(this).fadeIn(600);
    $(".arrow").slideToggle("slow");
  });
});
