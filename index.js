'use strict';

const YOUTUBE_SEARCH_URL = 'http://openlibrary.org/search.json';

function getDataFromApi(searchTerm, callback) {
  const query = {
    q: `${searchTerm}`,
  }
  let temp = $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
  console.log(temp);
}

function renderResult(data) {
  return `
    <div class='searchBox'>
      <p>${data.numFound}</p>
    </div>
  `;
}

function displayYouTubeSearchData(data) {
  //const results = data.map((item, index) => renderResult(item));
  console.log(data.numFound);
  renderResult(data);
  $('.js-search-results').html(data.numFound);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

$(watchSubmit);
