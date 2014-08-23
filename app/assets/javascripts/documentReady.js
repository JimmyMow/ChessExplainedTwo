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
  }

  // Root page
  if(App.config.isHome) {

  }
});
