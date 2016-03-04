(function() {
	let templateString =
		`<button class="btn btn-sm btn-default" ui-sref="pencil.edit({ id: editButton.pencil.id })">
			<span class="glyphicon glyphicon-pencil"></span> Edit
		</button>`;

	angular
		.module('pencilButtons')
		.component('pencilEditButton', {
			bindings: {
				pencil: '<'
			},
			template: templateString,
			controllerAs: 'editButton'
		});
})();