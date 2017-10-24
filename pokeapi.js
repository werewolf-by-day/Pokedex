var html_string="";
      for(var i = 1; i <= 151; i++) {
        html_string += '<img id="' +  [i]  + '" src="http://pokeapi.co/media/img/' + [i] + '.png" alt="">';
      }

$(document).ready(function() {
  $("#container").append(html_string);
});

$(document).on();

$(document).on("click", "img", (function() {
    var y = $(this).attr("id");
    var unique = $(this).data("number");
    $(this, "id").data("number", y);
  $.get("https://pokeapi.co/api/v2/pokemon/" + unique + "/", function(res) {
    var dex_entry = "";
    var mon_name = ((res.name).charAt(0).toUpperCase() + (res.name).slice(1) )
    dex_entry += "<h1>" + mon_name + "</h1>";
    dex_entry += "<img src='http://pokeapi.co/media/img/" + unique + ".png'>";
    dex_entry += "<h3>Types</h3>"
    dex_entry += "<ul>";
    for(var x = 0; x < res.types.length; x++) {
      dex_entry += "<li>" + res.types[x].name + "</li>";
    }

    dex_entry += "</ul>";
    dex_entry += "<h3>Height</h3>"
    dex_entry += "<p>" + (res.height * .1).toFixed(2) + " m</p>"
    dex_entry += "<h3>Weight</h3>"
    dex_entry += "<p>" + (res.weight * .1).toFixed(2) + " kg</p>"

    $("#pokedex").html(dex_entry);
  }, "json");
}));