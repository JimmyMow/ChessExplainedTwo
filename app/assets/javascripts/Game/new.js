var regualarPgnUpload = function() {
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
};