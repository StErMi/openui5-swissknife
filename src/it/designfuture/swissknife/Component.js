sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/resource/ResourceModel",
	"sap/ui/Device"
], function (UIComponent, JSONModel, ResourceModel, Device) {
	"use strict";

	return UIComponent.extend("it.designfuture.swissknife.Component", {

		metadata : {
			library : "it.designfuture.swissknife",
		},
		
		/**
	     * Function that initilize device model with all the device informations
	     *
	     * @private
	     */
		__initDevice: function() {
			// set device model
	        var deviceModel = new sap.ui.model.json.JSONModel(Device);
	        deviceModel.setDefaultBindingMode("OneWay");
	        this.setModel(deviceModel, "device");
		},

		/**
	     * Default init function
	     * @private
	     */ 
		init: function () {
			UIComponent.prototype.init.apply(this, arguments);

			this.beforeInit();
			
			this.__initDevice();
			
			this.afterInit();

			// create the views based on the url/hash
			this.getRouter().initialize();
			
			this.afterRouting();
		},
		
		/////////////////////////////////////////////////////////
		//
		// METHODS TO OVERRIDE
		//
		/////////////////////////////////////////////////////////

		/**
	     * Function that will be called after UIComponent init but before internal initialization (device and bundle)
	     * @public
	     */
		beforeInit: function() {
			//OVERRIDE IF NEEDED
		},
		
		/**
	     * Function that will be before after router initialization
	     * @public
	     */
		afterInit: function() {
			//OVERRIDE IF NEEDED
		},
		
		/**
	     * Function that will be called after router initialization
	     * @public
	     */
		afterRouting: function() {
			//OVERRIDE IF NEEDED
		}

		
	});

});