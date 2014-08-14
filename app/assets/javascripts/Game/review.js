var sandboxBoardInitialization = function() {
  var cfg = {draggable: true, position: 'start', onChange: onChange, sparePieces: true, dropOffBoard: 'trash'};

  var board = new ChessBoard('sandboxBoard', cfg);

  // Triggers
  $('#sandboxStartBtn').on('click', function(){
    App.dispatcher.trigger('board.start', {channel_name: App.config.channelName});
  });

  $('#sandboxClearBtn').on('click', function(){
    App.dispatcher.trigger('board.clear', {channel_name: App.config.channelName});
  });

  // Binds
  var channel = App.dispatcher.subscribe(App.config.channelName)
  channel.bind("send_move", function(data) {
    board.position(data['position'])
  });

  channel.bind("start_position", board.start);
  channel.bind("clear_position", board.clear);
};

// Board methods
var onChange = function(oldPos, newPos) {
  App.dispatcher.trigger('send_position', {
    fen_position: newPos,
    channel_name: App.config.channelName
  });
};


