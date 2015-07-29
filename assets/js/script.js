$(document).ready(function(){
	$(".button-collapse").sideNav();
	$('.collapsible').collapsible();

	$(".book-list tr td:not(:has(button))").click(function(){
		document.location = "/book";
	})
})