var notificationDomHandlers = function() {
  $("#notificationCloseLink").on("click", function(e) {
    close_notification();
    e.preventDefault();
  });
};

function close_notification() {
  $('.notification-content').fadeOut().empty();
  $(".notification-outter").removeClass("notification-active");
  $('.notification-close').removeClass("notification-close-active");
}

function open_notification() {
  $(".notification-outter").addClass("notification-active");
  $('.notification-close').addClass("notification-close-active");
  $('.notification-content').text("Jack has recieved an email with your time and email address. He will be in contact with you to confirm or reschedule!").css({"display": "block"});
}
