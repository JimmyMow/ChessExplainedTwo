var landingPageStyles = function() {
  var windowHeight = $(window).height();
  var assignedHeight = windowHeight - (windowHeight / 3);
  $(".intro").css({"min-height": assignedHeight - 45});

  var learningChessHeight = $(".learning-chess").height();
  $(".king-container").css({"top": learningChessHeight/8 + "px"});
};
