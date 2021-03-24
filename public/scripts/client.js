/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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
  ${tweet.content.text}
  </p>
  </div>
  <footer class="tweet-footer">
  <div><p>${tweet.created_at}</p></div>
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

//render all tweets on a page
const renderTweets = (tweets) => {
  for (let tweetObj of tweets) {
    $("#tweets-container").prepend(createTweetElement(tweetObj));
  }
};

//send tweets to a server
const sendTweetToServer = (tweet) => {
  $.ajax({
    url: "/tweets",
    method: "POST",
    data: tweet
  })
  .then(res => console.log('Tweet has been sent', res))
  .catch(err => console.log(err))
}

//fetch tweets with Ajax
const loadTweets = () => {
  
  $(".content p").text("LOADING")
  
  $.ajax({
    url: "/tweets",
    method: "GET"
  })
  .then(res => {
    $(".content p").empty()
    renderTweets(res)
  })
  .catch(err => console.log(err))
}

//handle form submission
const handleSubmit = event => {
  event.preventDefault();
  const data = $("form").serialize()
  sendTweetToServer(data)
}


$(document).ready(function () {
  
  loadTweets()
  $("form").on("submit", handleSubmit)

});