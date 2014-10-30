var userAutocompletion = function() {
  $( "#user_autocomplete" ).autocomplete({
    source: "/search_suggestions",
    select: function (event, ui) {
      $( "#user_conversation_to" ).val(ui.item.id);
    },
    change: function (event, ui) {
      $( "#user_conversation_to" ).val(ui.item.id);
    }
  });
};
