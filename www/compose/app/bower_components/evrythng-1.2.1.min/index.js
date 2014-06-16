/*!
 * Client-side JavaScript library to access Evrythng API v1.2.1
 * https://github.com/evrythng/evrythng-java-sdk
 *
 * Copyright [2014] [EVRYTHNG Ltd. London / Zurich]
 *
 * Released under the http://www.apache.org/licenses/LICENSE-2.0
 * https://github.com/evrythng/evrythng-java-sdk/blob/master/LICENSE.txt
 *
 */
;
Evrythng = function(a) {
	this.options = {
		evrythngApiCorsUrl : "https://api.evrythng.com",
		evrythngApiJsonpUrl : "https://js-api.evrythng.com"
	};
	if (typeof a === "object") {
		for ( var b in a) {
			this.options[b] = a[b]
		}
	}
	if (this.options.evrythngApiUrl) {
		if (this.options.evrythngApiUrl.indexOf("//js-api") !== -1) {
			this.options.evrythngApiJsonpUrl = this.options.evrythngApiUrl;
			this.options.evrythngApiCorsUrl = this.options.evrythngApiUrl
					.replace("//js-api", "//api")
		} else {
			this.options.evrythngApiCorsUrl = this.options.evrythngApiUrl;
			this.options.evrythngApiJsonpUrl = this.options.evrythngApiUrl
					.replace("//api", "//js-api")
		}
	}
};
Evrythng.prototype.version = "1.2.1";
Evrythng.prototype.search = function(c, e, b) {
	var a = this, d = {
		url : "/search",
		params : c.params || {}
	};
	if (a.options.evrythngAppId) {
		d.params.app = a.options.evrythngAppId
	}
	return a.request(d, e, b)
};
Evrythng.prototype.checkin = function(d, f, c) {
	var b = this, e = {
		url : "/actions/checkins",
		params : d.params || {},
		data : {
			timestamp : new Date().getTime(),
			type : "checkins",
			tags : d.tags,
			location : {
				latitude : d.defaultLocation ? d.defaultLocation.latitude
						: null,
				longitude : d.defaultLocation ? d.defaultLocation.longitude
						: null
			}
		},
		method : "post",
		evrythngApiKey : d.evrythngApiKey
	}, a = function() {
		if (typeof e.data.location.latitude === "number"
				&& typeof e.data.location.longitude === "number") {
			e.data.locationSource = "sensor"
		}
		b.request(e, function(g) {
			if (typeof b.options.loadingCallback === "function") {
				b.options.loadingCallback.call(b, false)
			}
			if (typeof f === "function") {
				f.call(b, g)
			}
		}, c)
	};
	if (d.thng) {
		e.data.thng = d.thng
	} else {
		if (d.product) {
			e.data.product = d.product
		}
	}
	if (d.createThng) {
		e.params.createThng = d.createThng
	}
	if (typeof this.options.loadingCallback === "function") {
		this.options.loadingCallback.call(this, true)
	}
	if (navigator.geolocation && !this.options.disableGeolocation) {
		navigator.geolocation.getCurrentPosition(function(g) {
			e.data.location.latitude = g.coords.latitude;
			e.data.location.longitude = g.coords.longitude;
			a()
		}, function(g) {
			a()
		})
	} else {
		a()
	}
};
Evrythng.prototype.scan = function(c, f, b) {
	var a = this, e = {
		url : "/actions/scans",
		params : c.params || {},
		data : {
			thng : c.thng,
			timestamp : new Date().getTime(),
			type : "scans",
			location : {
				latitude : c.defaultLocation ? c.defaultLocation.latitude
						: null,
				longitude : c.defaultLocation ? c.defaultLocation.longitude
						: null
			},
			locationSource : "sensor",
			customFields : c.customFields
		},
		method : "post",
		evrythngApiKey : c.evrythngApiKey
	}, d = function() {
		a.request(e, function(g) {
			if (typeof a.options.loadingCallback === "function") {
				a.options.loadingCallback.call(a, false)
			}
			if (typeof f === "function") {
				f.call(a, g)
			}
		}, b)
	};
	if (typeof this.options.loadingCallback === "function") {
		this.options.loadingCallback.call(this, true)
	}
	if (navigator.geolocation && !this.options.disableGeolocation) {
		navigator.geolocation.getCurrentPosition(function(g) {
			e.data.location.latitude = g.coords.latitude;
			e.data.location.longitude = g.coords.longitude;
			d()
		}, function(g) {
			d()
		})
	} else {
		d()
	}
};
Evrythng.prototype.share = function(c, f, b) {
	var a = this, e = {
		url : "/actions/shares",
		params : c.params || {},
		data : {
			type : "shares",
			location : {
				latitude : c.defaultLocation ? c.defaultLocation.latitude
						: null,
				longitude : c.defaultLocation ? c.defaultLocation.longitude
						: null
			},
			locationSource : "sensor"
		},
		method : "post",
		evrythngApiKey : c.evrythngApiKey
	}, d = function() {
		a.request(e, function(g) {
			if (typeof a.options.loadingCallback === "function") {
				a.options.loadingCallback.call(a, false)
			}
			if (typeof f === "function") {
				f.call(a, g)
			}
		}, b)
	};
	if (typeof this.options.loadingCallback === "function") {
		this.options.loadingCallback.call(this, true)
	}
	if (navigator.geolocation && !this.options.disableGeolocation) {
		navigator.geolocation.getCurrentPosition(function(g) {
			e.data.location.latitude = g.coords.latitude;
			e.data.location.longitude = g.coords.longitude;
			d()
		}, function(g) {
			d()
		})
	} else {
		d()
	}
};
Evrythng.prototype.createApplication = function(c, d, b) {
	var a = this;
	return a.request({
		url : a.buildUrl("/applications"),
		params : c.params || {},
		method : "post",
		data : c.data
	}, d, b)
};
Evrythng.prototype.readApplication = function(c, d, b) {
	var a = this;
	return a.request({
		url : c.application ? a.buildUrl("/applications/%s", c.application)
				: "/applications",
		params : c.params || {}
	}, d, b)
};
Evrythng.prototype.updateApplication = function(c, d, b) {
	var a = this;
	return a.request({
		url : a.buildUrl("/applications/%s", c.application),
		params : c.params || {},
		method : "put",
		data : c.data
	}, d, b)
};
Evrythng.prototype.deleteApplication = function(c, d, b) {
	var a = this;
	return a.request({
		url : a.buildUrl("/applications/%s", c.application),
		params : c.params || {},
		method : "delete"
	}, d, b)
};
Evrythng.prototype.createProduct = function(c, e, b) {
	var a = this, d = {
		url : "/products",
		params : c.params || {},
		method : "post",
		data : c.data
	};
	if (a.options.evrythngAppId) {
		d.params.app = a.options.evrythngAppId
	}
	return a.request(d, e, b)
};
Evrythng.prototype.readProduct = function(c, e, b) {
	var a = this, d = {
		url : c.product ? a.buildUrl("/products/%s", c.product) : "/products",
		params : c.params || {}
	};
	if (a.options.evrythngAppId) {
		d.params.app = a.options.evrythngAppId
	}
	return a.request(d, e, b)
};
Evrythng.prototype.updateProduct = function(c, e, b) {
	var a = this, d = {
		url : a.buildUrl("/products/%s", c.product),
		params : c.params || {},
		method : "put",
		data : c.data
	};
	if (a.options.evrythngAppId) {
		d.params.app = a.options.evrythngAppId
	}
	return a.request(d, e, b)
};
Evrythng.prototype.deleteProduct = function(c, e, b) {
	var a = this, d = {
		url : a.buildUrl("/products/%s", c.product),
		params : c.params || {},
		method : "delete"
	};
	if (a.options.evrythngAppId) {
		d.params.app = a.options.evrythngAppId
	}
	return a.request(d, e, b)
};
Evrythng.prototype.createProductProperty = function(c, d, b) {
	var a = this;
	return a.request({
		url : a.buildUrl("/products/%s/properties", c.product),
		params : c.params || {},
		method : "post",
		data : c.data
	}, d, b)
};
Evrythng.prototype.readProductProperty = function(c, d, b) {
	var a = this;
	return a.request({
		url : c.property ? a.buildUrl("/products/%s/properties/%s", c.product,
				c.property) : a.buildUrl("/products/%s/properties", c.product),
		params : c.params || {}
	}, d, b)
};
Evrythng.prototype.updateProductProperty = function(c, d, b) {
	var a = this;
	return a.request({
		url : a.buildUrl("/products/%s/properties", c.product),
		params : c.params || {},
		method : "put",
		data : c.data
	}, d, b)
};
Evrythng.prototype.deleteProductProperty = function(c, d, b) {
	var a = this;
	return a.request({
		url : a.buildUrl("/products/%s/properties/%s", c.product, c.property),
		params : c.params || {},
		method : "delete"
	}, d, b)
};
Evrythng.prototype.createProductRedirector = function(c, e, b) {
	var a = this;
	var d = {
		url : a.buildUrl("/products/%s/redirector", c.product),
		params : c.params || {},
		method : "post",
		data : c.data
	};
	if (a.options.evrythngAppId) {
		d.params.app = a.options.evrythngAppId
	}
	return a.request(d, e, b)
};
Evrythng.prototype.readProductRedirector = function(c, e, b) {
	var a = this;
	var d = {
		url : a.buildUrl("/products/%s/redirector", c.product),
		params : c.params || {}
	};
	if (a.options.evrythngAppId) {
		d.params.app = a.options.evrythngAppId
	}
	return a.request(d, e, b)
};
Evrythng.prototype.updateProductRedirector = function(c, e, b) {
	var a = this;
	var d = {
		url : a.buildUrl("/products/%s/redirector", c.product),
		params : c.params || {},
		method : "put",
		data : c.data
	};
	if (a.options.evrythngAppId) {
		d.params.app = a.options.evrythngAppId
	}
	return a.request(d, e, b)
};
Evrythng.prototype.deleteProductRedirector = function(c, e, b) {
	var a = this;
	var d = {
		url : a.buildUrl("/products/%s/redirector", c.product),
		params : c.params || {},
		method : "delete"
	};
	if (a.options.evrythngAppId) {
		d.params.app = a.options.evrythngAppId
	}
	return a.request(d, e, b)
};
Evrythng.prototype.createThng = function(c, e, b) {
	var a = this;
	var d = {
		url : a.buildUrl("/thngs"),
		params : c.params || {},
		method : "post",
		data : c.data
	};
	if (a.options.evrythngAppId) {
		d.params.app = a.options.evrythngAppId
	}
	return a.request(d, e, b)
};
Evrythng.prototype.readThng = function(c, e, b) {
	var a = this;
	var d = {
		url : c.thng ? a.buildUrl("/thngs/%s", c.thng) : "/thngs",
		params : c.params || {}
	};
	if (a.options.evrythngAppId) {
		d.params.app = a.options.evrythngAppId
	}
	return a.request(d, e, b)
};
Evrythng.prototype.updateThng = function(c, e, b) {
	var a = this;
	var d = {
		url : a.buildUrl("/thngs/%s", c.thng),
		params : c.params || {},
		method : "put",
		data : c.data
	};
	if (a.options.evrythngAppId) {
		d.params.app = a.options.evrythngAppId
	}
	return a.request(d, e, b)
};
Evrythng.prototype.deleteThng = function(c, e, b) {
	var a = this;
	var d = {
		url : a.buildUrl("/thngs/%s", c.thng),
		params : c.params || {},
		method : "delete"
	};
	if (a.options.evrythngAppId) {
		d.params.app = a.options.evrythngAppId
	}
	return a.request(d, e, b)
};
Evrythng.prototype.createThngProperty = function(c, d, b) {
	var a = this;
	return a.request({
		url : a.buildUrl("/thngs/%s/properties", c.thng),
		params : c.params || {},
		method : "post",
		data : c.data
	}, d, b)
};
Evrythng.prototype.readThngProperty = function(c, d, b) {
	var a = this;
	return a.request({
		url : c.property ? a.buildUrl("/thngs/%s/properties/%s", c.thng,
				c.property) : a.buildUrl("/thngs/%s/properties", c.thng),
		params : c.params || {}
	}, d, b)
};
Evrythng.prototype.updateThngProperty = function(c, d, b) {
	var a = this;
	return a.request({
		url : a.buildUrl("/thngs/%s/properties", c.thng),
		params : c.params || {},
		method : "put",
		data : c.data
	}, d, b)
};
Evrythng.prototype.deleteThngProperty = function(c, d, b) {
	var a = this;
	return a.request({
		url : a.buildUrl("/thngs/%s/properties/%s", c.thng, c.property),
		params : c.params || {},
		method : "delete"
	}, d, b)
};
Evrythng.prototype.createThngLocation = function(c, d, b) {
	var a = this;
	return a.request({
		url : a.buildUrl("/thngs/%s/location", c.thng),
		params : c.params || {},
		data : c.data,
		method : "post"
	}, d, b)
};
Evrythng.prototype.readThngLocation = function(c, d, b) {
	var a = this;
	return a.request({
		url : a.buildUrl("/thngs/%s/location", c.thng),
		params : c.params || {}
	}, d, b)
};
Evrythng.prototype.updateThngLocation = function(c, d, b) {
	var a = this;
	return a.request({
		url : a.buildUrl("/thngs/%s/location", c.thng),
		params : c.params || {},
		data : c.data,
		method : "put"
	}, d, b)
};
Evrythng.prototype.deleteThngLocation = function(c, d, b) {
	var a = this;
	return a.request({
		url : a.buildUrl("/thngs/%s/location", c.thng),
		params : c.params || {},
		method : "delete"
	}, d, b)
};
Evrythng.prototype.createThngRedirector = function(c, d, b) {
	var a = this;
	return a.request({
		url : a.buildUrl("/thngs/%s/redirector", c.thng),
		params : c.params || {},
		method : "post",
		data : c.data
	}, d, b)
};
Evrythng.prototype.readThngRedirector = function(c, d, b) {
	var a = this;
	return a.request({
		url : a.buildUrl("/thngs/%s/redirector", c.thng),
		params : c.params || {}
	}, d, b)
};
Evrythng.prototype.updateThngRedirector = function(c, d, b) {
	var a = this;
	return a.request({
		url : a.buildUrl("/thngs/%s/redirector", c.thng),
		params : c.params || {},
		method : "put",
		data : c.data
	}, d, b)
};
Evrythng.prototype.deleteThngRedirector = function(c, d, b) {
	var a = this;
	return a.request({
		url : a.buildUrl("/thngs/%s/redirector", c.thng),
		params : c.params || {},
		method : "delete"
	}, d, b)
};
Evrythng.prototype.readThngRedirectorQr = function(c, d, b) {
	var a = this;
	return a.request({
		url : a.buildUrl("/thngs/%s/redirector/qr", c.thng),
		params : c.params || {}
	}, d, b)
};
Evrythng.prototype.createCollection = function(c, e, b) {
	var a = this, d = {
		url : "/collections",
		params : c.params || {},
		data : c.data,
		method : "post"
	};
	if (a.options.evrythngAppId) {
		d.params.app = a.options.evrythngAppId
	}
	return a.request(d, e, b)
};
Evrythng.prototype.readCollection = function(c, e, b) {
	var a = this, d = {
		url : c.collection ? a.buildUrl("/collections/%s", c.collection)
				: "/collections",
		params : c.params || {}
	};
	if (a.options.evrythngAppId) {
		d.params.app = a.options.evrythngAppId
	}
	return a.request(d, e, b)
};
Evrythng.prototype.updateCollection = function(c, e, b) {
	var a = this, d = {
		url : a.buildUrl("/collections/%s", c.collection),
		params : c.params || {},
		data : c.data,
		method : "put"
	};
	if (a.options.evrythngAppId) {
		d.params.app = a.options.evrythngAppId
	}
	return a.request(d, e, b)
};
Evrythng.prototype.deleteCollection = function(c, d, b) {
	var a = this;
	return a.request({
		url : c.collection ? a.buildUrl("/collections/%s", c.collection)
				: "/collections",
		params : c.params || {},
		method : "delete"
	}, d, b)
};
Evrythng.prototype.createCollectionThng = function(c, d, b) {
	var a = this;
	return a.request({
		url : a.buildUrl("/collections/%s/thngs", c.collection),
		params : c.params || {},
		data : c.data,
		method : "put"
	}, d, b)
};
Evrythng.prototype.readCollectionThng = function(c, d, b) {
	var a = this;
	return a.request({
		url : a.buildUrl("/collections/%s/thngs", c.collection),
		params : c.params || {}
	}, d, b)
};
Evrythng.prototype.updateCollectionThngProperty = function(c, d, b) {
	var a = this;
	return a.request({
		url : a.buildUrl("/collections/%s/thngs/%s/properties", c.collection,
				c.thng),
		params : c.params || {},
		data : c.data,
		method : "put"
	}, d, b)
};
Evrythng.prototype.updateCollectionThngLocation = function(c, d, b) {
	var a = this;
	return a.request({
		url : a.buildUrl("/collections/%s/thngs/%s/location", c.collection,
				c.thng),
		params : c.params || {},
		data : c.data,
		method : "put"
	}, d, b)
};
Evrythng.prototype.deleteCollectionThng = function(c, d, b) {
	var a = this;
	return a.request({
		url : c.thng ? a.buildUrl("/collections/%s/thngs/%s", c.collection,
				c.thng) : a.buildUrl("/collections/%s/thngs", c.collection),
		params : c.params || {},
		method : "delete"
	}, d, b)
};
Evrythng.prototype.readAnalytics = function(c, d, b) {
	var a = this;
	return a.request({
		url : a.buildUrl("/analytics/query/%s", c.kpi),
		params : c.params || {}
	}, d, b)
};
Evrythng.prototype.createUser = function(c, e, b) {
	var a = this, d = {
		url : "/users",
		params : c.params || {},
		data : c.data,
		method : "post"
	};
	if (a.options.evrythngAppId) {
		d.params.app = a.options.evrythngAppId
	}
	return a.request(d, e, b)
};
Evrythng.prototype.readUser = function(c, e, b) {
	var a = this, d = {
		url : c.user ? a.buildUrl("/users/%s", c.user) : "/users",
		params : c.params || {}
	};
	if (a.options.evrythngAppId) {
		d.params.app = a.options.evrythngAppId
	}
	return a.request(d, e, b)
};
Evrythng.prototype.updateUser = function(c, e, b) {
	var a = this, d = {
		url : a.buildUrl("/users/%s", c.user),
		params : c.params || {},
		data : c.data,
		method : "put"
	};
	if (a.options.evrythngAppId) {
		d.params.app = a.options.evrythngAppId
	}
	return a.request(d, e, b)
};
Evrythng.prototype.deleteUser = function(c, e, b) {
	var a = this, d = {
		url : a.buildUrl("/users/%s", c.user),
		params : c.params || {},
		method : "delete"
	};
	if (a.options.evrythngAppId) {
		d.params.app = a.options.evrythngAppId
	}
	return a.request(d, e, b)
};
Evrythng.prototype.readUserStatus = function(c, e, b) {
	var a = this, d = {
		url : a.buildUrl("/users/%s/status", c.user),
		params : c.params || {}
	};
	return a.request(d, e, b)
};
Evrythng.prototype.updateUserStatus = function(c, e, b) {
	var a = this, d = {
		url : a.buildUrl("/users/%s/status", c.user),
		params : c.params || {},
		data : c.data,
		method : "put"
	};
	return a.request(d, e, b)
};
Evrythng.prototype.createLoyaltyTransaction = function(c, e, b) {
	var a = this, d = {
		url : "/loyalty/transactions",
		params : c.params || {},
		data : c.data,
		method : "post"
	};
	if (a.options.evrythngAppId) {
		d.params.app = a.options.evrythngAppId
	}
	return a.request(d, e, b)
};
Evrythng.prototype.createRedemption = function(c, e, b) {
	var a = this, d = {
		url : a.buildUrl("/loyalty/%s/redemptions", c.user),
		params : c.params || {},
		data : c.data,
		method : "post"
	};
	if (a.options.evrythngAppId) {
		d.params.app = a.options.evrythngAppId
	}
	return a.request(d, e, b)
};
Evrythng.prototype.readLoyaltyStatus = function(c, d, b) {
	var a = this;
	return a.request({
		url : a.buildUrl("/loyalty/%s/status", c.user),
		params : c.params || {}
	}, d, b)
};
Evrythng.prototype.readLoyaltyTransactions = function(c, e, b) {
	var a = this, d = {
		url : c.user ? a.buildUrl("/loyalty/%s/transactions", c.user)
				: "/loyalty/transactions",
		params : c.params || {}
	};
	if (a.options.evrythngAppId) {
		d.params.app = a.options.evrythngAppId
	}
	return a.request(d, e, b)
};
Evrythng.prototype.createActionType = function(c, d, b) {
	var a = this;
	return a.request({
		url : "/actions",
		params : c.params || {},
		data : c.data,
		method : "post"
	}, d, b)
};
Evrythng.prototype.readActionTypes = function(c, d, b) {
	var a = this;
	return a.request({
		url : "/actions",
		params : c.params || {}
	}, d, b)
};
Evrythng.prototype.createAction = function(c, d, b) {
	var a = this;
	return a.request({
		url : a.buildUrl("/actions/%s", c.type),
		params : c.params || {},
		data : c.data,
		method : "post"
	}, d, b)
};
Evrythng.prototype.readAction = function(c, d, b) {
	var a = this;
	return a.request({
		url : c.action ? a.buildUrl("/actions/%s/%s", c.type, c.action) : a
				.buildUrl("/actions/%s", c.type),
		params : c.params || {}
	}, d, b)
};
Evrythng.prototype.deleteAction = function(c, d, b) {
	var a = this;
	return a.request({
		url : c.action ? a.buildUrl("/actions/%s/%s", c.type, c.action) : a
				.buildUrl("/actions/%s", c.type),
		params : c.params || {},
		method : "delete"
	}, d, b)
};
Evrythng.prototype.createCheckin = function(c, d, b) {
	var a = this;
	return a.createAction({
		type : "checkin",
		params : c.params || {},
		data : c.data
	}, d, b)
};
Evrythng.prototype.readCheckin = function(c, d, b) {
	var a = this;
	return a.readAction({
		type : "checkin",
		action : c.checkin,
		params : c.params || {}
	}, d, b)
};
Evrythng.prototype.deleteCheckin = function(c, d, b) {
	var a = this;
	return a.deleteAction({
		type : "checkin",
		action : c.checkin,
		params : c.params || {}
	}, d, b)
};
Evrythng.prototype.createScan = function(c, d, b) {
	var a = this;
	return a.createAction({
		type : "scan",
		params : c.params || {},
		data : c.data
	}, d, b)
};
Evrythng.prototype.readScan = function(c, d, b) {
	var a = this;
	return a.readAction({
		type : "scan",
		action : c.scan,
		params : c.params || {}
	}, d, b)
};
Evrythng.prototype.deleteScan = function(c, d, b) {
	var a = this;
	return a.deleteAction({
		type : "scan",
		action : c.scan,
		params : c.params || {}
	}, d, b)
};
Evrythng.prototype.createShare = function(c, d, b) {
	var a = this;
	return a.createAction({
		type : "share",
		params : c.params || {},
		data : c.data
	}, d, b)
};
Evrythng.prototype.readShare = function(c, d, b) {
	var a = this;
	return a.readAction({
		type : "share",
		action : c.share,
		params : c.params || {}
	}, d, b)
};
Evrythng.prototype.deleteShare = function(c, d, b) {
	var a = this;
	return a.deleteAction({
		type : "share",
		action : c.share,
		params : c.params || {}
	}, d, b)
};
Evrythng.prototype.createPlace = function(c, d, b) {
	var a = this;
	return a.request({
		url : a.buildUrl("/places"),
		params : c.params || {},
		data : c.data,
		method : "post"
	}, d, b)
};
Evrythng.prototype.readPlace = function(c, d, b) {
	var a = this;
	return a.request({
		url : c.place ? a.buildUrl("/places/%s", c.place) : "/places",
		params : c.params || {}
	}, d, b)
};
Evrythng.prototype.updatePlace = function(c, d, b) {
	var a = this;
	return a.request({
		url : a.buildUrl("/places/%s", c.place),
		params : c.params || {},
		data : c.data,
		method : "put"
	}, d, b)
};
Evrythng.prototype.deletePlace = function(c, d, b) {
	var a = this;
	return a.request({
		url : a.buildUrl("/places/%s", c.place),
		params : c.params || {},
		method : "delete"
	}, d, b)
};
Evrythng.prototype.createMultimedia = function(c, e, b) {
	var a = this, d = {
		url : "/contents/multimedia",
		params : c.params || {},
		data : c.data,
		method : "post",
		evrythngApiKey : c.evrythngApiKey
	};
	if (a.options.evrythngAppId) {
		d.params.app = a.options.evrythngAppId
	}
	return a.request(d, e, b)
};
Evrythng.prototype.readMultimedia = function(c, e, b) {
	var a = this, d = {
		url : c.multimedia ? a
				.buildUrl("/contents/multimedia/%s", c.multimedia)
				: "/contents/multimedia",
		params : c.params || {},
		evrythngApiKey : c.evrythngApiKey
	};
	if (a.options.evrythngAppId) {
		d.params.app = a.options.evrythngAppId
	}
	return a.request(d, e, b)
};
Evrythng.prototype.updateMultimedia = function(c, e, b) {
	var a = this, d = {
		url : a.buildUrl("/contents/multimedia/%s", c.multimedia),
		params : c.params || {},
		data : c.data,
		method : "put",
		evrythngApiKey : c.evrythngApiKey
	};
	if (a.options.evrythngAppId) {
		d.params.app = a.options.evrythngAppId
	}
	return a.request(d, e, b)
};
Evrythng.prototype.deleteMultimedia = function(c, d, b) {
	var a = this;
	return a.request({
		url : a.buildUrl("/contents/multimedia/%s", c.multimedia),
		params : c.params || {},
		method : "delete",
		evrythngApiKey : c.evrythngApiKey
	}, d, b)
};
Evrythng.prototype.createPhysicalAsset = function(c, e, b) {
	var a = this, d = {
		url : "/contents/physicalAssets",
		params : c.params || {},
		data : c.data,
		method : "post",
		evrythngApiKey : c.evrythngApiKey
	};
	if (a.options.evrythngAppId) {
		d.params.app = a.options.evrythngAppId
	}
	return a.request(d, e, b)
};
Evrythng.prototype.readPhysicalAsset = function(c, e, b) {
	var a = this, d = {
		url : c.physicalAsset ? a.buildUrl("/contents/physicalAssets/%s",
				c.physicalAsset) : "/contents/physicalAssets",
		params : c.params || {},
		evrythngApiKey : c.evrythngApiKey
	};
	if (a.options.evrythngAppId) {
		d.params.app = a.options.evrythngAppId
	}
	return a.request(d, e, b)
};
Evrythng.prototype.updatePhysicalAsset = function(c, e, b) {
	var a = this, d = {
		url : a.buildUrl("/contents/physicalAssets/%s", c.physicalAsset),
		params : c.params || {},
		data : c.data,
		method : "put",
		evrythngApiKey : c.evrythngApiKey
	};
	if (a.options.evrythngAppId) {
		d.params.app = a.options.evrythngAppId
	}
	return a.request(d, e, b)
};
Evrythng.prototype.deletePhysicalAsset = function(c, d, b) {
	var a = this;
	return a.request({
		url : a.buildUrl("/contents/physicalAssets/%s", c.physicalAsset),
		params : c.params || {},
		method : "delete",
		evrythngApiKey : c.evrythngApiKey
	}, d, b)
};
Evrythng.prototype.readFile = function(c, d, b) {
	var a = this;
	return a.request({
		url : c.file ? a.buildUrl("/files/%s", c.file) : "/files",
		params : c.params || {}
	}, d, b)
};
Evrythng.prototype.deleteFile = function(c, d, b) {
	var a = this;
	return a.request({
		url : a.buildUrl("/files/%s", c.file),
		params : c.params || {},
		method : "delete"
	}, d, b)
};
Evrythng.prototype.readFileSignature = function(c, d, b) {
	var a = this;
	return a.request({
		url : "/files/signatures",
		params : c.params || {}
	}, d, b)
};
Evrythng.prototype.createCampaign = function(c, d, b) {
	var a = this;
	return a.request({
		url : "/campaigns",
		params : c.params || {},
		data : c.data,
		method : "post"
	}, d, b)
};
Evrythng.prototype.readCampaign = function(c, d, b) {
	var a = this;
	return a.request({
		url : c.campaign ? a.buildUrl("/campaigns/%s", c.campaign)
				: "/campaigns",
		params : c.params || {}
	}, d, b)
};
Evrythng.prototype.updateCampaign = function(c, d, b) {
	var a = this;
	return a.request({
		url : a.buildUrl("/campaigns/%s", c.campaign),
		params : c.params || {},
		data : c.data,
		method : "put"
	}, d, b)
};
Evrythng.prototype.deleteCampaign = function(c, d, b) {
	var a = this;
	return a.request({
		url : a.buildUrl("/campaigns/%s", c.campaign),
		params : c.params || {},
		method : "delete"
	}, d, b)
};
Evrythng.prototype.updateCampaignOrder = function(c, d, b) {
	var a = this;
	return a.request({
		url : "/campaigns/order",
		params : c.params || {},
		data : c.data,
		method : "put"
	}, d, b)
};
Evrythng.prototype.createCampaignRule = function(c, d, b) {
	var a = this;
	return a.request({
		url : a.buildUrl("/campaigns/%s/rules", c.campaign),
		params : c.params || {},
		data : c.data,
		method : "post"
	}, d, b)
};
Evrythng.prototype.readCampaignRule = function(c, d, b) {
	var a = this;
	return a.request({
		url : c.rule ? a.buildUrl("/campaigns/%s/rules/%s", c.campaign, c.rule)
				: a.buildUrl("/campaigns/%s/rules", c.campaign),
		params : c.params || {}
	}, d, b)
};
Evrythng.prototype.updateCampaignRule = function(c, d, b) {
	var a = this;
	return a.request({
		url : a.buildUrl("/campaigns/%s/rules/%s", c.campaign, c.rule),
		params : c.params || {},
		data : c.data,
		method : "put"
	}, d, b)
};
Evrythng.prototype.deleteCampaignRule = function(c, d, b) {
	var a = this;
	return a.request({
		url : a.buildUrl("/campaigns/%s/rules/%s", c.campaign, c.rule),
		params : c.params || {},
		method : "delete"
	}, d, b)
};
Evrythng.prototype.updateCampaignRuleOrder = function(c, d, b) {
	var a = this;
	return a.request({
		url : "/campaigns/%s/rules/order",
		params : c.params || {},
		data : c.data,
		method : "put"
	}, d, b)
};
Evrythng.prototype.createUserSegment = function(c, d, b) {
	var a = this;
	return a.request({
		url : "/userSegments",
		params : c.params || {},
		data : c.data,
		method : "post"
	}, d, b)
};
Evrythng.prototype.readUserSegment = function(c, d, b) {
	var a = this;
	return a.request({
		url : c.userSegment ? a.buildUrl("/userSegments/%s", c.userSegment)
				: "/userSegments",
		params : c.params || {}
	}, d, b)
};
Evrythng.prototype.updateUserSegment = function(c, d, b) {
	var a = this;
	return a.request({
		url : a.buildUrl("/userSegments/%s", c.userSegment),
		params : c.params || {},
		data : c.data,
		method : "put"
	}, d, b)
};
Evrythng.prototype.deleteUserSegment = function(c, d, b) {
	var a = this;
	return a.request({
		url : a.buildUrl("/userSegments/%s", c.userSegment),
		params : c.params || {},
		method : "delete"
	}, d, b)
};
Evrythng.prototype.authFacebook = function(c, d, b) {
	var a = this;
	return a.request({
		url : "/auth/facebook",
		params : c.params || {},
		data : c.data,
		method : "post"
	}, d, b)
};
Evrythng.prototype.authEvrythng = function(c, d, b) {
	var a = this;
	return a.request({
		url : "/auth/evrythng",
		params : c.params || {},
		data : c.data,
		method : "post"
	}, d, b)
};
Evrythng.prototype.authEvrythngUser = function(c, d, b) {
	var a = this;
	return a.request({
		url : "/auth/evrythng/users",
		params : c.params || {},
		data : c.data,
		method : "post"
	}, d, b)
};
Evrythng.prototype.authEvrythngUserValidate = function(c, d, b) {
	var a = this;
	return a.request({
		url : a.buildUrl("/auth/evrythng/users/%s/validate", c.user),
		params : c.params || {},
		data : c.data,
		method : "post"
	}, d, b)
};
Evrythng.prototype.authLogout = function(c, d, b) {
	var a = this;
	return a.request({
		url : "/auth/all/logout",
		params : c.params || {},
		method : "post"
	}, d, b)
};
Evrythng.prototype.fbInit = function(c) {
	var a = this, b = "http://connect.facebook.net/en_US/all.js";
	this.options.loginCallback = c;
	window.fbAsyncInit = function() {
		a.fbAsyncInit.call(a)
	};
	if (typeof this.options.loadingCallback === "function") {
		this.options.loadingCallback.call(this, true)
	}
	load
			.js(
					b,
					function() {
						if (typeof FB != "object") {
							if (typeof a.options.loadingCallback === "function") {
								a.options.loadingCallback.call(a, false)
							}
							a
									.handleError({
										status : 0,
										type : "facebook",
										message : "It seems that Facebook is not available on your network. Please check your Internet connection",
										url : b,
										method : "GET"
									})
						}
					})
};
Evrythng.prototype.fbAsyncInit = function() {
	var b = this, a = b.options.actionButton ? document
			.getElementById(b.options.actionButton) : null;
	FB.init({
		appId : this.options.facebookAppId,
		status : true,
		cookie : true,
		xfbml : false,
		oauth : true
	});
	FB.getLoginStatus(function(c) {
		if (c.status === "connected") {
			if (a) {
				a.onclick = function() {
					b.fbCallback.call(b, c)
				}
			}
			if (b.options.forceLogin) {
				b.fbCallback.call(b, c)
			}
		} else {
			if (a) {
				a.onclick = function() {
					b.fbLogin.call(b, b.fbCallback)
				}
			}
			if (b.options.forceLogin) {
				b.fbLogin.call(b)
			}
		}
	});
	if (typeof this.options.loadingCallback === "function") {
		this.options.loadingCallback.call(this, false)
	}
	if (typeof b.options.loginCallback === "function") {
		b.options.loginCallback.call(b);
		if (typeof b.options.loadingCallback === "function") {
			b.options.loadingCallback.call(b, false)
		}
	}
};
Evrythng.prototype.fbLogin = function(b) {
	var a = this;
	if (typeof this.options.loadingCallback === "function") {
		this.options.loadingCallback.call(this, true)
	}
	FB.login(function(c) {
		if (!c.authResponse) {
			if (typeof a.options.loadingCallback === "function") {
				a.options.loadingCallback.call(a, false)
			}
			a.handleError({
				status : 0,
				type : "facebook",
				message : "FB User cancelled login or did not fully authorize"
			})
		}
		if (typeof b === "function") {
			b.call(a, c)
		}
	}, {
		scope : "publish_actions,email,user_birthday,user_location"
	})
};
Evrythng.prototype.fbCallback = function(b) {
	var a = this;
	if (b.status === "connected") {
		if (b.authResponse) {
			if (typeof this.options.loadingCallback === "function") {
				this.options.loadingCallback.call(this, true)
			}
			FB
					.api(
							"/me",
							function(c) {
								if (!c.name) {
									a.fbLogin.call(a, a.fbCallback)
								} else {
									a
											.authFacebook(
													{
														data : {
															access : {
																token : b.authResponse.accessToken
															}
														}
													},
													function(d) {
														if (d.evrythngApiKey) {
															if (typeof a.options.loginCallback === "function") {
																a.options.loginCallback
																		.call(
																				a,
																				d,
																				c);
																if (typeof a.options.loadingCallback === "function") {
																	a.options.loadingCallback
																			.call(
																					a,
																					false)
																}
															}
														}
													})
								}
							})
		} else {
			this.handleError({
				status : 0,
				type : "facebook",
				message : "Cannot login via Facebook"
			})
		}
	} else {
		if (b.status === "not_authorized") {
			if (typeof this.options.loadingCallback === "function") {
				this.options.loadingCallback.call(this, false)
			}
			this
					.handleError({
						status : 0,
						type : "facebook",
						message : "User is logged in to Facebook, but has not authenticated your app"
					})
		} else {
			if (typeof this.options.loadingCallback === "function") {
				this.options.loadingCallback.call(this, false)
			}
			this.handleError({
				status : 0,
				type : "facebook",
				message : "User is not logged in to Facebook"
			})
		}
	}
};
Evrythng.prototype.fbPost = function(b, d) {
	var a = this;
	var c = {
		message : b.message,
		picture : b.picture,
		link : b.link,
		name : b.name,
		description : b.description
	};
	if (b.tags) {
		c.tags = b.tags
	}
	if (b.place) {
		c.place = b.place
	}
	FB.api("/" + (b.user || "me") + "/feed", "post", c, function(e) {
		if (typeof d === "function") {
			d.call(a, e)
		}
	})
};
Evrythng.prototype.fbFriends = function(b, c) {
	var a = this;
	FB.api("/" + (b.user || "me") + "/friends", function(d) {
		if (typeof c === "function" && d.data) {
			var e = d.data;
			if (b && b.orderBy === "name") {
				e = d.data.sort(function(h, g) {
					var f = h.name.toLowerCase();
					var i = g.name.toLowerCase();
					return ((f < i) ? -1 : ((f > i) ? 1 : 0))
				})
			}
			c.call(a, e)
		}
	})
};
Evrythng.prototype.handleError = function(a, b) {
	if (window.console) {
		console.error("Evrythng.js Error", a)
	}
	if (typeof b === "function") {
		b.call(this, a)
	}
	if (typeof this.options.onError === "function") {
		this.options.onError.call(this, a)
	}
};
Evrythng.prototype.createCORSRequest = function(c, a) {
	var b;
	b = new XMLHttpRequest();
	if (b.withCredentials != null) {
		b.open(c, a, true)
	} else {
		if (typeof XDomainRequest !== "undefined") {
			b = new XDomainRequest();
			b.open(c, a)
		} else {
			b = null
		}
	}
	return b
};
Evrythng.prototype.cors = function(c, g, b) {
	var a = this, f = c.method || "GET";
	if (typeof this.options.jQuery === "function") {
		if (!this.options.jQuery.support.cors) {
			return null
		}
		var e = this.options.jQuery
				.ajax({
					type : f,
					url : c.url,
					dataType : (f.toLowerCase() === "delete") ? "text" : "json",
					data : c.data,
					processData : false,
					contentType : "application/json",
					headers : {
						Accept : "application/json",
						Authorization : c.evrythngApiKey
					},
					error : function(h) {
						a
								.handleError(
										{
											status : h.status,
											type : h.responseJSON ? "server"
													: "cors",
											message : (h.responseJSON ? "Server responded with an error for the CORS request"
													: "Cannot establish CORS connection")
													+ " (using jQuery)",
											url : c.url,
											method : f,
											originalError : h,
											responseError : h.responseJSON
										}, b)
					}
				});
		return (typeof g === "function") ? e.then(g) : e
	} else {
		var d = this.createCORSRequest(f, c.url);
		if (d) {
			d.setRequestHeader("Content-Type", "application/json");
			d.setRequestHeader("Accept", "application/json");
			d.setRequestHeader("Authorization", c.evrythngApiKey);
			d.onload = function(h) {
				if (d.status.toString().indexOf("2") === 0) {
					if (typeof g === "function") {
						g.call(a, d.response ? JSON.parse(d.response) : "",
								d.status, d)
					}
				} else {
					a
							.handleError(
									{
										status : d.status,
										type : "server",
										message : "Server responded with an error for the CORS request",
										url : c.url,
										method : f,
										originalError : h,
										responseError : d.response ? JSON
												.parse(d.response) : ""
									}, b)
				}
			};
			d.onerror = function(h) {
				a.handleError({
					status : d.status,
					type : "cors",
					message : "Cannot establish CORS connection",
					url : c.url,
					method : f,
					originalError : h,
					responseError : d.response ? JSON.parse(d.response) : ""
				}, b)
			};
			d.send(c.data)
		}
		return d
	}
};
Evrythng.prototype.jsonp = function(c, f, b) {
	var a = this;
	if (typeof this.options.jQuery === "function") {
		var e = this.options.jQuery
				.ajax({
					dataType : "json",
					url : c.url,
					timeout : 10000,
					error : function(i, g, h) {
						a
								.handleError(
										{
											status : i.status,
											type : "jsonp",
											message : "Cannot establish JSONP connection (using jQuery)",
											url : c.url,
											method : "GET",
											originalError : i,
											responseError : null
										}, b)
					}
				}), d = function(h, g, i) {
			if (h.errors && h.status) {
				a
						.handleError(
								{
									status : h.status,
									type : "server",
									message : "Server responded with an error for the JSONP request (using jQuery)",
									url : c.url,
									method : "GET",
									originalError : null,
									responseError : i.responseJSON
								}, b)
			} else {
				f.call(a, h)
			}
		};
		return (typeof f === "function") ? e.then(d) : e
	} else {
		return load
				.jsonp(
						c.url,
						function(g) {
							if (g.errors && g.status) {
								a
										.handleError(
												{
													status : g.status,
													type : "server",
													message : "Server responded with an error for the JSONP request",
													url : c.url,
													method : "GET",
													originalError : null,
													responseError : g
												}, b)
							} else {
								if (typeof f === "function") {
									f.call(a, g)
								}
							}
						}, true, function(g) {
							a.handleError({
								status : 0,
								type : "jsonp",
								message : "Cannot establish JSONP connection",
								url : c.url,
								method : "GET",
								originalError : g,
								responseError : null
							}, b)
						})
	}
};
Evrythng.prototype.request = function(d, f, c) {
	var b = this, e;
	if (this.options.evrythngApiCorsUrl) {
		var a = {
			url : this.options.evrythngApiCorsUrl + d.url
					+ (d.url.indexOf("?") > -1 ? "&" : "?")
					+ this.buildParams(d.params),
			evrythngApiKey : d.evrythngApiKey || this.options.evrythngApiKey
		};
		if (d.method) {
			a.method = d.method
		}
		if (d.data) {
			a.data = JSON.stringify(d.data)
		}
		e = this.cors(a, function(h, g, m) {
			if (typeof f === "function") {
				var k = (m && m.getAllResponseHeaders ? m
						.getAllResponseHeaders() : undefined), l = {}, n;
				if (k) {
					k = k.split("\n");
					for (var j = 0; j < k.length; j++) {
						if (!k[j].trim()) {
							continue
						}
						n = k[j].split(":");
						l[n[0].trim().toLowerCase()] = n[1].trim()
					}
				}
				f.call(b, h, l)
			}
			return h
		}, c)
	}
	if (e) {
		return e
	} else {
		if (typeof d.params !== "object") {
			d.params = {}
		}
		if (d.method) {
			d.params.method = d.method
		}
		if (d.data) {
			d.params.data = JSON.stringify(d.data)
		}
		d.params.access_token = d.evrythngApiKey || this.options.evrythngApiKey;
		return this.jsonp({
			url : this.options.evrythngApiJsonpUrl + d.url
					+ (d.url.indexOf("?") > -1 ? "&" : "?") + "callback=?&"
					+ this.buildParams(d.params)
		}, function(g) {
			if (typeof f === "function") {
				f.call(b, g)
			}
			return g
		}, c)
	}
};
Evrythng.prototype.buildUrl = function(c) {
	var a = [].slice.call(arguments, 1), b = 0;
	return c.replace(/%s/g, function() {
		return a[b++]
	})
};
Evrythng.prototype.buildParams = function(c) {
	var a = [];
	for ( var b in c) {
		a.push(b + "=" + encodeURIComponent(c[b]))
	}
	return a.join("&")
};
Evrythng.prototype.getParam = function(a) {
	a = a.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var c = new RegExp("[\\?&]" + a + "=([^&#]*)"), b = c.exec(location.search);
	return b == null ? "" : decodeURIComponent(b[1].replace(/\+/g, " "))
};
Evrythng.prototype.escapeHTML = function(b) {
	var a = document.createElement("pre");
	a.appendChild(document.createTextNode(b));
	return a.innerHTML
};
Evrythng.prototype.getMimeType = function(a) {
	return (function() {
		var b = "audio/", c = "video/", d = "image/";
		return {
			jpg : d + "jpeg",
			jpeg : d + "jpeg",
			png : d + "png",
			gif : d + "gif",
			flac : b + "flac",
			mp3 : b + "mpeg",
			m4a : b + "aac",
			m4b : b + "aac",
			m4p : b + "aac",
			m4r : b + "aac",
			aac : b + "aac",
			adts : b + "aac",
			wav : b + "wav",
			bwf : b + "wav",
			aiff : b + "aiff",
			aif : b + "aiff",
			aifc : b + "aiff",
			cdda : b + "aiff",
			au : b + "basic",
			snd : b + "basic",
			ulw : b + "basic",
			mid : b + "midi",
			midi : b + "midi",
			smf : b + "midi",
			kar : b + "midi",
			qcp : b + "vnd.qcelp",
			gsm : b + "x-gsm",
			amr : b + "amr",
			caf : b + "x-caf",
			ac3 : b + "ac3",
			m2a : b + "mpeg",
			swa : b + "mpeg",
			wma : b + "x-ms-wma",
			wax : b + "x-ms-wax",
			mpga : b + "mpeg",
			mpega : b + "mpeg",
			"3gpp2" : b + "3gpp2",
			oga : b + "ogg",
			"3gp" : c + "3gpp",
			"3gpp" : c + "3gpp",
			"3g2" : c + "3gpp2",
			"3gp2" : c + "3gpp2",
			h261 : c + "h261",
			h263 : c + "h263",
			h264 : c + "h264",
			jpgv : c + "jpeg",
			jpm : c + "jpm",
			jpgm : c + "jpm",
			mj2 : c + "mj2",
			mjp2 : c + "mj2",
			mp4 : c + "mp4",
			mp4v : c + "mp4",
			mpg4 : c + "mp4",
			m4u : c + "x-mpegurl",
			mp2 : c + "mpeg",
			mpm : c + "mpeg",
			mpa : c + "mpeg",
			mpeg : c + "mpeg",
			mpg : c + "mpeg",
			mpe : c + "mpeg",
			mpv : c + "mpeg",
			mp2v : c + "mpeg-2",
			mpv2 : c + "mpeg-2",
			m1s : c + "mpeg",
			m1a : c + "mpeg",
			m75 : c + "mpeg",
			m15 : c + "mpeg",
			m1v : c + "mpeg",
			m2v : c + "mpeg",
			qt : c + "quicktime",
			mov : c + "quicktime",
			mqv : c + "quicktime",
			fvt : c + "vnd.fvt",
			mxu : c + "vnd.mpegurl",
			m4u : c + "vnd.mpegurl",
			viv : c + "vnd.vivo",
			vivo : c + "vnd.vivo",
			fli : c + "fli",
			flc : c + "flc",
			cel : c + "flc",
			asr : c + "x-ms-asf",
			asf : c + "x-ms-asf",
			asx : c + "x-ms-asx",
			lsf : c + "x-la-asf",
			lsx : c + "x-la-asf",
			wm : c + "x-ms-wm",
			wmp : c + "x-ms-wmp",
			wmv : c + "x-ms-wmv",
			wmx : c + "x-ms-wmx",
			wvx : c + "x-ms-wvx",
			avi : c + "x-msvideo",
			avs : c + "avs-video",
			mv : c + "x-sgi-movie",
			movie : c + "x-sgi-movie",
			ice : "x-conference/x-cooltalk",
			f4v : c + "mp4",
			f4p : c + "mp4",
			flv : c + "flv",
			swf : "application/x-shockwave-flash",
			spl : "application/futuresplash",
			dxr : "application/x-director",
			dir : "application/x-director",
			dcr : "application/x-director",
			divx : c + "divx",
			div : c + "divx",
			dv : c + "x-dv",
			dif : c + "x-dv",
			dl : c + "dl",
			gl : c + "gl",
			ogv : c + "ogg",
			ogg : "application/x-ogg",
			ogx : "application/ogg",
			axv : c + "annodex",
			anx : "application/annodex",
			afl : c + "animaflex",
			fmf : c + "x-atomic3d-feature",
			isu : c + "x-isvideo",
			mjpg : c + "x-motion-jpeg",
			qtc : c + "x-qtc",
			rv : c + "vnd.rn-realvideo",
			ra : "audio/x-pn-realaudio",
			ram : "audio/x-pn-realaudio",
			rm : "audio/x-pn-realaudio-plugin",
			rpm : "audio/x-pn-realaudio-plugin",
			rpj : "application/vnd.rn-realplayer-javascript",
			scm : c + "x-scm",
			vdo : c + "vdo",
			vos : c + "vosaic",
			xdr : c + "x-amt-demorun",
			xsr : c + "x-amt-showrun",
			sdv : c + "sd-video",
			vob : c + "mpeg-system",
			m4v : c + "x-m4v",
			vlc : "application/x-vlc-plugin",
			amc : "application/x-mpeg"
		}
	})()[a]
};
(function(c) {
	var d = c.load = function(a) {
		if (typeof a !== "object" || a instanceof Array) {
			var b = d.args(arguments);
			a = {
				url : b.url,
				callback : b.callback
			}
		}
		if (a.url && a.url.length) {
			if (typeof a.async === "undefined") {
				a.async = true
			}
			if (!a.type) {
				a.type = "js"
			}
			if (!(a.url instanceof Array)) {
				a.url = [ a.url ]
			}
			d.sequence(a)
		}
		return d
	};
	d.sequence = function(h) {
		var i = h.url.length, j = function(e) {
			if (!e) {
				e = 1
			}
			i = i - e;
			if (!i && typeof h.callback === "function") {
				h.callback.call(d)
			}
		}, a = function(e) {
			return e.length ? (function() {
				j(e.length);
				d.sequence({
					url : e,
					async : h.async,
					type : h.type,
					callback : j
				})
			}) : j
		};
		for (var b = 0; b < h.url.length; b++) {
			if (h.url[b] instanceof Array) {
				d.sequence({
					url : h.url[b],
					async : h.async,
					type : h.type,
					callback : a(h.url.slice(b + 1))
				});
				break
			} else {
				d.one({
					url : h.url[b],
					async : h.async,
					type : h.type,
					callback : j
				})
			}
		}
		return d
	};
	d.one = function(k) {
		var l, i = false, j = document.getElementsByTagName("head")[0]
				|| document.body;
		if (k.url in d.map) {
			k.url = d.map[k.url]
		}
		if (k.type === "css" || k.url.toLowerCase().match(/\.css$/)) {
			i = true;
			l = document.createElement("link");
			l.rel = "stylesheet";
			l.href = d.path(k.url
					+ (k.url.toLowerCase().match(/\.css$/) ? "" : ".css"))
		} else {
			l = document.createElement("script");
			l.async = k.async;
			l.src = d
					.path(k.url
							+ (k.type === "jsonp"
									|| k.url.toLowerCase().match(/\.js$/) ? ""
									: ".js"))
		}
		j.appendChild(l);
		var b = function(e) {
			if (typeof d.ready === "function") {
				d.ready.call(d, k.url)
			}
			if (typeof k.callback === "function") {
				k.callback.call(d)
			}
			if (!i && e && e.parentNode) {
				e.parentNode.removeChild(e)
			}
		};
		var a = navigator.userAgent.match(/MSIE\s(\d+)/);
		if (a && a[1] < 11) {
			l.onreadystatechange = function() {
				if (this.readyState === "loaded"
						|| this.readyState === "complete") {
					b(this)
				}
			}
		} else {
			l.onload = function() {
				b(this)
			}
		}
		if (typeof k.errorHandler === "function") {
			l.onerror = function(e) {
				k.errorHandler.call(d, e)
			}
		}
		return d
	};
	d.js = d.async = function() {
		var a = d.args(arguments);
		return d({
			url : a.url,
			callback : a.callback
		})
	};
	d.css = function() {
		var a = d.args(arguments);
		return d({
			url : a.url,
			callback : a.callback,
			type : "css"
		})
	};
	d.sync = function() {
		var a = d.args(arguments);
		return d({
			url : a.url,
			callback : a.callback,
			async : false
		})
	};
	d.jsonp = function(g, a, b, h) {
		if (typeof a === "function") {
			if (!d.jsonp.index) {
				d.jsonp.index = 1
			} else {
				d.jsonp.index++
			}
			window["loadCallback" + d.jsonp.index] = a;
			g = g.replace("=?", "=loadCallback" + d.jsonp.index)
		}
		return d.one({
			url : g,
			async : b !== false,
			type : "jsonp",
			errorHandler : h
		})
	};
	d.ajax = function(k, a, j, l) {
		var b;
		if (window.XMLHttpRequest) {
			b = new XMLHttpRequest()
		} else {
			if (window.ActiveXObject) {
				try {
					b = new ActiveXObject("Msxml2.XMLHTTP")
				} catch (e) {
					try {
						b = new ActiveXObject("Microsoft.XMLHTTP")
					} catch (e) {
					}
				}
			}
		}
		if (!b) {
			return null
		}
		b.onreadystatechange = function() {
			if (b.readyState === 4 && typeof a === "function") {
				a.call(b, b.responseText)
			}
		};
		if (typeof l === "function") {
			b.onerror = function(f) {
				l.call(d, f)
			}
		}
		b.open("GET", d.path(k), j);
		b.send();
		return d
	};
	d.min = function(j, b) {
		if (j && typeof j === "string") {
			j = [ j ]
		}
		if ((j instanceof Array)
				&& (typeof b === "function" ? b.call(d) : true)) {
			for (var h = 0; h < j.length; h++) {
				var i = "", a = /\.(js|css)$/i;
				if (j[h].match(a)) {
					i = j[h].replace(a, function(l, f, e, g) {
						return ".min." + f
					})
				} else {
					i = j[h] + ".min"
				}
				d.map[j[h]] = i
			}
		}
		return d
	};
	d.args = function(b) {
		var a = Array.prototype.slice.call(b);
		return {
			url : a,
			callback : (typeof a[a.length - 1] === "function") ? a.pop()
					: undefined
		}
	};
	d.path = function(a) {
		return a.match(/^(https?\:|file\:|\/)/i) ? a : d.root + a
	};
	d.init = function() {
		d.root = "";
		d.map = {};
		var a = document.getElementsByTagName("script"), g, b;
		for (var h = 0; h < a.length; h++) {
			if (a[h].src.match(/(^|\/)load(\.min)?\.js$/)
					|| a[h].id === "load.js") {
				g = a[h].getAttribute("data-load");
				if (g) {
					b = g.lastIndexOf("/") + 1;
					d.root = b ? g.substring(0, b) : "";
					d({
						url : g.substring(b),
						async : a[h].getAttribute("data-async") !== "false"
					})
				}
				break
			}
		}
	};
	d.init()
})(window);