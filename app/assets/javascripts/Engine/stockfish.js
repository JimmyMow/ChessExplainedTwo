// var engine = new Worker("/engine.js"), engineStatus = {}, displayScore = true;

// // if(options.book) {
// // var bookRequest = new XMLHttpRequest();
// // bookRequest.open('GET', "/book.bin", true);
// // bookRequest.responseType = "arraybuffer";
// // bookRequest.onload = function(event) {
// //     if(bookRequest.status == 200) {
// //         engine.postMessage({book: bookRequest.response});
// //         engineStatus.book = 'ready.';
// //         displayStatus();
// //     } else {
// //         engineStatus.book = 'failed!';
// //         displayStatus();
// //     }
// // };
// // bookRequest.send(null);
// // } else {
// //     engineStatus.book = 'none';
// // }


// function uciCmd(cmd) {
//     engine.postMessage(cmd);
// }

// // Write uci to start the engine up
// uciCmd('uci');

// // Prepare the analysis
// function prepareAnalysis(){
//     var moves = '';
//     var history = window.reviewBoard.game.history({verbose: true});
//     for(var i = 0; i < history.length; ++i) {
//         var move = history[i];
//         moves += ' ' + move.from + move.to + (move.promotion ? move.promotion : '');
//     }

//     uciCmd('position startpos moves' + moves);

//     uciCmd('go infinite');
// }

// // When the engine writes back to us
// engine.onmessage = function(event) {
//     var line = event.data;

//     if(line == 'uciok') {
//         engineStatus.engineLoaded = true;
//     } else if(line == 'readyok') {
//         engineStatus.engineReady = true;
//     } else {
//         var match = line.match(/^bestmove ([a-h][1-8])([a-h][1-8])([qrbk])?/);
//         if(match) {
//             // engines best move
//         } else if(match = line.match(/^info .*\bdepth (\d+) .*\bnps (\d+)/)) {
//             engineStatus.search = 'Depth: ' + match[1];
//         }
//         if(match = line.match(/^info .*\bscore (\w+) (-?\d+)/)) {
//             var score = parseInt(match[2])
//             var score = parseInt(match[2]) * (window.reviewBoard.game.turn() == 'w' ? 1 : -1);
//             if(match[1] == 'cp') {
//                 engineStatus.score = (score / 100.0).toFixed(2);
//             } else if(match[1] == 'mate') {
//                 engineStatus.score = '#' + score;
//             }
//         }
//         var x =  " pv ";
//         if(line.indexOf(x) !== -1) {
//           engineStatus.moves = line.substr(line.indexOf(x) + x.length);
//         }
//     }
//     displayStatus();
// };

// // Display the information to the user
// function displayStatus() {
//     var status = 'Engine: ';
//     if(!engineStatus.engineLoaded) {
//         status += 'loading...';
//     } else if(!engineStatus.engineReady) {
//         status += 'loaded...';
//     } else {
//         status += 'ready.';
//     }
//     status += ' Book: ' + engineStatus.book;
//     if(engineStatus.search) {
//         status += '<br>' + engineStatus.search;
//         if(engineStatus.score && displayScore) {
//             status += ' Score: ' + engineStatus.score;
//         }


//         // if(engineStatus.moves){
//         //   var turnIntoPgnChess = turnIntoPgnChess || new Chess();
//         //   turnIntoPgnChess.load(App.ReviewGame.moves[App.ReviewGame.moveCounter - 1].fen);

//         //   var moves = engineStatus.moves.split(" ").map(function(item) {
//         //     return turnIntoPgnChess.move({from: item.slice(0, 2), to: item.slice(2)}).san;
//         //   });
//         // }


//         if(engineStatus.moves){
//           // status += '<br>' + moves.join(" ");
//           status += '<br>' + engineStatus.moves;
//         }
//     }
//     $('#engineStatus').html(status);
// }
