angular.module('reviewer').service('placeService', function(firebaseUrl, Firebase, $stateParams) {

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
	this.getBestDish = function(placeId){ //return the key to the highest rated dish
		var ref = new Firebase(firebaseUrl.url+'/placeList/'+$stateParams.placeId+'/dishes/');
		ref.orderByChild("avgScore").limitToLast(1).on("child_added", function(snapshot) {
			console.log(snapshot.key());
			return snapshot.key();
		});
	};

});
