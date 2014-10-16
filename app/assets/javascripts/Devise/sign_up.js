var signUpValidation = function(){
  $("#new_user").on("submit", function(e){
    var notReady = false, $inputs = $('#new_user input[type=text], input[type=password], input[type=email]');

    $inputs.each(function() {
      $(this).parent("div").removeClass("has-error");
      if($(this).val().length === 0){
        $(this).parent("div").addClass("has-error");
        notReady = true;
      }
      console.log(notReady);
    });

    if(notReady){
      e.preventDefault();
      return false;
    }
  });
};
