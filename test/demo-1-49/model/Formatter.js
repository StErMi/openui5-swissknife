sap.ui.define([
    "sap/ui/core/ValueState"
], function (ValueState) {
	"use strict";

	return {

		statusInfo: function (sStatus) {
			var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

			switch (sStatus) {
				case "PENDING":
					return oResourceBundle.getText("orderStatusPending");
				case "DELIVERED":
					return oResourceBundle.getText("orderStatusDelivered");
				case "CANCELLED":
					return oResourceBundle.getText("orderStatusCancelled");
				default:
					return sStatus;
			}
        },

		statusInfoState: function (sStatus) {
			switch (sStatus) {
				case "PENDING":
					return ValueState.Warning;
				case "DELIVERED":
					return ValueState.Success;
				case "CANCELLED":
					return ValueState.Error;
				default:
					return ValueState.Success;
			}
		}
	};
});
