angular.module('reviewer').controller('dishCtrl', function(placeRef, dishesRef, singleDishRef, reviewsRef, $scope, $firebaseObject, $firebaseArray) {
	var place = $firebaseObject(placeRef);
	var dish = $firebaseObject(singleDishRef);

	place.$bindTo($scope, 'place');
	dish.$bindTo($scope, 'dish');

	$scope.reviews = $firebaseArray(reviewsRef);

  $scope.createReview = function(newScore, newComments) {
		var myScore = parseInt(newScore);
    $scope.reviews.$add({ //add the new review
			score: myScore,
      comments: newComments
    });
		//reset fields:
		$scope.newReviewScore = '';
		$scope.newReviewComments = '';

		var newAvg = ((dish.totalScore+myScore)/(dish.numReviews+1)); //calculate the new avergae
		var newAvgPct = ((newAvg / 5) *100); // percentage of a 5 star review
		singleDishRef.update({ //update the score for this dish
			totalScore: dish.totalScore+myScore,
			numReviews: dish.numReviews+1,
			avgScore: newAvg,
			avgScorePct: newAvgPct,
		});
	//	singleDishRef.setPriority((1-newAvg));
  };
});
