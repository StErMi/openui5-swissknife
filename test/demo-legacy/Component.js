sap.ui.getCore().loadLibrary("it.designfuture.swissknife", "resources/it/designfuture/swissknife");

sap.ui.define([
	"it/designfuture/swissknife/Component",
	"sap/ui/model/resource/ResourceModel",
	"demo/model/models"
], function(Component, ResourceModel, models) {
	"use strict";

	return Component.extend("demo.Component", {

		metadata : {
			manifest : "json",
		},

		/**
	     * Function that initialize the translation bundle
	     *
	     * @private
	     */
		__initLocalization: function() {
			var appname = this.getMetadata().getManifestEntry("sap.app").id;
			// LOCALIZATION MODEL
			var oI18NModel = new ResourceModel({
				bundleName: appname + ".i18n.i18n"
			});
			this.setModel(oI18NModel, "i18n");
		},

		beforeInit: function() {
			this.__initLocalization();
			this.setModel(models.createJSONModel("model/data.json"));
		},
		
		afterInit: function() {
			//OVERRIDE IF NEEDED
		},
		
		afterRouting: function() {
			//OVERRIDE IF NEEDED
		}
		
	});
});