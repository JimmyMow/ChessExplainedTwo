var regualarPgnUpload = function() {
    $("#new_game").on('submit', function(e) {
        var original_pgn = $('#game_moves').val();
        var chess = new Chess();
        var loadedResult = chess.load_pgn(original_pgn);

        if(loadedResult) {
            var parsed_pgn = chess.history();
            chess.clear();

            var anotherEngine = new Chess();
            var moveObjects = [];
            parsed_pgn.forEach(function(item, index) {
              anotherEngine.move(item);
              moveObjects.push( {notation: item, fen: anotherEngine.fen()}  );
            });

            $('#game_moves').val(JSON.stringify(moveObjects));
        } else {
            e.preventDefault();
            $(".actions button").attr("disabled", false);
            alert("For some reason your PGN didn't load correctly. Review it one more time for any typos");
            return false;
        }
    });
};

var pgnUploadFormValidation = function() {
    $("#game_moves").on("keyup", function() {
        if( $(this).val().length > 0 ) {
            $(".actions button").attr("disabled", false);
        } else if($(this).val().length == 0) {
            $(".actions button").attr("disabled", "disabled");
        }
    });
};
