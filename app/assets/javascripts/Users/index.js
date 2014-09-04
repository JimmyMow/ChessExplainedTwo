var userBindEvents = function() {
  App.dispatcher.on_open = function(data) {
    App.dispatcher.trigger("new_user");
  }

  App.dispatcher.bind("user_list", function(data) {
    if(data.length > 0) {
      var html = "";
      data.forEach(function(item, index) {
        html = html + "<li>" + item['user_name'] + "</li>";
      });

      $('.user-list').empty().append(html);
    }

  });
};
