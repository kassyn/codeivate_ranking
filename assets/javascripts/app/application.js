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
			},
			{
				profile : 'henrichm',
				email   : 'henrich@apiki.com'
			},
			{
				profile : 'luanramos',
				email   : 'luan@apiki.com'
			},
			{
				profile : 'Emanuel-Souza',
				email   : 'emanuel.inacios@gmail.com'
			},
			{
				profile : 'Jhowl',
				email   : 'jhonatan.souza@apiki.com'
			},
			{
				profile : 'arisenna',
				email   : 'arilton@apiki.com'
			},
			{
				profile : 'leandrovieira',
				email   : 'leandro@apiki.com'
			},
			{
				profile : 'mesaque',
				email   : 'mesaque.silva@apiki.com'
			},
			{
				profile : 'danielantunes',
				email   : 'daniel.antunes.rocha@gmail.com'
			}
		];

		//set users for ranking
		JEDAI.Ranking( $( '[data-component-ranking]' ), users ).init();
	};
});