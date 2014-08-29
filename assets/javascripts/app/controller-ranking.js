Module("JEDAI.Ranking", function(Ranking) {
	Ranking.fn.initialize = function(container, users) {
		this.container = container;
		this.users     = users;
		this.template  = null;
	};

	Ranking.fn.init = function() {
		this._registerHelpers();
		this._compileTemplate();
		this.getUsersInService();
	};

	Ranking.fn.getUsersInService = function() {
		var promises = this.users.map(function(user) {
			return JEDAI.User( user ).getCodeivateAPI();
		});

		RSVP.all( promises )
		    .then( this._thenPromiseAll.bind(this) )
		    .catch( this._catchPromiseAll.bind(this) )
		;    
	};

	Ranking.fn._thenPromiseAll = function(users) {
		this.users = users.sort(function(a, b) {
			return ( a.getLevel() > b.getLevel() ) ? -1 : 1;
		});
		
		this.container.html( this.template( this.users ) );
	};

	Ranking.fn._catchPromiseAll = function(reason) {

	};

	Ranking.fn._compileTemplate = function() {
		this.template = $( '#template-items-profile' ).compileHandlebars();
	};

	Ranking.fn._registerHelpers = function() {
		Handlebars.registerHelper( 'floor_value', function(value) {
			return Math.floor( value );
		});
	};

	//easy compile template
	$.fn.compileHandlebars = function() {
		return Handlebars.compile( this.html() );
	};
});