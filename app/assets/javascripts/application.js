// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require twitter/bootstrap
//= require chessboard
//= require chess
//= require websocket_rails/main
//= require_tree .



$(document).ready(function() {
  $("#new_game").on('submit', function(e) {
    var original_pgn = $('#game_moves').val();
    var chess = new Chess();
    chess.load_pgn(original_pgn);
    var parsed_pgn = chess.history();
    chess.clear();

    var anotherEngine = new Chess();
    var moveObjects = [];
    parsed_pgn.forEach(function(item, index) {
      anotherEngine.move(item);
      moveObjects.push( {notation: item, fen: anotherEngine.fen()}  );
    });

    $('#game_moves').val(JSON.stringify(moveObjects));
  });


  var onChange = function(oldPos, newPos) {
    App.dispatcher.trigger('send_position', {
      fen_position: newPos,
      channel_name: App.config.channelName
    });
  };

  var cfg = {
    draggable: true,
    position: 'start',
    onChange: onChange,
    sparePieces: true,
    dropOffBoard: 'trash'

  };
  var board = new ChessBoard('sandboxBoard', cfg);

  $('#startPositionBtn').on('click', board.start);

  var channel = App.dispatcher.subscribe(App.config.channelName)

  channel.bind("send_move", function(data) {
    board.position(data['position'])
  });

  $('#sandboxStartBtn').on('click', board.start);

  $('#sandboxClearBtn').on('click', board.clear);

});

