/*!
 * ${copyright}
 */

/**
 * Initialization Code and shared classes of library it.designfuture.swissknife.
 */
sap.ui.define([
	'jquery.sap.global', 
	'sap/ui/core/library' // library dependency
	],  function(jQuery, library) {

		"use strict";

		/**
		 * Suite controls library.
		 *
		 * @namespace
		 * @name it.designfuture.swissknife
		 * @author Emanuele Ricci <stermi@gmail.com>
		 * @version ${version}
		 * @public
		 */


		// delegate further initialization of this library to the Core
		sap.ui.getCore().initLibrary({
			name : "it.designfuture.swissknife",
			version: "${version}",
			noLibraryCSS: true,
			dependencies : ["sap.ui.core", "sap.m"],
			types: [],
			interfaces: [],
			controls: [ 
				"it.designfuture.swissknife.Controller",
				"it.designfuture.swissknife.Component",
			],
			elements: []
		});

		return it.designfuture.swissknife;

}, /* bExport= */ false);