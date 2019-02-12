angular.module('listings').controller('ListingsController', ['$scope', 'Listings', 
  function($scope, Listings) {
    /* Get all the listings, then bind it to the scope */
    Listings.getAll().then(function(response) {
      $scope.listings = response.data;
    }, function(error) {
      console.log('Unable to retrieve listings:', error);
    });

    $scope.detailedInfo = undefined;

    $scope.addListing = function() {

	  Listings.create({code: $scope.newListing.code, name: $scope.newListing.name, address: $scope.newListing.address}).then(function(response){
    	Listings.getAll().then(function(response) {
      		$scope.listings = response.data;
    	}, function(error) {
      		console.log('Unable to retrieve listings:', error);
    		});
	  	});

	  /**TODO 
	  *Save the article using the Listings factory. If the object is successfully 
	  saved redirect back to the list page. Otherwise, display the error
	 */
    };

    $scope.deleteListing = function(id) {

      Listings.delete(id).then(function(response){
    	Listings.getAll().then(function(response) {
      		$scope.listings = response.data;
    	}, function(error) {
      		console.log('Unable to retrieve listings:', error);
    		});      	
      });

	   /**TODO
        Delete the article using the Listings factory. If the removal is successful, 
		navigate back to 'listing.list'. Otherwise, display the error. 
       */
    };

    $scope.showDetails = function(index) {
      console.log($scope.listings[index]._id);
      $scope.detailedInfo = $scope.listings[index];
    };
  }
]);