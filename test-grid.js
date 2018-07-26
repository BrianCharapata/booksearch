function bookSearch() {

	/*****************************************/
	/* Button which sets up an author search */

	$('#choiceAuthor').click( function() {
		let instructText = 'Enter Name of Author';
		let name = 'Author';
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
		let instructText = 'Enter Name of Title';
		let name = 'Title';
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
		$(".groupTwoHide").slideUp('fast', function() {
			$('.instructBox').text(instructText);
		});
		$(".groupOneShow").slideDown('fast', function() {
			$("#choiceAuthor").focus();
		});
	});

	/*************************************************/
	/* Enter button to submit Author or Title search */

	$('#enterBtn').click( function() {
		let instructText = name + ' Listing';
		$(".groupTwoHide").slideUp('fast', function() {
			$('.instructBox').text(instructText);
		});
		$(".groupThreeShow").slideDown('fast', function() {
			$('#nextTenBtn').focus();
		});
	});

	/*************************************************/
	/* Enter button to submit Author or Title search */

	$('#backBtn').click( function() {
		let instructText = name + ' Listing';
		$(".groupThreeHide").slideUp('fast', function() {
			$('.instructBox').text(instructText);
		});
		$(".groupTwoShow").slideDown('fast', function() {
			$("#inputField").focus();
		});
	});

	/********************************************************************/
	/* If the (keyboard) Enter/Return key is pressed do Auth/Title list */

	$("#inputField").keydown(function(event){ 
		let instructText = name + ' Listing';
		$(".groupTwoHide").slideUp('fast', function() {
			$('.instructBox').text(instructText);
		});
		$(".groupThreeShow").slideDown('fast', function() {
			$('#nextTenBtn').focus();
		});
	});

}

$(bookSearch);