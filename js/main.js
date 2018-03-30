/**
 * File Name: main.js
 * Description: Main Function meant for handling github api request
 */

$(document).ready(function(){

  $('#language-select').change(filterRepos);

  $.ajax({
    url: 'https://api.github.com/users/analiamok/repos?fields=html_url',
    type: 'GET',
    dataType: 'json',
    data: {
      'sort' : 'created'
    },
    success: function(response){
      //console.log(response);
      var repos = [];

      for(var i = 0, length=response.length; i < length; i++){
        var curr = response[i],
            title = curr.name,
            repoUrl = curr.html_url,
            description = curr.description,
            language = curr.language;

        var repo = {
          'title': title,
          'url': repoUrl,
          'language': language,
          'description': description
        };

        repos.push(repo);
      }

      formatData(repos);
    },
    error: function(response){
      console.log('Something went wrong');
      console.log(response);
    }
  });

});

/**
 * formatData
 * 
 * Structures repos array before inserting into the DOM
 * 
 * @arg {array} repos
 */
function formatData(repos){
  var cards = '';

  // Using static version for github served demo
  repos = staticRepos;

  for(var i = 0, length = repos.length; i < length; i++){
    var curr = repos[i],
        description = (curr.description === null) ? '' : curr.description,
        language = (curr.language !== null) ? curr.language : null;

    var card = '<a href="' + curr.url + '" class="card" data-lang="' + language + '">'; // TODO: Adjust styling to make cards a tags; place url here
    card += '<p class="card-title">' + curr.title + '</p>';

    card += '<p class="card-content">' + description + '</p>';

    if(language != null){
      card += '<p><span class="language">' + language + '</span></p>';
    }

    card += '</a>'; // End tag

    cards += card;
  }

  $('.grid').html(cards);
} // End of formatData


/**
 * filterRepos
 * 
 * Listener event for select
 * Toggles display of repo cards based on data-lang attribute
 */
function filterRepos(e){
  var selectedFilter = e.target.value;
  
  var cards = $('.card'),
      visibleCards = 0;

  for(var i = 0, length = cards.length; i < length; i++){
    if(selectedFilter === 'All' || cards[i].getAttribute('data-lang') === selectedFilter){
      cards[i].style.display = 'block';
      visibleCards++;
    }else{
      cards[i].style.display = 'none';
    }
  }

} // End of filterRepos