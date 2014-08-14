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
    sandboxBoardInitialization();
    openTokVideoStream();
  }

  // Root page
  if(App.config.isHome) {

  }
});
