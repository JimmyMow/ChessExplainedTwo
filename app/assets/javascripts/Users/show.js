var setUpUsersGamesBoard = function() {
  $(".user-show-board").each(function(index) {
    var board = new ChessBoard("board_" + $(this).data("id"), $(this).data("fen"));
  });
};

var unlimitedScroll = function() {
  if ($('.pagination').length) {
    $(window).scroll(function() {
      var url = $('.pagination .next_page').attr('href');
      if (url && $(window).scrollTop() > $(document).height() - $(window).height() - 50) {
        $('.pagination').html("<i class=\"fa fa-circle-o-notch fa-3x fa-spin\"></i>");
        return $.getScript(url);
      }
    });
  }

  return $(window).scroll();
};
