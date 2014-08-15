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
    // variationBoardInitialization();
    // openTokVideoStream();
    loadGamesMoves();
    initializeBinds();
    initializeDomHandlers();
    $("#triggerVariation").on('click', function() {
      App.dispatcher.trigger("board.trigger_variation", {channel_name: App.config.channelName})
      variationBoard();
    });

    App.ReviewGame.BOARDS = {};
    App.ReviewGame.BOARDS["sandbox"] = sandboxBoard;
    App.ReviewGame.BOARDS["review"] = reviewBoard;
  }

  // Root page
  if(App.config.isHome) {

  }
});
