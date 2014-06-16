/*global Evrythng, ScanThng*/
'use strict';

angular.module('composeApp').factory('servioticy',
		[ '$rootScope', function($rootScope) {
			
			var apiKey = "INSERT COMPOSE API KEY HERE";
			var apiURL = "http://api.servioticy.com";
						
			return {
				user : "anonymous",				
				checkinProduct : function (product, callback){		
					var self = this;
					var onSuccess = function(position) {
						var location = position.coords.latitude + ", " + position.coords.longitude;
						var checkinUpdate = {
						     "channels": {
						         "user": {
					                    "current-value": self.user					                
					              },
					              "checkinlocation": {
					                	"current-value": location
					              }
						       },
						       "lastUpdate": position.timestamp
						};
						
	                    var xhr = new XMLHttpRequest();
	                    xhr.open("PUT", apiURL + '/' + product.customFields.soid + "/streams/checkins");
	                    xhr.setRequestHeader("Authorization", apiKey);
	                    xhr.setRequestHeader("Content-Type", "application/json");
	                    xhr.onreadystatechange = function () {
	                        if (this.readyState == 4) {
	                           var response = this.responseText;
	                           callback(JSON.parse(this.responseText));
	                        }
	                    };
	                    
	                    console.log(JSON.stringify(checkinUpdate));
	                    xhr.send(JSON.stringify(checkinUpdate));
					};

					function onError(error) {
						alert('code: '    + error.code    + '\n' +
								'message: ' + error.message + '\n');
					}
					
					navigator.geolocation.getCurrentPosition(onSuccess, onError);						
				}
			};
		} ]);
