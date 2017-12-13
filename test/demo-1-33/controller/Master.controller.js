sap.ui.define([
	"it/designfuture/swissknife/Controller",
	"demo/model/Formatter",
    "sap/ui/Device"
], function (Controller, Formatter, Device) {
	"use strict";

	return Controller.extend("demo.controller.Master", {
		
		///////////////////////////////////////////////////////////////////////
		//	ATTRIBUTES
		///////////////////////////////////////////////////////////////////////

		__targetName: "master",
		formatter: Formatter,
		
		///////////////////////////////////////////////////////////////////////
		//	EVENTS
		///////////////////////////////////////////////////////////////////////
        
		onSelectionChange: function(oEvent) {
			var sOrderId = oEvent.getSource().getSelectedItem().getBindingContext().getProperty("orderId")
			this.getOwnerComponent().getRouter()
				.navTo("orderDetails", 
					{orderId:sOrderId}, 
					!Device.system.phone);
		}
	});

}, /* bExport= */ true);
