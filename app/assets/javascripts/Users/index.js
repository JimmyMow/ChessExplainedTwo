var userBindEvents = function() {
  App.dispatcher.on_open = function(data) {
    App.dispatcher.trigger("new_user");
  }

  App.dispatcher.bind("user_list", function(data) {
    console.log(data);
    if(data.length > 0) {
      var html = "";
      data.forEach(function(user) {
        if(user) {
          var a_tag = "<a href=\"/users/" + user.id + "\">" + user.user_name + "</a>";
          html = html + "<li>" + a_tag + "</li>";
        }
      });

      $('.user-list').empty().append(html);
    }

  });

  App.dispatcher.bind("people_count", function(data){
    console.log(peopleCount)
    var peopleCount = data;
    $("#people-count").empty().append(peopleCount);
  });
};
