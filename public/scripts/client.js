/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from initial-tweets.json
const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text:
        "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];

$(document).ready(function () {
  renderTweets(data);
});

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

const renderTweets = (tweets) => {
  for (let tweetObj of tweets) {
    $("#tweets-container").prepend(createTweetElement(tweetObj));
  }
};
