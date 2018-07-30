/* Find if the search is for Author or Title */
function findSearchType() {
	let searchType = '';

	if( $('#choiceTitle').val() === 'Title' ) {
		searchType ='Title'; 
	} else {
		searchType = $('#choiceAuthor').val();
	}

	return searchType;
}

/***********************************/
/* Pull data from Open Library api */

function doOpenLibraryAPI(searchType, nameValue) {
	let newQuery = {};
	let displayName = '';
	nameValue = '"' + nameValue + '"';
	const OPENLIBRARY = 'https://openlibrary.org/search.json';
	const	queryAuthor = {
    	author: `${nameValue}`,
    	limit: 200
 	}

	const queryTitle = {
  		title: `${nameValue}`,
  		limit: 200
 	}

  if( searchType === 'Title' ) {
  	newQuery = queryTitle;
  } else {
  	newQuery = queryAuthor;
  }



	// Pull json data from Open library
	$.getJSON(OPENLIBRARY, newQuery, function(data,status) {	
		let requestType = $('#inputField').val();
		let amountFound = data.numFound;
		let dataHead = '';
		let searchType = findSearchType();

		// Create heading
		if( searchType === 'Author') {
			dataHead = "<p class='dataHeading'>" + 
				"Books written by: " + requestType +
				"<br>Number of books found: " + amountFound + "</p>";	
		}
		else {
			dataHead = "<p class='dataHeading'>" +
				"Your " + searchType + " request found: " + amountFound + 
				" books.</p>";
		}

console.log('Search Type: ' + searchType);
		// If data pull succeeds then display //
		if( amountFound > 0 && status === 'success') {
	
			$('.dataBlock').css('display', 'none');
			$('.dataBlock').append(dataHead);

console.log(data);

			// Build table data list //
			data.docs.map(function (item, index) {
				let searchType = findSearchType();

				if( searchType === 'Author' ) {
					$('.dataBlock').append("<p class='dataRow'><span>" + item.title + 
						"<br>Year Pub: " + item.first_publish_year + "</span></p>");
				} else if( searchType === 'Title' ) {
					if( item.author_name ) {
						$('.dataBlock').append("<p class='dataRow'><span>" + item.title + 
							"<br>  Author: "  + item.author_name + 
							"<br>Year Pub: " + item.first_publish_year + "</span></p>");
					} else {
						$('.dataBlock').append("<p class='dataRow'><span>" + item.title + 
							"<br>Year Pub: " + item.first_publish_year + "</span></p>");						
					}
				} else {
					$('.dataBlock').append("<p class='dataRow'>" + item.title + "</p>");					
				}
			});
		} else if( amountFound === 0 ) {
			$('.dataBlock').append("<p class='dataRow'>'Sorry, No entries Found'</p>");
		} else {
			$('.dataBlock').append("<p class='dataRow'>'Sorry, Library Database is Busy'</p>");
		}

		$('.dataBlock').css('display', 'block');
	});
}

/********************************************/
/* Create scrolling window for data display */
function dataWin(query) {
	let message = 'Searching for: ' + query;

	window.onscroll = function() {dataWindow()};

	let header = document.getElementById("bookDetails");
	let sticky = header.offsetTop;

	$('.inputValue').text(message);	

	function dataWindow() {
 	 if (window.pageYOffset > sticky) {
  	  header.classList.add("sticky");
  	} else {
  	  header.classList.remove("sticky");
  	}
	}
}

function bookSearch() {

	/*****************************************/
	/* Button which sets up an author search */

	$('#choiceAuthor').click( function() {
		let instructText = 'Enter Name of Author';

		$('#choiceAuthor').val('Author');
		$('.groupOneHide').slideUp('fast',function() {
			$('.instructBox').text(instructText);
		});

		$(".groupTwoShow").slideDown('fast',function() {
			$("#inputField").focus();
		});
	});

	/***************************************/
	/* Button which sets up a title search */

	$('#choiceTitle').click( function() {
		let instructText = 'Enter Title';

		$('#choiceTitle').val('Title');
		$(".groupOneHide").slideUp('fast',function() {
			$('.instructBox').text(instructText);
		});

		$(".groupTwoShow").slideDown('fast',function() {
			$("#inputField").focus();			
		});
	});


	/********************************************/
	/* Event reset button. Close everything and */
	/* go back to first page */

	$('#resetInputBtn').click( function() {
		let instructText = 'Select Author or Title';

		$('#choiceAuthor').val('');
		$('#choiceTitle').val('');
		$('#inputField').val('');

		$(".groupTwoHide").slideUp('fast', function() {
			$('.instructBox').text(instructText);
			$('.dataBlock').empty();
		});
		$(".groupOneShow").slideDown('fast', function() {
			$("#choiceAuthor").focus();
		});
	});

	/*************************************************/
	/* Enter button to submit Author or Title search */

	$('#enterBtn').click( function() {
		let query = '';
		let counter = 0;

		query = $('#inputField').val();

		if(query === '') {
			alert("An Entry is Required");
		}	else {
			$(".groupTwoHide").slideUp('fast', function() {
				dataWin(query);
			});

			doOpenLibraryAPI( findSearchType(), query );

			$(".groupThreeShow").slideDown('fast', function() {
				$('#nextTenBtn').focus();
			});
		}
	});

	/***************************************/
	/* Back button moves back on menu set  */

	$('#backBtn').click( function() {

		$('#inputField').val('');

		$(".groupThreeHide").slideUp('fast', function() {
			$('.dataBlock').empty();
		});

		$(".groupTwoShow").slideDown('fast', function() {
			$("#inputField").focus();
		});

	});

	/********************************************************************/
	/* If the (keyboard) Enter/Return key is pressed do Auth/Title list */

	$("#inputField").keydown(function(event){ 
		let query = '';
		let keyPressed = 13; // return key

		query = $('#inputField').val();

		if( event.which === keyPressed && query.length > 1 ) {
			$(".groupTwoHide").slideUp('fast', function() {
//				$('#inputField').val('');
				dataWin(query);
			});

			doOpenLibraryAPI( findSearchType(), query );

			$(".groupThreeShow").slideDown('fast', function() {
			});
		}
	});

}

$(bookSearch);