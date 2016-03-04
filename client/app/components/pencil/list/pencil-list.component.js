(function() {
	angular
		.module('pencilList')
		.component('pencilList', {
			controllerAs: 'list',
			templateUrl: 'components/pencil/list/pencil-list.html',
			controller: PencilListCtrl
		});

	function PencilListCtrl($scope, PencilSvc) {
		let vm = this;

		vm.pencils = [];

		vm.handlePencilVote = handlePencilVote;

		init();

		function init() {
			fetchPencils()
				.catch(failedToLoadPencils)
				.then(calculatePencilVotes)
				.then(setPencilsOnController);
			
			$scope.$on('pencil.updated', updateOrAddPencilInList);
		}

		function fetchPencils() {
			return PencilSvc.getList();
		}

		function failedToLoadPencils() {
			alert('Failed to load List of pencils. Ideally we would attempt to load list another time instead of just alerting.')
		}

		function calculatePencilVotes(pencils) {
			return _.map(pencils, function (pencil) {
				console.log(pencil);
				pencil.currentRating = pencil.votes.up - pencil.votes.down;
				pencil.totalVotes = pencil.votes.up + pencil.votes.down;
				return pencil;
			});
		}

		function setPencilsOnController(pencils) {
			vm.pencils = pencils;
		}

		function updateOrAddPencilInList(event, pencil) {
			var index = _.findIndex(vm.pencils, _.pick(pencil, 'id'));
			if (index !== -1) {
				vm.pencils.splice(index, 1, pencil);
			} else {
				vm.pencils.push(pencil);
			}
			
			vm.pencils = calculatePencilVotes(vm.pencils);
		}

		// put this logic in here. that way were just passing a callback to the 
		// vote button directive and not tightly couple that directive to this one.
		function handlePencilVote(pencil) {
			updateOrAddPencilInList(null, pencil);
		}
	}
})();