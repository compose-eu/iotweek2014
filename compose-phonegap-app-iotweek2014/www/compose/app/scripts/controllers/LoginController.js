'use strict';

angular.module('composeApp').controller('LoginController', 
  [ '$scope', '$location', 'servioticy',
  function( $scope, $location, servioticy ) {
	  $scope.title = 'Login';
	  
	  //Fake login that sets the user name in the servioticy service
	  $scope.login = function(){
		  servioticy.user = $scope.user;
		  $location.path('/');
	  };
  	}
  ]);