angular.module('reviewer').controller('placeListCtrl', function(placeListRef, $scope, $firebaseArray) {


	$scope.placeList = $firebaseArray(placeListRef);

	$scope.placeList.$loaded().then(function(placeList) { //what does this do??
	});

	$scope.createPlace = function(name) { //add a new object, and initialize its keys
		$scope.placeList.$add({
			name: name,
			address: '',
			phone: '',
			photoUrl: '',
			totalDishes: 0,
		});
		$scope.newPlaceName = "";
	};

});
