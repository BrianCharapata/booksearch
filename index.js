/***********************************/
/* Pull data from Open Library api */

function doOpenLibraryAPI(rtnKey, searchTerm) {
	let displayName = '';
	const OPENLIBRARY = 'http://openlibrary.org/search.json';
	const query = {
//    q: `${searchTerm}`,
    author: `${searchTerm}`,
    limit: 10
  }

	displayName = 'Searching for: ' + searchTerm;
	$('.dataTitleDisplay').text(`${displayName}`);
	$('.dataTitle').css('display', 'block');

	/* Pull json data from the library */
	$.getJSON(OPENLIBRARY, query, function(data,status) {
		let displayData = '';
		let lineCount = 0;
		let numberOfLines = 20;
			
		$('.dataDump').css('display', 'none');
		console.log(data);
		console.log(data.docs);
		console.log("Status: ", status);

		/* If data pull succeeds then display */
		if( status === 'success') {
			let dataHead = "<tr class='dataHeading'><th>Titles</th></td>";
			$('.dataDump').append(dataHead);

			/* Build table data list */
			data.docs.map(function (item, index) {
				let data = "<tr class='dataRow'><td>" + item.title + "</td></td>";
				$('.dataDump').append(data);
			});

			$('.dataDump').css('display', 'block');
		}
	});
}

/*****************/
/* Main function */

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
		doOpenLibraryAPI(13,$('#inputField').val());
		$('#inputField').val('');
		$("#inputField").focus();
	});

	/********************************************************************/
	/* If the (keyboard) Enter/Return key is pressed do Auth/Title list */

	$("#inputField").keydown(function(event){ 
		if( event.which === 13 ) {
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
			$('#choiceAuthor').focus();
		});

		$(".centerText").slideDown('slow',function() {		
			$("#choiceAuthor").focus();
		});
	});
}

$(bookSearch);