
let templateString = `<nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="#">
        Pencils and More
      </a>
      <p class="navbar-text navbar-right">Signed in as <a href="#" class="navbar-link">{{header.name}}</a></p>
    </div>
  </div>
</nav>`;

angular
	.module('pencilsAndMore')
	.component('pencilsHeader', {
		bindings: {
			'name' : '@'
		},
		controllerAs: 'header',
		template: templateString
	});
