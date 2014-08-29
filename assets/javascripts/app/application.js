Module('JEDAI.Application', function(Application) {
	Application.fn.initialize = function(container) {
		var users = [
			{
				profile : 'kassyn',
				email   : 'kassyntec@gmail.com'
			},
			{
				profile : 'guilhermesouza',
				email   : 'guilherme.wd@live.com'
			},
			{
				profile : 'daniloalvess',
				email   : 'danilo.alves@apiki.com'
			}
		];

		//set users for ranking
		JEDAI.Ranking( $( '[data-component-ranking]' ), users ).init();
	};
});