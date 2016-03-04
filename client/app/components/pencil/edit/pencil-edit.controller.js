(function() {
	angular
		.module('pencilList')
		.controller('PencilEditCtrl', PencilEditCtrl);

	function PencilEditCtrl($rootScope, $stateParams, $state, $uibModalInstance, PencilSvc) {
		var vm = this;

		vm.pencil   = {};
		vm.saveFunc = 'create';
		vm.title    = 'Create Pencil';

		vm.save   = save;
		vm.create = create;
		vm.update = update;

		init();

		function init() {
			if ($stateParams.id) {
				vm.saveFunc = 'update';
				vm.title    = 'Update Pencil';

				getPencil($stateParams.id)
					.then(setOnController);
			}
		}

		function getPencil(id) {
			return PencilSvc.getOne(id);
		}

		function setOnController(pencil) {
			vm.pencil = pencil;
		}

		function save() {
			return vm[vm.saveFunc]()
				.then(saveSuccess)
				.then($uibModalInstance.close)
				.then(goToListing)
				.catch(saveFailed);
		}

		function create() {
			return PencilSvc.create({
				name: vm.pencil.name
			});
		}

		function update() {
			return PencilSvc.update(vm.pencil.id, {
				name: vm.pencil.name
			});
		}

		function goToListing() {
			return $state.go('^');
		}

		function saveSuccess(pencil) {
			$rootScope.$broadcast('pencil.updated', pencil);
		}

		function saveFailed() {
			alert('An error occured while trying to save the pencil. Please try again.');
		}
	}
})();