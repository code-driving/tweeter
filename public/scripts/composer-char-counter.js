$(document).ready(function () {
  $(".tweet-compose").on("keyup", function () {
    const charCount = $(this).val().length;

    if (charCount <= 140) {
      $(this)
        .closest(".new-tweet")
        .find(".counter")
        .removeClass("negative-values")
        .text(140 - charCount);
    } else {
      $(this)
        .closest(".new-tweet")
        .find(".counter")
        .addClass("negative-values")
        .text(140 - charCount);
    }
  });
});

$(document).ready(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop()) {
      $(".scroll").fadeIn();
      $("nav button, .arrow").hide();
    } else {
      $(".scroll").fadeOut();
      $("nav button, .arrow").show();
    }
  });
  $(".scroll").on("click", function () {
    $(this).css("border", "none");
    window.scrollTo(0, 0);
    if ($(".new-tweet").is(":hidden")) {
      $(".new-tweet").show();
    }
  });
});
