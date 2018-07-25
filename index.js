/***********************************/
/* Pull data from Open Library api */

function doOpenLibraryAPI(rtnKey, searchTerm) {
	let displayName = '';
	const OPENLIBRARY = 'https://openlibrary.org/search.json';
	const query = {
//    q: `${searchTerm}`,
    author: `${searchTerm}`,
    limit: 5
  }

	displayName = 'Searching for: ' + searchTerm;
	$('.dataTitleDisplay').text(`${displayName}`);
	$('.dataTitle').css('display', 'block');

//	console.log(testOb);
//	console.log(testOb.data.readyState);
//	console.log(testOb.readyState);
//	console.log(testOb.docs[0]);

	// Pull json data from the library

	$.getJSON(OPENLIBRARY, query, function(data,status) {
		let displayData = '';
		let lineCount = 0;
		let numberOfLines = 80;
		let amountFound = data.numFound;
		let dataHead = '';
			
		$('.dataDump').css('display', 'none');
		console.log(data);
		console.log(data.docs[0]);
		console.log("Status: " + status);
		console.log("Number records found: " + amountFound);
		test = data.docs[0];
		// If data pull succeeds then display //
		if( status === 'success') {
			dataHead = "<p class='dataHeading'>" + 
				"Books written by: <span class='searchItem'>" + 
				searchTerm + "<br>Number of books: " + amountFound + "</span></p>";
	
			$('.dataDump').append(dataHead);

			// Build table data list //
			data.docs.map(function (item, index) {
				let data = "<p class='dataRow'>" + item.title + "</p>";
				$('.dataDump').append(data);
			});

			$('.dataDump').css('display', 'block');
		}
		$('.dataTitleDisplay').text(`${displayName}`);
		return data.docs;
	});
}

/*****************/
/* Main function */

let test = '';

function bookSearch() {

	/****************************************/
	/* Button which sets up a author search */

	$('#choiceAuthor').click( function() {
		event.preventDefault();
		$(".centerText").slideUp('slow',function() {
			$('.partOne').css('display', 'none');			
			$('.listName').text('Author');
			$('.dataTitle').css('display', 'none');
		});

		$(".centerText").slideDown('slow',function() {
			$("#inputField").focus();
			$('.partTwo').css('display', 'block');
		});
	});

	/***************************************/
	/* Button which sets up a title search */

	$('#choiceTitle').click( function() {
		event.preventDefault();
		$(".centerText").slideUp('slow', function() {
			$('.partOne').css('display', 'none');
			$('.listName').text('Title');
			$('.dataTitle').css('display', 'none');
		});

		$(".centerText").slideDown('slow', function() {
			$("#inputField").focus();
			$('.partTwo').css('display', 'block');
		});

	});

	/*************************************************/
	/* Enter button to submit Author or Title search */

	$('#enterBtn').click( function() {
		$('.dataDump').empty();
		doOpenLibraryAPI(13,$('#inputField').val());
		$('#inputField').val('');
		$("#inputField").focus();
		console.log("Global: " + test);
	});

	/********************************************************************/
	/* If the (keyboard) Enter/Return key is pressed do Auth/Title list */

	$("#inputField").keydown(function(event){ 
		if( event.which === 13 ) {
			$('.dataDump').empty();
			doOpenLibraryAPI(event.which,$('#inputField').val());
			$('#inputField').val('');
			$("#inputField").focus();
		}
//        $("div").html("Key: " + event.which);
//		console.log("Key: " + event.which)
	});

	/********************************************/
	/* Event reset button. Close everything and */
	/* go back to first page */

	$('#resetInputBtn').click( function() {
		event.preventDefault();
		$(".centerText").slideUp('slow',function() {
			$('.partOne').css('display', 'block');			
			$('.partTwo').css('display', 'none');
			$('.dataTitle').css('display', 'none');
			$('.headingLine').css('display', 'none');
			$('.dataDump').css('display', 'none');
			$('.dataDump').empty();
			$('#choiceAuthor').focus();
		});

		$(".centerText").slideDown('slow',function() {		
			$("#choiceAuthor").focus();
		});
	});
}

$(bookSearch);