'use strict';

angular.module('composeApp')
    .factory('scanthngService', 
    		['$location', '$rootScope', 
             function($location, $rootScope){

    var evrythng = new Evrythng({
        evrythngApiKey: 'js5ayDXvum8KAbd4Dqu9ViyqFZwZdjZpaex9dieeOMtmT9WWNAhWa9K5RC7DEhJUY9c6TxvaEw4Fxdmx',
        evrythngApiUrl:'http://api-test.evrythng.net'
    });
    
    var scanThng = new ScanThngPhoneGap({
        redirect: false,
        apiKey: 'js5ayDXvum8KAbd4Dqu9ViyqFZwZdjZpaex9dieeOMtmT9WWNAhWa9K5RC7DEhJUY9c6TxvaEw4Fxdmx',
        serviceUrl: 'http://api-test.evrythng.net',
        spinner: { auto: true }
    });

    return {
    	getEvrythngWrapper : function (){
    		return evrythng;
    	},
        scan: function( scanType ){
        	var onSuccess = function onSuccess(data) {
            	console.log("Scan successfull " + JSON.stringify(data) );
                if (data && data.evrythngId) {
                    $location.path('/product/' + data.evrythngId);
                    $rootScope.$apply();
                }
        	};
        	var onFail = function onFail(data) {
            	console.log("Scan error " + JSON.stringify(data) );
            	if (data.status && data.status === 404) {
                    $location.path('/notfound');
                    $rootScope.$apply();
                }
        	};       	
        	scanThng.identify({ 
        						scanType: scanType, 
        						successCb: onSuccess, 
        						errorCb: onFail 
        					});
        },
        // Retrive information about a single product
        getProductInformation: function( productId, successCb ){
            var errorCb = function( data ){
                if ( data.status && ( data.status === 404  || data.status === 400 )){
                    $location.path('/notfound');
                    $rootScope.$apply();
                } else {
                    $location.path('/');
                }
            };
            evrythng.readProduct({ product: productId }, successCb, errorCb );
        },
        // Prepare additional information for rendering the product in the ProductView
        formatNutritionalFacts: function( data ){
            var nutritionalFacts = {};
            try {
                nutritionalFacts = JSON.parse( data.customFields['nutritional facts'] );
            } catch (err) {
                if ( err && err.name !== 'SyntaxError' ){
                    throw err;
                }
            }
            return nutritionalFacts;
        }
    };
}]);
