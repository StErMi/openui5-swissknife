module.exports = function(grunt) {
	
		grunt.initConfig({
	
			dir: {
				src: 'src',
				dest: 'dist',
				demo_legacy: 'test/demo-legacy',
				demo_1_33: 'test/demo-1-33',
				demo_1_49: 'test/demo-1-49',
				bower_components: 'bower_components'
			},
	
			watch: {
				options: {
					livereload: true
				},
				css: {
					files: ['<%= dir.src %>/**/*.less', '<%= dir.src %>/**/*.css'],
					tasks: ['build']
				},
				js: {
					files: ['<%= dir.src %>/**/*.js', '<%= dir.src %>/**/*.xml', '<%= dir.src %>/**/*.json', '<%= dir.src %>/**/*.html', '<%= dir.src %>/**/*.properties'],
					tasks: ['build']
				}
			},
	
			copy: {
				demo_legacy: {
					expand: true,
					cwd: '<%= dir.dest %>/',
					src: ['**'],
					dest: '<%= dir.demo_legacy %>/resources/',
				},
				demo_1_49: {
					expand: true,
					cwd: '<%= dir.dest %>/',
					src: ['**'],
					dest: '<%= dir.demo_1_49 %>/resources/',
				},
				demo_1_33: {
					expand: true,
					cwd: '<%= dir.dest %>/',
					src: ['**'],
					dest: '<%= dir.demo_1_33 %>/resources/',
				},
			},
	
			clean: {
				dist: '<%= dir.dest %>/**'
			},
	
			eslint: {
				options: {
					configFile: './.eslintrc'
				},
	
				demo: ['<%= dir.demo %>']
			},
	
			connect: {
				options: {
					port: 8080,
					hostname: '*',
					livereload: true
				},
				src: {},
				dist: {}
			},
	
			openui5_connect: {
				options: {
					resources: [
						'<%= dir.bower_components %>/openui5-sap.ui.core/resources',
						'<%= dir.bower_components %>/openui5-sap.m/resources',
						'<%= dir.bower_components %>/openui5-sap.ui.layout/resources',
						'<%= dir.bower_components %>/openui5-themelib_sap_belize/resources'
					]
				},
				src: {
					options: {
						appresources: '<%= dir.demo_legacy %>'
					}
				},
				dist: {
					options: {
						appresources: '<%= dir.demo_legacy %>'
					}
				}
			},
	
			openui5_preload: {
				library: {
					options: {
						resources: [
							{ cwd: '<%= dir.src %>' }
						],
						dest: '<%= dir.dest %>',
						compatVersion: '1.50',
						compress: false
					},
					libraries: 'it/designfuture/swissknife'
				},
			}
		});
	
		// These publins provide necessary tasks
		grunt.loadNpmTasks('grunt-contrib-connect');
		grunt.loadNpmTasks('grunt-contrib-clean');
		grunt.loadNpmTasks('grunt-contrib-copy');
		grunt.loadNpmTasks('grunt-openui5');
		grunt.loadNpmTasks('grunt-eslint');
		grunt.loadNpmTasks("grunt-contrib-watch");
	
		// Server task
		grunt.registerTask('serve', function(target) {
			grunt.task.run('openui5_connect:' + (target || 'src') );
			grunt.task.run('watch');
		});
	
		// Linting task
		grunt.registerTask('lint', ['eslint']);
	
		// Build task
		grunt.registerTask('build', ['clean', 'openui5_preload', 'copy:demo_1_49', 'copy:demo_legacy', 'copy:demo_1_33']);
	
		// Default task
		grunt.registerTask('default', [
			'lint',
			'clean',
			'build',
			'serve'
		]);
	
	};