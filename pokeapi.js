//gets all pokemon images and assigns unique Id
//updated function to include gen VIII - no abilities listed for newer mons, info completely unavailable for newest - listing up to Zarude
var html_string="";
      for(var i = 1; i <= 893; i++) {
        html_string += '<img id="' +  [i]  + '" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + [i] + '.png" alt="">';
      }

//adds all images
$(document).ready(function() {
  html_string += '<h1>Alternate Forms</h1>';
//this bit here is to add the additonal forms of certain Pokemon, but ID is arbitrary in API, so it doesn't coincide with dexId - will have to find workaround  
  html_string += '<img id="10126" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/745-midnight.png" alt="">';
  html_string += '<img id="10311" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/745-dusk.png" alt="">';
  for(var i = 10001; i <= 10190; i++) {
        html_string += '<img id="' +  [i]  + '" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + [i] + '.png" alt="">';
      }  
  $("#container").append(html_string);
});

//click on pokemon function
$(document).on("click", "img", (function() {
    var dexId = $(this).attr("id");
    var url = "https://pokeapi.co/api/v2/pokemon/" + dexId;
//gets Pokemon name(capitalized) and sprite
  $.get(url, function(res) {
    var dex_entry = "";
    var mon_name = ((res.name).charAt(0).toUpperCase() + (res.name).slice(1) );
    dex_entry += "<h1>" + mon_name + "</h1>";
    dex_entry += "<img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + dexId + ".png'>";
//lists types and adds class for CSS functionality
    dex_entry += "<h3>Types</h3>";
    dex_entry += "<ul>";
    for(var x = 0; x < res.types.length; x++) {
      dex_entry += "<li class=" + res.types[x].type.name + ">" + res.types[x].type.name + "</li>";
    }
//lists abilities and assigns var for next step
    dex_entry += "<h3>Abilities</<h3>";
    dex_entry += "<ul class='ability'>";
//note for newer mons not displaying abilites
    if(res.abilities.length < 1){
      dex_entry += "<h6>**more info coming soon**</h6>";
    }      
    for(var y = 0; y < res.abilities.length; y++) {
      var abilityUrl = res.abilities[y].ability.url;
      var abilityId = abilityUrl.replace(/[^\d]/g, "");
      var abilityId = abilityId.substr(1);
//assigns opacity for hidden ability
      if(res.abilities[y].is_hidden === true){
        dex_entry += "<div style='opacity: 0.1;'> <a href='#' title='This is a hidden ability'> <li class='" + abilityId + "'>" + res.abilities[y].ability.name + "</li> </a> </div>";
      } else {
      dex_entry += "<li class='" + abilityId + "'>" + res.abilities[y].ability.name + "</li>";
      }

    }
//adds dex id number, adds and recalculates height and weight to meters and kilograms respectively
    dex_entry += "</ul>";
    dex_entry += "<h3>Height</h3>";
    dex_entry += "<p>" + (res.height * .1).toFixed(2) + " m</p>";
    dex_entry += "<h3>Weight</h3>";
    dex_entry += "<p>" + (res.weight * .1).toFixed(2) + " kg</p>";
//var created to accommodate different id for alternate forms    
    var speciesNumber = (res.species.url).slice(42);
    var realDexId = speciesNumber.replace("/", "");
    dex_entry += "<p id='dex_num'> #" + realDexId + "</p>";
//stat bar functionality       
    dex_entry += "<h2>Stats</<h2>"; 
    dex_entry += "<ul>";
    for(var z = 0; z < res.stats.length; z++) {
      dex_entry += "<li class='stats'> <span style='display: inline-block; width:" + res.stats[z].base_stat + "px; background: linear-gradient(to right, rgb(112,146,190), rgb(162,196,240));'>" + res.stats[z].stat.name + ": " + res.stats[z].base_stat + "</span> </li>";
    }

//adds dex details to side bar
    $("#pokedex").html(dex_entry);

//functionality for hidden abilities
    $(".ability div").hover(function() {
      $(this).css('opacity', '1.0');
    }, function() {
      $(this).css('opacity', '0.1');
    });

//displays details of clicked ability
    $("li").click(function() {
      var abilityId = $(this).attr("class");
      var url2 = "https://pokeapi.co/api/v2/ability/" + abilityId;
      $.get(url2, function(res) {
        if(abilityId > 191 || abilityId == 65 || abilityId == 64 || abilityId == 103 || abilityId == 119 || abilityId == 145) {
          var abilityTitle = ((res.name).toUpperCase());
          alert("\n" + abilityTitle + "\n\n" + res.effect_entries[0].short_effect);
          console.log(res.effect_entries[0].effect);
          console.log(abilityId);
        } else {
          var abilityTitle = ((res.name).toUpperCase());
          alert("\n" + abilityTitle + "\n\n" + res.effect_entries[1].short_effect);
          console.log(res.effect_entries[1].effect);
          console.log(abilityId);
        }
      }); return false;
    });    

  }, "json");

}));