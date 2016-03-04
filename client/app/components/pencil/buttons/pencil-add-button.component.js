(function() {
	let templateString =
		`<button class="btn btn-primary" ui-sref="pencil.new">
			<span class="glyphicon glyphicon-plus"></span> New
		</button>`;

	angular
		.module('pencilButtons')
		.component('pencilAddButton', {
			template: templateString
		});
})();