/*********************************************/
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
    	limit: 300
 	}

	const queryTitle = {
  		title: `${nameValue}`,
  		limit: 300
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

		// If data pull succeeds then display //
		if( amountFound > 0 && status === 'success') {
	
			$('.dataBlock').append(dataHead);

			// Left this console.log for future upgrades
  		 console.log(data);

			// Build table data list //
			data.docs.map(function (item, index) {
				let searchType = findSearchType();
				let contributor = '';
				let first_publish_year = '';

				if( !item.contributor ) {
					contributor = 'None';
				} else {
					contributor = item.contributor;
				}

				if( !item.first_publish_year ) {
					first_publish_year = 'Unknown';
				} else {
					first_publish_year = item.first_publish_year;
				}

				if( searchType === 'Author' ) {
					$('.dataBlock').append("<p class='dataRow'><span>" + 
						"Author: "  + item.author_name + "<br>Title: " + item.title + 
						"<br>Year Pub: " + first_publish_year + 
						"<br>Contributor: " + contributor + "</span></p>");
				} else if( searchType === 'Title' ) {
					if( item.author_name ) {
						$('.dataBlock').append("<p class='dataRow'><span>" + 
							"Author: "  + item.author_name + "<br>Title: " + item.title + 
							"<br>Year Pub: " + first_publish_year + "</span></p>");
					} else {
						$('.dataBlock').append("<p class='dataRow'><span>Title: " + 
							item.title + "<br>Year Pub: " + first_publish_year +
							"</span></p>");						
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

/*****************************************/
/* This main function handles all events */

function bookSearch() {

	/*****************************************/
	/* Button which sets up an author search */

	$('#choiceAuthor').click( function() {
		let instructText = 'Enter Author';

		$('#choiceAuthor').val('Author');
		$('.one').slideUp('fast', function() {
			$('.instructBox').text(instructText);
			$('.pageOne').css('display', 'none');
			$('.pageTwo').css('display', 'block');

			$(".two").slideDown( function() {
				$("#inputField").focus();
			});
		});


	});

	/***************************************/
	/* Button which sets up a title search */

	$('#choiceTitle').click( function() {
		let instructText = 'Enter Title';

		$('#choiceTitle').val('Title');
		$(".one").slideUp('fast',function() {
			$('.instructBox').text(instructText);
			$('.pageOne').css('display', 'none');
			$('.pageTwo').css('display', 'block');
		});

		$(".two").slideDown( function() {
			$("#inputField").focus();			
		});
	});


	/********************************************/
	/* Event reset button. Close everything and */
	/* go back to first page                    */

	$('#resetInputBtn').click( function() {
		let instructText = 'Select Author or Title';

		$('#choiceAuthor').val('');
		$('#choiceTitle').val('');
		$('#inputField').val('');

		$(".two").slideUp('fast', function() {
			$('.instructBox').text(instructText);
			$('.pageTwo').css('display', 'none');
			$('.pageOne').css('display', 'block');
		});
		$(".one").slideDown( function() {
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
			$(".two").slideUp('fast', function() {
				$('.pageTwo').css('display', 'none');
				$('.pageThree').css('display', 'block');
				dataWin(query);
			});

			doOpenLibraryAPI( findSearchType(), query );

			$(".three").slideDown(function() {
				$('#backBtn').focus();
			});
		}
	});

	/***************************************/
	/* Back button moves back on menu set  */

	$('#backBtn').click( function() {

		$('#inputField').val('');

		$(".three").slideUp('fast', function() {
			$('.dataBlock').empty();
			$('.pageThree').css('display', 'none');
			$('.pageTwo').css('display', 'block');
		});

		$(".two").slideDown(function() {
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
			$(".two").slideUp(function() {
				dataWin(query);
				$('.two').css('display', 'none');
				$('.three').css('display', 'block');
			});

			doOpenLibraryAPI( findSearchType(), query );

			$(".three").slideDown(function() {
				$("#backBtn").focus();
			});
		}
	});
}

$(bookSearch);