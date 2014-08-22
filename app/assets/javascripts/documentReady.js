$(document).ready(function() {

  // GAME/NEW
  if (App.config.isNewGame) {
    regualarPgnUpload();
  }


  // Views with a board
  if (App.config.isGame) {

  }

  // In review mode
  if (App.config.isReview) {
    App.ReviewGame = {};
    App.ReviewGame.moveCounter = 0;
    reviewBoardInitialization();
    sandboxBoardInitialization();
    variationBoardInitialization();
    openTokVideoStream();
    loadGamesMoves();
    initializeBinds();
    initializeDomHandlers();
    reviewStyles();

    App.ReviewGame.BOARDS = {};
    App.ReviewGame.BOARDS["sandbox"] = sandboxBoard;
    App.ReviewGame.BOARDS["review"] = reviewBoard;
    App.ReviewGame.BOARDS["variation"] = variationBoard;

    $("#new_variation").on("submit", function() {
      $("#variation_variation_moves").val(JSON.stringify(variationBoard.moves));

      var curr_move = App.ReviewGame.moves[App.ReviewGame.moveCounter - 1]
      $("#variation_current_move").val(JSON.stringify(curr_move["id"]));
    });
  }

  // Root page
  if(App.config.isHome) {

  }
});
