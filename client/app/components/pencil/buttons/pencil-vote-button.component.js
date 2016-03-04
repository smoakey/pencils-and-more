(function() {
	let templateString =
		`<button class="btn btn-link" ng-click="voteButton.vote()">
			<span class="glyphicon glyphicon-thumbs-up text-success" ng-if="voteButton.direction === 'up'"></span>
			{{ voteButton.count }}
			<span class="glyphicon glyphicon-thumbs-down text-danger" ng-if="voteButton.direction === 'down'"></span>
		</button>`;

	angular
		.module('pencilButtons')
		.component('pencilVoteButton', {
			bindings: {
				direction: '@',
				pencil: '<',
				count: '<',
				onVoted: '&'
			},
			template: templateString,
			controllerAs: 'voteButton',
			controller: PencilVoteButtonCtrl
		});

	function PencilVoteButtonCtrl(PencilSvc) {
		let vm = this;

		vm.vote = vote;

		function vote() {
			submitVote()
				.then(vm.onVoted());
		}

		function submitVote() {
			return PencilSvc.vote(vm.pencil.id, vm.direction);
		}
	}
})();