angular.module('reviewer').service('placeService', function(firebaseUrl, Firebase, $stateParams, $firebaseObject) {

	this.getPlaces = function() {
		return new Firebase(firebaseUrl.url+'/placeList');
	};
	this.getPlace = function(placeId) {
		return new Firebase(firebaseUrl.url+'/placeList/'+placeId);
	};
	this.getDishes = function (placeId) {
    return new Firebase(firebaseUrl.url+'/placeList/'+placeId+'/dishes');
  };
	this.getReviews = function (placeId, dishId) {
    return new Firebase(firebaseUrl.url+'/placeList/'+placeId+'/dishes/'+dishId+'/reviews');
  };
	this.getDishData = function (placeId, dishId){
		  return new Firebase(firebaseUrl.url+'/placeList/'+placeId+'/dishes/'+dishId);
	};

	/// https://www.firebase.com/docs/web/guide/retrieving-data.html
	this.getTopDishesObj = function(placeId, num){ //return an object of the the highest num rated dishs
		var ref = new Firebase(firebaseUrl.url+'/placeList/'+$stateParams.placeId+'/dishes/');
		return $firebaseObject(ref.orderByChild("avgScore").limitToLast(num)); //return the top num dishes by highest avg score
	};

	this.getTopDishesArr = function(obj, num){ //returns an array of the top num dishes
		var results = [];
		obj.orderByChild("avgScore").limitToLast(num).on("value", function(snapshot) {
			snapshot.forEach(function(data) {
			//	console.log(data.key() , data.val());
				results.push({
					data: data.val(), //add the data
					key: data.key(),  //add its own key for linking
				});
			});
		});
		//console.log('results:',results);
		return results.reverse(); //reverses the array so the highest rated dish is [0]
	}

	//////// old
	// this.getTopDishes3 = function(placeId, num){
	// 	var results = [];
	// 	var ref = new Firebase(firebaseUrl.url+'/placeList/'+$stateParams.placeId+'/dishes/');
	// 	ref.orderByChild("avgScore").limitToLast(num).on("value", function(snapshot) {
  // 	snapshot.forEach(function(data) {
  //   	console.log(data.key() , data.val());
	// 		results.push(data.val());
  // 		});
	// 	});
	// 	console.log('results:',results);
	// 	return results;
	// }



	///////  https://calendee.com/2014/09/18/use-loaded-with-firebase-and-angularfire/
	// obj.$loaded(
	// 	function(data) {
	// 		console.log(data === obj); // true
	// 	},
	// 	function(error) {
	// 		console.error("Error:", error);
	// 	}
	// );

});
