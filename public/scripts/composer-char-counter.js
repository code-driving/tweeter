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
