angular.module('reviewer').controller('dishCtrl', function(placeRef, dishesRef, singleDishRef, reviewsRef, $scope, $firebaseObject, $firebaseArray, placeService) {
	var place = $firebaseObject(placeRef);
	var dish = $firebaseObject(singleDishRef);

	place.$bindTo($scope, 'place');
	dish.$bindTo($scope, 'dish');

	$scope.reviews = $firebaseArray(reviewsRef);

  $scope.createReview = function(newScore, newComments) {
		var myScore = parseInt(newScore);

		///////////// TEMP
		var tempUser = { //this is a placeholder until usernames are implemented
				name: "Clarence Boddicker",
				avatarUrl: '',
		};
		///////////// /TEMP

    $scope.reviews.$add({ //add the new review
			score: myScore,
			scorePct: ((myScore / 5) *100),
			ratingColor: placeService.colorYtoR((myScore / 5) *100),
      comments: newComments,
			user: tempUser,			 ///////////// change this once users are implemented
    });
		//reset fields:
		$scope.newReviewScore = '';
		$scope.newReviewComments = '';

		//update the dish:
		var newAvg = (Math.round(((dish.totalScore+myScore)/(dish.numReviews+1))*100)/100); //calculate the new avergae to two decimals, (round(avg*100))/100 gives us the 2 decimal precision after rounding
		var newAvgPct = ((newAvg / 5) *100); // percentage of a 5 star review
		var newRatingColor = placeService.colorYtoR(newAvgPct); //calculate the new color of the stars based on the pct score, from yellow to red

		//update the score for this dish:
		singleDishRef.update({
			totalScore: dish.totalScore+myScore,
			numReviews: dish.numReviews+1, //we have to do +1 (and +myScore above) here because if we update dish.numReviews elsewhere and then try to assign dish.numReviews here it wont get the updated value back from the server before it runs this part of the code and we'll just get the old value, so we go ahead and just add it here manually
			displayScore: +newAvg.toFixed(2), //truncates uncessary zeros
			avgScore: newAvg,
			avgScorePct: newAvgPct,
			ratingColor: newRatingColor,
		});

		//update the place:
		console.log(place.totalReviews);
		placeRef.update({
			totalReviews: place.totalReviews+1,
		})
  };
});
