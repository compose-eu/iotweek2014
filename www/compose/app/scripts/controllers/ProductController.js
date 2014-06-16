'use strict';

angular.module('composeApp')
    .controller('ProductController', ['$scope', 'scanthngService', '$routeParams', 'servioticy', '$window',
        function ($scope, scanthngService, $routeParams, servioticy, $window) {
            var productId = $routeParams.productId;
            $scope.title = 'Product';
            $scope.showCheckIn = true;

            //Get product info from EVRYTHNG engine            
            var onGetProductInformation = function (data) {
                //Update view info
                $scope.product = data;
                $scope.nf = scanthngService.formatNutritionalFacts(data);
                $scope.soid = data.customFields.soid;
                $scope.$apply();                
            };            
            scanthngService.getProductInformation(productId, onGetProductInformation);
                        
            //Check-in functionality updating Product SO stream
            $scope.checkinProduct = function(){
            	servioticy.checkinProduct($scope.product, function(response){
            		console.log(response);
            		//alert user
            		$window.alert("Product checked-in succcessfully!!");
            		$scope.showCheckIn = false;      
            		$scope.$apply(); 
            	});
            };                      
        }]);