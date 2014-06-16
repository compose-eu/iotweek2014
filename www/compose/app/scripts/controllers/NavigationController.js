'use strict';

angular.module('composeApp').controller('NavigationController',
		[ '$scope', 'scanthngService', 'servioticy',
		  function( $scope, scanthngService, servioticy) {
			
			//Scan button function
			$scope.scan = function() {
				scanthngService.scan(ScanTypes.BARCODE);
			};

			//if we have some user we change the colour of the image to green
			if (servioticy.user != "anonymous")
				{
					$scope.loggedIn = {
							'background': 'url(/android_asset/www/compose/app/images/center2.png) no-repeat center',
							'background-size' : '70px 70px'
					};		
				}				
			}
		]);