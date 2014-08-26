var manualDomHandlers = function() {
  $("#undoManualMove").on("click", function(e) {
    manualBoard.game.undo();
    manualBoard.moves.pop();
    if(manualBoard.moves.length > 0) {
      manualBoard.position(manualBoard.moves[manualBoard.moves.length - 1]["fen"]);
    } else {
      manualBoard.start();
    }
    updateStatus();
    e.preventDefault();
  });

  $("#new_game").on("submit", function() {
    $('#game_moves').val(JSON.stringify(manualBoard.moves));
  });

  $(window).resize(manualBoard.resize);

  var pgnMargin = $(".manual-intructions").height();
  $(".manual-pgn").css({"margin-top": pgnMargin});
};

var manualBoardInitialization = function() {
  var cfg = {
    draggable: true,
    position: 'start',
    onDragStart: manualonDragStart,
    onDrop: manualonDrop,
    onMouseoutSquare: manualonMouseoutSquare,
    onMouseoverSquare: manualonMouseoverSquare,
    onSnapEnd: manualonSnapEnd
  };

  window.manualBoard = new ChessBoard('manualBoard', cfg);
  window.manualBoard.game = new Chess();
  window.manualBoard.moves = []
};


var manualonDragStart = function(source, piece) {
  // do not pick up pieces if the game is over
  // or if it's not that side's turn
  if (manualBoard.game.game_over() === true ||
      (manualBoard.game.turn() === 'w' && piece.search(/^b/) !== -1) ||
      (manualBoard.game.turn() === 'b' && piece.search(/^w/) !== -1)) {
    return false;
  }
};

var manualonDrop = function(source, target) {
  removeGreySquares();

  // see if the move is legal
  var move = manualBoard.game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  });

  // illegal move
  if (move === null) return 'snapback';

  updateStatus();
};

var manualonMouseoverSquare = function(square, piece) {
  // get list of possible moves for this square
  var moves = manualBoard.game.moves({
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

var manualonMouseoutSquare = function(square, piece) {
  removeGreySquares();
};

var manualonSnapEnd = function() {
  manualBoard.position(manualBoard.game.fen());
  var move = {fen: manualBoard.fen(), notation: manualBoard.game.history()[manualBoard.game.history().length - 1]};
  manualBoard.moves.push(move);
};

var updateStatus = function() {
  var status = '';

  var moveColor = 'White';
  if (manualBoard.game.turn() === 'b') {
    moveColor = 'Black';
  }

  // checkmate?
  if (manualBoard.game.in_checkmate() === true) {
    status = 'Game over, ' + moveColor + ' is in checkmate.';
  }

  // draw?
  else if (manualBoard.game.in_draw() === true) {
    status = 'Game over, drawn position';
  }

  // game still on
  else {
    status = moveColor + ' to move';

    // check?
    if (manualBoard.game.in_check() === true) {
      status += ', ' + moveColor + ' is in check';
    }
  }

  $("#pgn").html(manualBoard.game.pgn());
};
