'use strict';

var ScanThngService = function(configuration) {
	this.configuration = configuration;	
	
	console.log('ScanThngService created');
};

/**
 * Returns redirection information from the barcode
 * @param format type of barcode 
 * @param barcode value of the barcode
 */
ScanThngService.prototype.getThngFromBarcode = function(format, barcode){
	var self = this;
	
	//Call scanthng service to get the product information
	var request = Zepto.ajax({
        type: 'POST',
        url: self.configuration.serviceUrl + "/scan/barcode",
        data: JSON.stringify({ format: format, data: barcode }),
        headers: {"Authorization": self.configuration.apiKey, "Content-Type": "application/json"},
        contentType: 'application/json',        	
        timeout: 10000,
        dataType : 'json',
    });		
		
	request.done( self.configuration.successCb );		
	request.fail( self.configuration.errorCb );	
};