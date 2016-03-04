(function() {
	angular
		.module('pencilList')
		.controller('PencilEditCtrl', PencilEditCtrl);

	function PencilEditCtrl($rootScope, $stateParams, $uibModalInstance, PencilSvc, MessageSvc) {
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
				.then($uibModalInstance.close)
				.then(saveSuccess)
				.catch(saveFailed);
		}

		function create() {
			return PencilSvc.create({
				name: vm.pencil.name,
				color: vm.pencil.color
			});
		}

		function update() {
			return PencilSvc.update(vm.pencil.id, {
				name: vm.pencil.name,
				color: vm.pencil.color
			});
		}

		function saveSuccess() {
			MessageSvc.success('You have successfully saved the pencil.');
			$rootScope.$broadcast('pencil.updated', vm.pencil);
		}

		function saveFailed() {
			MessageSvc.error('An error occurred while trying to save the pencil. Please try again.');
		}
	}
})();