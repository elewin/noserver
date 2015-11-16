angular.module('reviewer').service('dishService', function(firebaseUrl, Firebase, $stateParams) {


	this.getDishAvgScore = function (singleDishRef){

			var results = {
				n: 0, //number of reviews
				score: 0 //avg score
			};
			var sum = 0;
			var n = 0;

			var scoresRef = new Firebase(firebaseUrl.url+'/placeList/'+$stateParams.placeId+'/dishes/'+$stateParams.dishId+'/reviews')
	    scoresRef.once("value", function(allScoresSnapshot) {
	      allScoresSnapshot.forEach(function(scoreSnapshot) {
	        // Will be called with a messageSnapshot for each child under the /reviews/ node
	        //var key = scoreSnapshot.key();  // e.g. "-JqpIO567aKezufthrn8"
	        var score = scoreSnapshot.child("score").val();  // e.g. "5"
					console.log('score:', score);
					sum += parseInt(score);
					n++;
	      });
				console.log('!!',sum, n);
				console.log(sum/n);
				//return (sum/n);


	    });

			results.n = n;
			results.score = (sum/n);
			console.log('from service:',results);
			return results;
	};
});
