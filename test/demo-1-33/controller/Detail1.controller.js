sap.ui.define([
	"it/designfuture/swissknife/Controller",
    "sap/ui/Device"
], function (Controller, Device) {
	"use strict";

	return Controller.extend("demo.controller.Detail1", {
		
		///////////////////////////////////////////////////////////////////////
		//	ATTRIBUTES
		///////////////////////////////////////////////////////////////////////

		__targetName: "orderDetails",
		
		///////////////////////////////////////////////////////////////////////
		//	LIFECYCLE EVENTS
		///////////////////////////////////////////////////////////////////////

		onRouteMatched: function(oEvent, routeName, orderId) {
			this._orderId = orderId;
			this.getView().bindElement("/orders/" + this._orderId);
		},
		
		///////////////////////////////////////////////////////////////////////
		//	EVENTS
		///////////////////////////////////////////////////////////////////////

		onSelectionChange: function(oEvent) {
			var sProductId = oEvent.getSource().getBindingContext().getProperty("productId");
			this.getOwnerComponent().getRouter()
				.navTo("productDetails", 
					{orderId:this._orderId, productId: sProductId});
		},

	});

}, /* bExport= */ true);
