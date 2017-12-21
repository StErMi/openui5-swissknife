sap.ui.define([
	"it/designfuture/swissknife/Controller",
    "sap/ui/Device"
], function (Controller, Device) {
	"use strict";

	return Controller.extend("demo.controller.Detail2", {
		
		///////////////////////////////////////////////////////////////////////
		//	ATTRIBUTES
		///////////////////////////////////////////////////////////////////////

		__targetName: "productDetails",
        __homeRoute: "orderDetails",
        __homeRouteParams: null,
		
		///////////////////////////////////////////////////////////////////////
		//	LIFECYCLE EVENTS
		///////////////////////////////////////////////////////////////////////

		onRouteMatched: function(oEvent, routeName, orderId, productId) {
			this.getView().bindElement("/orders/" + orderId + "/products/"+productId);
			this.__homeRouteParams = {orderId: orderId};
		},

		///////////////////////////////////////////////////////////////////////
		//	EVENTS
		///////////////////////////////////////////////////////////////////////

		onToProduct1C: function() {
			this.getOwnerComponent().getRouter()
				.navTo("productDetails", 
					{orderId:0, productId: 2});
		},

		onToProduct2D: function() {
			this.getOwnerComponent().getRouter()
				.navTo("productDetails", 
					{orderId:1, productId: 3});
		},

	});

}, /* bExport= */ true);
