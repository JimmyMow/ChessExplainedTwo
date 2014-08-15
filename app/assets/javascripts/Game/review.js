// Board initialization
var sandboxBoardInitialization = function() {
  var cfg = {draggable: true, position: 'start', onChange: sandboxOnChange, sparePieces: true, dropOffBoard: 'trash'};

  window.sandboxBoard = new ChessBoard('sandboxBoard', cfg);


  $('#sandboxStartBtn').on('click', function(e){
    App.dispatcher.trigger('board.start', {board: "sandbox", channel_name: App.config.channelName});
    e.preventDefault();
  });

  $('#sandboxClearBtn').on('click', function(e){
    App.dispatcher.trigger('board.clear', {board: "sandbox", channel_name: App.config.channelName});
    e.preventDefault();
  });

};

var reviewBoardInitialization = function() {
  var cfg = {position: 'start'};

  window.reviewBoard = new ChessBoard('reviewBoard', cfg);
};

// var variationBoardInitialization = function() {
//   var cfg = {
//     draggable: true,
//     position: 'start',
//     onDragStart: onDragStart,
//     onDrop: onDrop,
//     onMouseoutSquare: onMouseoutSquare,
//     onMouseoverSquare: onMouseoverSquare,
//     onSnapEnd: onSnapEnd
//   };

//   window.variationBoard = new ChessBoard('variationBoard', cfg);
// };

// Initialize DOM Handlers
var initializeDomHandlers = function() {
  $("#reviewMoveForward").on("click", function(e) {
    if(App.ReviewGame.moves.length > App.ReviewGame.moveCounter) {
      App.ReviewGame.moveCounter++;
      positionBoardTrigger(App.ReviewGame.moves[App.ReviewGame.moveCounter - 1]['fen'], "review");
    } else if(App.ReviewGame.moves.length < App.ReviewGame.moveCounter) {
      return false;
    }

      e.preventDefault();
    });

  $("#reviewMoveBackward").on("click", function(e) {
    if(App.ReviewGame.moveCounter > 1) {
      App.ReviewGame.moveCounter--;
      positionBoardTrigger(App.ReviewGame.moves[App.ReviewGame.moveCounter - 1]['fen'], "review");
    } else if(App.ReviewGame.moveCounter == 1) {
      App.ReviewGame.moveCounter--;
      App.dispatcher.trigger('board.start', {board: "review", channel_name: App.config.channelName});
    } else {
      return false;
    }

    e.preventDefault();
  });

  $("#reviewMoveBeg").on('click', function(e) {
    App.dispatcher.trigger('board.start', {board: "review", channel_name: App.config.channelName});

    e.preventDefault();
  });

  $("#reviewMoveEnd").on('click', function(e) {
    positionBoardTrigger(App.ReviewGame.moves[App.ReviewGame.moves.length - 1]["fen"], "review");

    e.preventDefault();
  });

  $(".review-notation").on("click", function(e) {
    var move = $(this);
    positionBoardTrigger(move.data("fen"), "review");

    e.preventDefault();
  });

  $(".flip-board").on("click", function(e) {
    App.ReviewGame.BOARDS[$(this).data("board")].flip();

    e.preventDefault();
  });

  $("#reviewNewVariation").on("click", function(e) {
    console.log("here");

    e.preventDefault();
  });
};


// Initialize Binds
var initializeBinds = function() {
  var channel = App.dispatcher.subscribe(App.config.channelName)

  channel.bind("start_position", function(data){
    App.ReviewGame.BOARDS[data["board"]].start();
  });

    channel.bind("clear_position", function(data){
    App.ReviewGame.BOARDS[data["board"]].clear();
  });

  channel.bind("position_board", function(data) {
    App.ReviewGame.BOARDS[data["board"]].position(data["position"]);
  });

  channel.bind("trigger_variation", function(data) {
    variationBoard();
    $('#myModal').modal({show:true, keyboard:true, backdrop:true})
  });
};

// Triggers
var positionBoardTrigger = function(position, board) {
  App.dispatcher.trigger("board.position_board", {
    position: position,
    channel_name: App.config.channelName,
    board: board
  });
};

// Vidoechat
var openTokVideoStream = function() {
  var apiKey = "44827272";
  var guestCounter = 0;
  var session = OT.initSession(apiKey, sessionId);
  session.on("streamCreated", function(event) {
    $('.video-chat').prepend("<div id='guestPublisher" + guestCounter + "' class='video-box'></div>");
    session.subscribe(event.stream, "guestPublisher" + guestCounter, {width: 200, height: 200});
    guestCounter++;
  });

  session.connect(token, function(error) {
    var publisher = OT.initPublisher("youPublisher", {name: userVideoName, width: 200, height: 200});
    $("#youPublisher").prependTo(".video-chat");
    session.publish(publisher);
  });
};


// Load moves
var loadGamesMoves = function() {
  $.getJSON( "/games/" + App.config.gameId +".json", function( data ){
    App.ReviewGame.moves = data;
  });
};


// Board methods
var sandboxOnChange = function(oldPos, newPos) {
  positionBoardTrigger(newPos, "sandbox");
};




















var variationBoard = function() {

  var board,
    game = new Chess();

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
    if (game.game_over() === true ||
        (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
        (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
      return false;
    }
  };

  var onDrop = function(source, target) {
    removeGreySquares();

    // see if the move is legal
    var move = game.move({
      from: source,
      to: target,
      promotion: 'q' // NOTE: always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return 'snapback';
  };

  var onMouseoverSquare = function(square, piece) {
    // get list of possible moves for this square
    var moves = game.moves({
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
    board.position(game.fen());
  };

  var cfg = {
    draggable: true,
    position: window.reviewBoard.fen(),
    onDragStart: onDragStart,
    onDrop: onDrop,
    onMouseoutSquare: onMouseoutSquare,
    onMouseoverSquare: onMouseoverSquare,
    onSnapEnd: onSnapEnd
  };
  board = new ChessBoard('variationBoard', cfg);


};
