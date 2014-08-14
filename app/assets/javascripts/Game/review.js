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


var openTokVideoStream = function() {
  var apiKey = "44827272";
  var guestCounter = 0;
  var session = OT.initSession(apiKey, sessionId);
  session.on("streamCreated", function(event) {
    $('.video-chat').prepend("<div id='guestPublisher" + guestCounter + "' class='video-stream'></div>");
    session.subscribe(event.stream, "guestPublisher" + guestCounter, {width: 200, height: 200});
    guestCounter++;
  });

  session.connect(token, function(error) {
    var publisher = OT.initPublisher("youPublisher", {name: userVideoName, width: 200, height: 200});
    $("#youPublisher").prependTo(".video-chat");
    session.publish(publisher);
  });
};

// Board methods
var onChange = function(oldPos, newPos) {
  App.dispatcher.trigger('send_position', {
    fen_position: newPos,
    channel_name: App.config.channelName
  });
};


