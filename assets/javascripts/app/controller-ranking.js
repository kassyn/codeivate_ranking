Module("JEDAI.Ranking", function(Ranking) {
	Ranking.TIME_RELOAD = ( 1 * 60 * 1000 );

	Ranking.fn.initialize = function(container, users) {
		this.container = container;
		this.users     = users;
		this.template  = null;
		this.interval  = null;
	};

	Ranking.fn.init = function() {
		this._registerHelpers();
		this._compileTemplate();
		this.getUsersInService();
		this.setTimeReload();
	};

	Ranking.fn.setTimeReload = function() {
		this.interval = setInterval(
			(function() {
				this.getUsersInService();
				console.log( 'reload page #' + this.interval );
			}).bind(this)
		    , Ranking.TIME_RELOAD
		);
	};

	Ranking.fn.clearTimeReload = function() {
		clearInterval( this.interval );
		this.interval = null;
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
		
		this.render();		
	};

	Ranking.fn.render = function() {
		this.container.html( this.template( this.users ) );
		this.parseElementEachUsers();
		this.callMethodInUsers( 'renderPercentage' );
	};

	Ranking.fn.callMethodInUsers = function(method) {
		this.users.forEach( Ranking.call( method ) );
	};

	Ranking.fn.parseElementEachUsers = function() {
		this.users.forEach(function(user) {
			user.$el = this._getElementUserByName( user.getSanitizeText() );
		}, this);
	};

	Ranking.fn._getElementUserByName = function(name) {
		return this.container.find( '[data-component-profile=' + name + ']' );
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

	Ranking.call = function(method) {
		return function(user) {
			user[method].call(user);
		};
	};

	//easy compile template
	$.fn.compileHandlebars = function() {
		return Handlebars.compile( this.html() );
	};
});