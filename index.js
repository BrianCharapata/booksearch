function bookSearch() {

	/*****************************************/
	/* Button which sets up an author search */

	$('#choiceAuthor').click( function() {
		let instructText = 'Enter Name of Author';
//		event.preventDefault();
//		$(".centerText").slideUp('slow',function() {
			$('.btnPushOneHide').css('display', 'none');			
			$('.btnPushOneShow').css('display', 'block');
			$('.instructBox').text(instructText);
			$("#inputField").focus();
//		});

//		$(".centerText").slideDown('slow',function() {
//			$("#inputField").focus();
//			$('.partTwo').css('display', 'block');
//		});
	});
}

$(bookSearch);