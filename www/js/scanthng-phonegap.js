'use strict';

var ScanTypes = {
		BARCODE: 'barcode'
};

var ScanThngPhoneGap = function(scanThngConfiguration) {	
	this.scanThngConfiguration = scanThngConfiguration;
	this.scanThng = new ScanThng(scanThngConfiguration);
	this.scanThngService = new ScanThngService(scanThngConfiguration);
	
	this.onBarcodeScanSuccess = this.onBarcodeScanSuccess.bind(this);
	this.onBarcodeScanError = this.onBarcodeScanError.bind(this);
	
	console.log('ScanThngPhoneGap created');
};

ScanThngPhoneGap.prototype.config = function(scanThngConfiguration) {
	this.scanThng.config(scanThngConfiguration);
};

/**
 * Barcode read successfully internal callback
 * @param result 
 * 		{
 *      	text : '12345-mock',	// The code that was scanned.
 *        	format : 'FORMAT_NAME',	// Code format. QR_CODE,
 *        											DATA_MATRIX,
 *        											UPC_E,
 *        											UPC_A,
 *        											EAN_8,
 *        											EAN_13,
 *        											CODE_128,
 *        											CODE_39,s
 *        											CODE_93,
 *        											CODABAR,
 *        											ITF,
 *        											RSS14,
 *        											PDF417,
 *        											RSS_EXPANDED
 *        	cancelled : true/false,	// Was cancelled by the user.
 *    	}
 */
ScanThngPhoneGap.prototype.onBarcodeScanSuccess = function(result){
	var self = this;
	
	if ( result.cancelled === false ) {
		console.log("Barcode read: " + result.format + ":" + result.text );
		
		self.scanThngService.getThngFromBarcode(result.format,result.text);		
	} 
};

/**
 * Barcode read error callback
 * 
 */
ScanThngPhoneGap.prototype.onBarcodeScanError = function (result){
      console.log("Scanning failed: " + result);
      
      self.scanThngConfiguration.errorCb(result);
};

/**
 *  Allows overriding of configuration properties
 * 
 */
ScanThngPhoneGap.prototype.updateConfiguration = function(updatedConfiguration){
	var self = this;
	
	if (self.scanThngConfiguration != undefined){
		for (var property in updatedConfiguration) {
		    if (updatedConfiguration.hasOwnProperty(property)) {
		        self.scanThngConfiguration[property] = updatedConfiguration[property];
            }
	    }
	};
	
	self.scanThngService.configuration = self.scanThngConfiguration;	
};

/**
 * Launches the reader based on the scan type.
 * Barcode only so far.
 * 
 */
ScanThngPhoneGap.prototype.identify = function(scanThngConfiguration) {
	var self = this;	
	
	//update configuration if needed
	if (scanThngConfiguration != undefined)
		self.updateConfiguration(scanThngConfiguration);
	
	switch (scanThngConfiguration.scanType)
	{
		case ScanTypes.BARCODE:
			console.log('Scanning BARCODE...');			
			cordova.plugins.barcodeScanner.scan(self.onBarcodeScanSuccess,self.onBarcodeScanError);
			break;
	}
};