var html_string="";
      for(var i = 1; i <= 718; i++) {
        html_string += '<img id="' +  [i]  + '" src="http://pokeapi.co/media/img/' + [i] + '.png" alt="">';
      }

$(document).ready(function() {
  $("#container").append(html_string);
});

$(document).on();

$(document).on("click", "img", (function() {
    var dexId = $(this).attr("id");
    var url = "https://pokeapi.co/api/v2/pokemon/" + dexId;

  $.get(url, function(res) {
    var dex_entry = "";
    var mon_name = ((res.name).charAt(0).toUpperCase() + (res.name).slice(1) );
    dex_entry += "<h1>" + mon_name + "</h1>";
    // dex_entry += "<img src='http://pokeapi.co/media/img/" + dexId + ".png'>";
    dex_entry += "<img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + dexId + ".png'>";

    dex_entry += "<h3>Types</h3>";
    dex_entry += "<ul>";
    for(var x = 0; x < res.types.length; x++) {
      dex_entry += "<li class=" + res.types[x].type.name + ">" + res.types[x].type.name + "</li>";
    }

    dex_entry += "<h3>Abilities</<h3>";
    dex_entry += "<ul>";
    for(var y = 0; y < res.abilities.length; y++) {
      if(res.abilities[y].is_hidden === true){
        dex_entry += "<a href='#' title='This is a hidden ability'> <li class='hidden'>" + res.abilities[y].ability.name + "</li> </a>";
      } else {
      dex_entry += "<li class='abilities'>" + res.abilities[y].ability.name + "</li>";
      // dex_entry += "<p>" + res.abilities[y].ability.url.effect_entries + "<p>";
      }
    }

    dex_entry += "</ul>";
    dex_entry += "<h3>Height</h3>";
    dex_entry += "<p>" + (res.height * .1).toFixed(2) + " m</p>";
    dex_entry += "<h3>Weight</h3>";
    dex_entry += "<p>" + (res.weight * .1).toFixed(2) + " kg</p>";
    dex_entry += "<p id='dex_num'> #" + res.id + "</p>";

    dex_entry += "<h2>Stats</<h2>";
    dex_entry += "<ul>";
    for(var z = 0; z < res.stats.length; z++) {
      dex_entry += "<li class='stats'> <span style='display: inline-block; width:" + res.stats[z].base_stat + "px; background: linear-gradient(to right, rgb(112,146,190), rgb(162,196,240));'>" + res.stats[z].stat.name + ":" + res.stats[z].base_stat + "</span> </li>";
    }


    $("#pokedex").html(dex_entry);

    $(".hidden").hover(function() {
      $(this).css('opacity', '1');
    }, function() {
      $(this).css('opacity', '0.05');
    });

  }, "json");
}));