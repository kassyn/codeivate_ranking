Module('JEDAI.User', function(User) {
	User.fn.initialize = function(attrs) {
		this.$el                  = null;
		this.profile              = null;
		this.name                 = null;
		this.lastRenderPercentage = 0;

		this._assign( attrs );
	};

	User.fn.getCodeivateAPI = function() {
		return new RSVP.Promise( this._requestAjax.bind(this) );
	};

	User.fn._requestAjax = function(resolve, reject) {
		$.ajax({
			url      : 'http://codeivate.com/users/' + this.profile + '.json',
			dataType : 'jsonp',
			success  : $.proxy( this, '_onSuccessAjax', resolve ),
			error    : function(xhr, errorType, error) {
				reject( error );
			}
 		});
	};

	User.fn.getLevel = function() {
		return parseFloat( this.level );
	};

	User.fn.getSanitizeText = function() {
		return this.name.replace( /\s/g, '_' );
	};

	User.fn.renderPercentage = function() {
		var finder     = this.$el.byData( 'percentage' );
		var percentage = this.getPercentageNextLevel();

		finder.width( percentage + '%' );
		this.lastRenderPercentage = percentage;		
	};

	User.fn.getPercentageNextLevel = function() {
		return String( this.level ).replace( /.+\./, '' );		
	};

	User.fn.getLanguagesAvailable = function() {
		var languages  = this.languages;
		var availables = {};

		for ( var attr in languages ) {
			( Math.floor( languages[attr].level ) && ( availables[attr] = languages[attr] ) );
		}
				
		return availables;
	};

	User.fn._onSuccessAjax = function(resolve, data) {
		this._assign( data );
		resolve( this );
	};

	User.fn._assign = function(attrs) {
		$.extend( this, attrs );
	};
});