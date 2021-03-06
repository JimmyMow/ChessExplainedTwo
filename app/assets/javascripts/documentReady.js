$(document).ready(function() {
  // Notification
  notificationDomHandlers();

  userBindEvents();
  signUpValidation("new_user");

  // Show conversation
  if(App.config.isConversation) {
    goToBottom();
  }

  // New conversation
  if(App.config.isNewConversation) {
    userAutocompletion();
  }

  // GAME/NEW
  if (App.config.isNewGame) {
    regualarPgnUpload();
    pgnUploadFormValidation();
  }

  // Users show page
  if(App.config.isUserShow) {
    setUpUsersGamesBoard();
    unlimitedScroll();
  }


  // Views with a board
  if (App.config.isGame) {

  }

  // In review mode
  if (App.config.isReview) {
    window.history.pushState("", "", tokenString);
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
    updateGameTitle(gameTitle);


    $("[data-toggle=popover], .has-popover").popover();
    App.ReviewGame.BOARDS = {};
    App.ReviewGame.BOARDS["sandbox"] = sandboxBoard;
    App.ReviewGame.BOARDS["review"] = reviewBoard;
    App.ReviewGame.BOARDS["variation"] = variationBoard;
  }

  if(App.config.isManual) {
    manualBoardInitialization();
    manualDomHandlers();
  }

  if(App.config.isUsers) {

  }

  // Root page
  if(App.config.isHome) {
    scheduleMinHeight();
    landingPageStyles();
  }
});
