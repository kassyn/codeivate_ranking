;(function($) {
	$.fn.byData = function(attr) {
		return this.find( "[data-" + attr + "]" );
	};

	$.fn.compileHandlebars = function() {
		return Handlebars.compile( this.html() );
	};
})(Zepto);