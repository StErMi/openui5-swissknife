sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function(JSONModel, Device) {
	"use strict";

	return {

		createDeviceModel: function() {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},

		createJSONModel: function(json) {
			var oModel = new JSONModel(json);
			return oModel;
		},

		loadJSONModel: function(json) {
			var oModel = new JSONModel();
			oModel.setDefaultBindingMode("OneWay");
			oModel.loadData(json);
			return oModel;
		}

		

	};
});