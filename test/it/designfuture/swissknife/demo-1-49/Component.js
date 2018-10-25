sap.ui.define([
	"it/designfuture/swissknife/Component",
	"demo/model/models"
], function(Component, models) {
	"use strict";

	return Component.extend("demo.Component", {

		metadata : {
			manifest : "json",
		},

		beforeInit: function() {
			//OVERRIDE IF NEEDED
		},
		
		afterInit: function() {
			//OVERRIDE IF NEEDED
		},
		
		afterRouting: function() {
			//OVERRIDE IF NEEDED
		}
		
	});
});