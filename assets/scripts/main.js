$(document).ready(function(){
	$(".menu-button").click(function(){
		$("nav").slideToggle();
	});

	 $('pre code').each(function(i, e) {hljs.highlightBlock(e)});
});