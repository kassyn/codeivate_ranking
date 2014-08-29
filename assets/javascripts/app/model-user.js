Module('JEDAI.User', function(User) {
	User.fn.initialize = function(attrs) {
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
		return parseInt( this.level );
	};

	User.fn._onSuccessAjax = function(resolve, data) {
		this._assign( data );
		resolve( this );
	};

	User.fn._assign = function(attrs) {
		$.extend( this, attrs );
	};
});