
# openui5-swissknife

OpenUI5 is a powerful web framework to develop enterprise grade application, everyone know that. But when you need to develop application daily you start to see flows or where you can improve it with just a bunch of utility methods.

That’s why I created openui5-swissknife. This library allow you to enhance two core parts of SAP/OpenUI5:

 - sap.ui.core.mvc.Controller 
 - sap.ui.core.UIComponent

## it.designfuture.swissknife.Component

This class is extending sap.ui.core.UIComponent and when you offten need to develop applications with legacy framework version (right now 1.28.x is out of maintenance) it can save you a lot of time.

First of all, I handle for you the router initialization and sometimes it can save you from a lot of head scratch. Yes it can happen to forget to initialize it and I can assure that everything will stop to work for just a line of code you forget to add :D

Second of all I also handle for you the initialization of the device model that you will use plently of times inside your layout to let your app adapt based on the device use it to consume content.

What you need to do? Just override and implement some methods if you want to do something, before/after initialization:

 - beforeInit: method that will be called after UIComponent init but before internal initialization (device and bundle)
 - afterInit: method that will be before after router initialization
 - afterRouting: method that will be called after router initialization

**NB: remember to not override the init method of the Component!**

## it.designfuture.swissknife.Component

This class is extending sap.ui.core.mvc.Controller and contains a lot of utility. I will try to describe all of them:

 - Enhanced routing 
 - Enhanced navBack 
 - Enhanced dialog handling (create/get/destroy) 
 - Various utility methods to get/set JSON/OData model

### Enhanced routing
Routing is a core part of your architecture. Usually to do handle it in your controller you should write something like this

    sap.ui.define([
    	"sap/ui/core/mvc/Controller"
    ], function (Controller) {
    	"use strict";
    	return Controller.extend("sap.ui.demo.wt.controller.Detail", {
    		
    		onInit: function () {
    			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
    			oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
    		},
    		
    		_onObjectMatched: function (oEvent) {
    			this.getView().bindElement({
    				path: "/" + oEvent.getParameter("arguments").invoicePath,
    				model: "invoice"
    			});
    		}
    		
    	});
    });
So you need to explit say which route you want to match, create a method to handle that event and than parse all parameters if needed.

With our custom Controller I will handle everything for you! You just need to do two things:

 1. Specify a __targetName: it can be a string or an array of routes to match
 2. Override and implement the onRouteMatched method

onRouteMatched will be called with these parameters:

 1. oEvent: object to represent the match event
 2. routeName: string of the route matched
 3. parameters: each route parameters matched

Here’s an example (you will find a demo inside the GitHub project)

    sap.ui.define([
    	"it/designfuture/swissknife/Controller"
    ], function (Controller) {
    	"use strict";
    
    	return Controller.extend("demo.controller.Detail2", {
    		
    		///////////////////////////////////////////////////////////////////////
    		//	ATTRIBUTES
    		///////////////////////////////////////////////////////////////////////
    
    		__targetName: "productDetails",
    		
    		///////////////////////////////////////////////////////////////////////
    		//	LIFECYCLE EVENTS
    		///////////////////////////////////////////////////////////////////////
    
    		onRouteMatched: function(oEvent, routeName, orderId, productId) {
    			this.getView().bindElement("/orders/" + orderId + "/products/"+productId);
    		}
    
    	});
    
    }, /* bExport= */ true);

### Enhanced navBack

With the custom Controller also comes a default implementation of the navBack method that you can freely use and customize. Here’s the implementation logic:

    /**
     * Utility to implement the router nav back
     * @public
     */
    onNavBack: function(oEvent) {
    	var oHistory = History.getInstance();
    	var sPreviousHash = oHistory.getPreviousHash();
    
    	// The history contains a previous entry
    	if (sPreviousHash !== undefined) {
    		window.history.go(-1);
    	} else {
    		for( var [name, route] of Object.entries(this.getRouter()._oRoutes) ) {
    			var toCompare = (this.__homeRoute === undefined || this.__homeRoute === null || this.__homeRoute === "") ? route._oConfig.pattern : route._oConfig.name;
    			if( toCompare === this.__homeRoute ) {
    				this.navTo(route._oConfig.name, this.__homeRouteParams, true);
    				break;
    			}
    		}
    	}
    },

We will check if there’s a previous hash in the History. If so we just do a back inside the history, otherwise we try to find inside the Router routes which one we should use to go back. By default we try to find an empty route that usually it’s the home page. You can customize this behaviour specifying two variabiles in your controller:

 1. __homeRoute: which route name we should use to go back to
 2. __homeRouteParams: which parameters we should pass to the home route

### Enhanced dialog handling (create/get/destroy)

I don’t know you but usually we need to use a lot of dialogs in our enterprise app. Everytime you have to ask to the user if he’s pretty sure to confirm the operation (DELETE ALL THE THINGS!).

If you’re also on the same boat you should definitely check out these methods:


    ////////////////////////////////////////////////////////////
    //	DIALOG
    ////////////////////////////////////////////////////////////
    
    /**
     * Return a created dialog
     * @public
     * @param {string} dialogId Dialog ID
     * @returns The dialog associated to the id
     */
    getDialog: function(dialogId) {
        return this.__dialogs[dialogId];
    },
    
    /**
     * Create a dialog
     * @public
     * @param {string} dialogId Dialog ID
     * @param {string} dialogPath Path to the XML dialog file
     * @returns The created dialog
     */
    createDialog: function (dialogId, dialogPath) {
    	var dialog = this.__dialogs[dialogId];
    	if (!dialog) {
    		dialog = sap.ui.xmlfragment(this.getView().getId(), dialogPath, this);
    		this.getView().addDependent(dialog);
    	}
    	return dialog;
    },
    
    /**
     * Destroy a dialog
     * @public
     * @param {string} dialogId Dialog ID
     */
    destroyDialog: function(dialogId) {
    	var dialog = this.__dialogs[dialogId];
    	if (dialog) {
    		if( dialog.close ) {
    			dialog.close();
    		}
    		dialog.destroy();
    		this.__dialogs[dialogId] = null;
    	}
    },

To clear up all the resources just remember to always call destroyDialog ;)

Various utility methods to get/set JSON/OData model

I think that in an app you will need to get/set a lot of models and model’s properties. That’s you I’ve created plently of shortcuts for you. I will not write down a full list here but you can check them out on GitHub Controller.js

## Demos

 -  [SAP/OpenUI5 version < 1.33.x](https://stermi.github.io/openui5-swissknife/test/demo-legacy/)
 - [SAP/OpenUI5 version > 1.33.x < 1.49.x](https://stermi.github.io/openui5-swissknife/test/demo-1-33/)
 - [SAP/OpenUI5 version > 1.49.x](https://stermi.github.io/openui5-swissknife/test/demo-1-49/)



