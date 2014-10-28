var setUpUsersGamesBoard = function() {
  $(".user-show-board").each(function(index) {
    var board = new ChessBoard("board_" + $(this).data("id"), $(this).data("fen"));
  });
};
