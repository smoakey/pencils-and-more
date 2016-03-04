(function() {
	let templateString =
		`<nav class="navbar navbar-default navbar-fixed-top">
			<div class="container-fluid">
				<div class="navbar-header">
					<a class="navbar-brand" href="#">
						<span class="glyphicon glyphicon-pencil text-info"></span> Pencils and More
					</a>
				</div>
				<div class="collapse navbar-collapse">
					<p class="navbar-text navbar-right">
						Signed in as <a href="" ng-click="header.welcome(header.name)">{{ header.name }}</a>
					</p>
				</div>
			</div>
		</nav>`;

	angular
		.module('header')
		.component('pencilsAndMoreHeader', {
			bindings: {
				name: '@'
			},
			template: templateString,
			controllerAs: 'header'
		});
})();