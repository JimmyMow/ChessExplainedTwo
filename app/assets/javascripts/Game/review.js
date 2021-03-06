// Board initialization
var sandboxBoardInitialization = function() {
  var cfg = {draggable: true, position: 'start', onChange: sandboxOnChange, onDrop: sandboxOnDrop, sparePieces: true, dropOffBoard: 'trash'};

  window.sandboxBoard = new ChessBoard('sandboxBoard', cfg);


  $('#sandboxStartBtn').on('click', function(e){
    App.dispatcher.trigger('board.start', {board: "sandbox", channel_name: App.config.channelName, coach_mode: $("#coach_mode_status").attr("data-coach"),
    game_id: App.config.gameId}, success, failure);
    e.preventDefault();
  });

  $('#sandboxClearBtn').on('click', function(e){
    App.dispatcher.trigger('board.clear', {board: "sandbox", channel_name: App.config.channelName, coach_mode: $("#coach_mode_status").attr("data-coach"),
    game_id: App.config.gameId}, success, failure);
    e.preventDefault();
  });

};

var reviewBoardInitialization = function() {
  var cfg = {position: 'start'};

  window.reviewBoard = new ChessBoard('reviewBoard', cfg);
  // window.reviewBoard.game = new Chess();
};

var variationBoardInitialization = function() {
  var cfg = {
    draggable: true,
    position: "start",
    onDragStart: onDragStart,
    onDrop: onDrop,
    onMouseoutSquare: onMouseoutSquare,
    onMouseoverSquare: onMouseoverSquare,
    onSnapEnd: onSnapEnd
  };

  window.variationBoard = new ChessBoard('variationBoard', cfg);
  window.variationBoard.game = new Chess();
  window.variationBoard.moves = []
};

// Initialize Binds
var initializeBinds = function() {
  var channel = App.dispatcher.subscribe(App.config.channelName)

  channel.bind("start_position", function(data){
    App.ReviewGame.BOARDS[data["board"]].start();
    $("#triggerVariation").attr("disabled", "disabled");
    $('.review-notation').removeClass("current-move");
  });

    channel.bind("clear_position", function(data){
    App.ReviewGame.BOARDS[data["board"]].clear();
  });

  channel.bind("position_board", function(data) {
    App.ReviewGame.BOARDS[data["board"]].position(data["position"]);

    if(App.ReviewGame.moveCounter > 0) {
      $("#triggerVariation").attr("disabled", false);
    }
  });

  channel.bind("trigger_variation", function(data) {
    $('#myModal').modal({show:true, keyboard:true, backdrop:true});

    window.variationBoard.position(reviewBoard.fen(), true);
    window.variationBoard.game = new Chess();

    var moves = App.ReviewGame.moves.slice(0, [App.ReviewGame.moveCounter]);
    moves.forEach(function(item, index) {
      window.variationBoard.game.move(item["notation"]);
    });

    // var curr_move = App.ReviewGame.moves[App.ReviewGame.moveCounter - 1]

    var next_move = App.ReviewGame.moves[App.ReviewGame.moveCounter]
    var next_move_index = App.ReviewGame.moves.indexOf(next_move);

    if(next_move_index%2 != 0) {
      var next_move_sentece = Math.ceil((next_move_index + 1)/2) + "..." + next_move["notation"];
    } else {
      var next_move_sentece = Math.ceil((next_move_index + 1)/2) + "." + next_move["notation"];
    }

    $("#myModalLabel").text("Instead of " + next_move_sentece);

  });

  channel.bind("close_variation", function(data) {
    $('#myModal').modal('hide');
  });

  channel.bind("update_variation_game", function(data) {
    window.variationBoard.game.move(data["pgn"]);
  });

  channel.bind("add_variation_move", function(data) {
    if(data["directions"] == "add") {
      window.variationBoard.moves.push(data["move"]);
      if(parseInt(data["moveNum"]) > window.variationBoard.game.history().length) {
        window.variationBoard.game.move(data["move"]["notation"]);
      }
    } else if(data["directions"] == "pop") {
      window.variationBoard.moves.pop();
      window.variationBoard.game.undo();
    }
  });

  channel.bind("show_variations", function(data) {

  });

  channel.bind("adjust_move_counter", function(data) {
    if (data["board"] == "review") {
      App.ReviewGame.moveCounter = parseInt(data["counter"]);
    }
  });

  channel.bind("highlight_pgn", function(data) {
    $('.review-notation').removeClass("current-move");
    $('.' + data["pgn"] + '-highlight').addClass("current-move");
  });

  channel.bind("update_coach_mode_status", function(data) {
    $("#coach_mode_status").attr("data-coach", data["coachModeStatus"]);

    if(data["coachModeStatus"] == "true") {
      var coachModeStatus = "on";
    } else {
      var coachModeStatus = "off";
    }

    if(App.config.userId != data["ownerId"]) {
      $(".coach-mode-container").empty();
      $(".coach-mode-container").append("<span class='pull-right'>Coach mode is " + coachModeStatus);
    }
  });
};

// Initialize DOM Handlers
var initializeDomHandlers = function() {
  $("#reviewMoveForward").on("click", function(e) {
    if(App.ReviewGame.moves.length > App.ReviewGame.moveCounter) {
      if ($("#coach_mode_status").attr("data-coach") == "false" || $("#coach_mode_status").attr("data-coach") == "true" && window.isOwner == "true") {
        App.ReviewGame.moveCounter++;
      }
      adjustMoveCounter(App.ReviewGame.moveCounter, "review");

      positionBoardTrigger(App.ReviewGame.moves[App.ReviewGame.moveCounter - 1]['fen'], "review");
      checkForVariations(App.ReviewGame.moves[App.ReviewGame.moveCounter - 1]);
      highlightPgn(App.ReviewGame.moveCounter - 1);

      // window.reviewBoard.game.move(App.ReviewGame.moves[App.ReviewGame.moveCounter - 1]['notation']);
      // prepareAnalysis();

    } else if(App.ReviewGame.moves.length < App.ReviewGame.moveCounter) {
      return false;
    }

      e.preventDefault();
    });

  $("#reviewMoveBackward").on("click", function(e) {
    if(App.ReviewGame.moveCounter > 1) {
      if($("#coach_mode_status").attr("data-coach") == "false" || $("#coach_mode_status").attr("data-coach") == "true" && window.isOwner == "true") {
        App.ReviewGame.moveCounter--;
      }
      adjustMoveCounter(App.ReviewGame.moveCounter, "review");
      positionBoardTrigger(App.ReviewGame.moves[App.ReviewGame.moveCounter - 1]['fen'], "review");
      highlightPgn(App.ReviewGame.moveCounter - 1);

      // window.reviewBoard.game.undo();
      // prepareAnalysis();
    } else if(App.ReviewGame.moveCounter == 1) {
      if($("#coach_mode_status").attr("data-coach") == "false" || $("#coach_mode_status").attr("data-coach") == "true" && window.isOwner == "true") {
        App.ReviewGame.moveCounter--;
      }
      adjustMoveCounter(App.ReviewGame.moveCounter, "review");
      App.dispatcher.trigger('board.start', {board: "review", channel_name: App.config.channelName, coach_mode: $("#coach_mode_status").attr("data-coach"),
    game_id: App.config.gameId}, success, failure);

      // window.reviewBoard.game.clear();
      // prepareAnalysis();

    } else {
      return false;
    }

    e.preventDefault();
  });

  $("#undoVariationMove").on("click", function(e) {
    if(variationBoard.moves.length > 1) {
      positionBoardTrigger(variationBoard.moves[variationBoard.moves.length - 2]['fen'], "variation");
      updateVariationBoardMovesArray(null, "pop");
    } else if(variationBoard.moves.length == 1) {
      positionBoardTrigger(reviewBoard.fen(), "variation");
      updateVariationBoardMovesArray(null, "pop");
    } else {
      return false;
    }

    e.preventDefault();
  });

  $("#reviewMoveBeg").on('click', function(e) {
    App.dispatcher.trigger('board.start', {board: "review", channel_name: App.config.channelName, coach_mode: $("#coach_mode_status").attr("data-coach"),
    game_id: App.config.gameId}, success, failure);
    adjustMoveCounter(0, "review");
    $(".review-notation").removeClass('current-move');

    // window.reviewBoard.game.clear();
    // prepareAnalysis();

    e.preventDefault();
  });

  $("#reviewMoveEnd").on('click', function(e) {
    App.ReviewGame.moveCounter = App.ReviewGame.moves.length - 1;
    positionBoardTrigger(App.ReviewGame.moves[App.ReviewGame.moves.length - 1]["fen"], "review");
    adjustMoveCounter(App.ReviewGame.moves.length - 1, "review");
    highlightPgn(App.ReviewGame.moveCounter);

    // window.reviewBoard.game.load(App.ReviewGame.moves[App.ReviewGame.moves.length -1].fen);
    // prepareAnalysis();

    e.preventDefault();
  });

  $(".review-notation").on("click", function(e) {
    var move = $(this);
    positionBoardTrigger(move.data("fen"), "review");
    highlightPgn(move.data("index"));
    adjustMoveCounter(move.data("index") + 1, "review");
    e.preventDefault();
  });

  $(".flip-board").on("click", function(e) {
    App.ReviewGame.BOARDS[$(this).data("board")].flip();

    e.preventDefault();
  });

  $("#reviewNewVariation").on("click", function(e) {
    e.preventDefault();
  });

  $("#triggerVariation").on('click', function() {
    if (App.ReviewGame.moveCounter < 1) {return false}
    if($("#coach_mode_status").attr("data-coach") == "true" && window.isOwner == "false") {
      coachModeMessage();
      return false;
    }

    App.dispatcher.trigger("board.trigger_variation", {channel_name: App.config.channelName, coach_mode: $("#coach_mode_status").attr("data-coach"),
    game_id: App.config.gameId}, success, failure);
  });

  $('#myModal').on('hidden.bs.modal', function (e) {
    App.dispatcher.trigger("board.close_variation", {channel_name: App.config.channelName, coach_mode: $("#coach_mode_status").attr("data-coach"),
    game_id: App.config.gameId}, success, failure);
  });

  $("#new_variation").on("submit", function() {
    $("#variation_variation_moves").val(JSON.stringify(variationBoard.moves));

    var curr_move = App.ReviewGame.moves[App.ReviewGame.moveCounter - 1]
    $("#variation_move_id").val(JSON.stringify(curr_move["id"]));
  });

  $("#coach_mode").on("change", function() {
    $("#coachModeForm").submit();
  });

  $("#coachModeForm").on("submit", function() {
    if( $(".ios-switch:checked").length > 0 ) {
      var coachModeStatus = "true";
    } else {
      var coachModeStatus = "false";
    }

    App.dispatcher.trigger("board.update_coach_mode_status", {status: coachModeStatus, channel_name: App.config.channelName, owner_id: window.ownerId});
  });
};



// Triggers
var positionBoardTrigger = function(position, board) {
  App.dispatcher.trigger("board.position_board", {
    position: position,
    channel_name: App.config.channelName,
    board: board,
    coach_mode: $("#coach_mode_status").attr("data-coach"),
    game_id: App.config.gameId
  }, success, failure);
};

var updateVariationBoardMovesArray = function(move, direction, moveNum) {
  App.dispatcher.trigger("board.add_variation_move", {
    move: move,
    directions: direction,
    channel_name: App.config.channelName,
    moveNum: moveNum,
    coach_mode: $("#coach_mode_status").attr("data-coach"),
    game_id: App.config.gameId
  }, success, failure);
};

// Vidoechat
var openTokVideoStream = function() {
  var apiKey = "44827272";
  var guestCounter = 1;
  var session = OT.initSession(apiKey, sessionId);
  session.on("streamCreated", function(event) {
    $('.video-chat').prepend("<div id='guestPublisher" + guestCounter + "' class='video-box'></div>");
    session.subscribe(event.stream, "guestPublisher" + guestCounter, {width: 200, height: 200});
    guestCounter++;

    // resizeVideoBoxes(guestCounter);
  });

  session.connect(token, function(error) {
    var publisher = OT.initPublisher("youPublisher", {name: userVideoName, width: 200, height: 200});
    $("#youPublisher").prependTo(".video-chat");
    session.publish(publisher);
    // resizeVideoBoxes(guestCounter);
  });
};

var resizeVideoBoxes = function(num) {
  $(".video-box").each(function() {
    if(num > 2) {
      $(this).css({"height": "125"});
      $(this).css({"width": "125"});
    }
  });
};


// Load moves
var loadGamesMoves = function() {
  $.getJSON( "/games/" + App.config.gameId +".json", function( data ){
    App.ReviewGame.moves = data;
  });
};

var checkForVariations = function(moveObject) {
  if(moveObject["variations"].length > 0) {
    App.dispatcher.trigger("board.show_variations", {
      move_object: moveObject,
      channel_name: App.config.channelName
    });
  }
};

var adjustMoveCounter = function(counter, board) {
  App.dispatcher.trigger("board.adjust_move_counter", {counter: counter, channel_name: App.config.channelName, board: board, coach_mode: $("#coach_mode_status").attr("data-coach"),
    game_id: App.config.gameId}, success, failure)
};

var highlightPgn = function(move){
  App.dispatcher.trigger('board.highlight_pgn', {channel_name: App.config.channelName, pgn: move, coach_mode: $("#coach_mode_status").attr("data-coach"),
    game_id: App.config.gameId}, success, failure);
};

// Board methods
var sandboxOnChange = function(oldPos, newPos) {
  // if($("#coach_mode_status").attr("data-coach") == "true" && window.isOwner == "false") {
  //   return 'snapback';
  // }
  positionBoardTrigger(newPos, "sandbox");
};

var sandboxOnDrop = function(oldPos, newPos) {
  if($("#coach_mode_status").attr("data-coach") == "true" && window.isOwner == "false") {
    coachModeMessage();
    return 'snapback';
  }
};

var reviewStyles = function() {
  // Sandbox button styles
  // var margin = $('.spare-pieces-7492f').height();
  // alert(margin);
  $('.game-details').css({"margin-top": 62});

  // Review PGN styles
  var boardHeight = $("#reviewBoardContainer").height() - 10;
  var buttonsHeight = $(".review-buttons").height() + 20;

  $('.moves-container').css({"max-height": boardHeight - buttonsHeight});

  $("#triggerVariation").attr("disabled", "disabled");

  $(window).resize(reviewBoard.resize);
  // $(window).resize(window.sandboxBoard.resize);
};


var success = function() {

};

var failure = function() {
  // coachModeMessage();
  console.log("here");
};

var coachModeMessage = function() {
  $("#alert_box").empty();

  $("#alert_box").prepend("<div class='alert alert-danger alert-dismissible' role='alert'></div>");
  $(".alert").prepend("<button type='button' class='close' data-dismiss='alert'></button>");
  $(".close").prepend("<span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span>");
  $(".alert").append("Oops! The creator of this game room has coach mode on, so you can't control the boards until they turn it off.");
};























var removeGreySquares = function() {
  $('#board .square-55d63').css('background', '');
};

var greySquare = function(square) {
  var squareEl = $('#board .square-' + square);

  var background = '#a9a9a9';
  if (squareEl.hasClass('black-3c85d') === true) {
    background = '#696969';
  }

  squareEl.css('background', background);
};

var onDragStart = function(source, piece) {
  // do not pick up pieces if the game is over
  // or if it's not that side's turn
  if (window.variationBoard.game.game_over() === true ||
      (window.variationBoard.game.turn() === 'w' && piece.search(/^b/) !== -1) ||
      (window.variationBoard.game.turn() === 'b' && piece.search(/^w/) !== -1)) {
    return false;
  }
};

var onDrop = function(source, target) {
  removeGreySquares();

  // see if the move is legal
  var move = window.variationBoard.game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  });

  // illegal move
  if (move === null) return 'snapback';
};

var onMouseoverSquare = function(square, piece) {
  // get list of possible moves for this square
  var moves = window.variationBoard.game.moves({
    square: square,
    verbose: true
  });

  // exit if there are no moves available for this square
  if (moves.length === 0) return;

  // highlight the square they moused over
  greySquare(square);

  // highlight the possible squares for this piece
  for (var i = 0; i < moves.length; i++) {
    greySquare(moves[i].to);
  }
};

var onMouseoutSquare = function(square, piece) {
  removeGreySquares();
};

var onSnapEnd = function() {
  positionBoardTrigger(window.variationBoard.game.fen(), "variation");

  var move = {fen: variationBoard.fen(), notation: variationBoard.game.history()[variationBoard.game.history().length - 1]};
  updateVariationBoardMovesArray(move, "add", window.variationBoard.game.history().length);
};

var updateGameTitle = function(title) {
  $("#gameTitle").append(title);
};
