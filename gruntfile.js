module.exports = function (grunt) {

	grunt.initConfig({
		sass: {
			dist: {
				files: {
					"css/styles.css": "scss/styles.scss"
				}
			}
		},
		coffee: {
			compile: {
				files: {
					"js/scripts.js": ["coffee/*.coffee"]
				}
			}
		},
		watch: {
			styles: {
				files: ["scss/styles.scss"],
				tasks: ["sass", "cssmin"]
			},
			html: {
				options: {
					debounceDelay: 1000,
				},
				files: ["_site/index.html"],
				tasks: ["htmlmin", "compress"]
			},
			coffee: {
				files: ["coffee/**/*.coffee"],
				tasks: ["coffee", "uglify"]
			}
		},
		cssmin: {
			options: {
				keepSpecialComments: false
			},
			target: {
				files: {
					"css/styles.css": ["css/styles.css"]
				}
			}
		},
		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true,
					removeEmptyAttributes: true,
					removeScriptTypeAttributes: true,
					removeStyleLinkTypeAttributes: true
				},
				files: {
					"_site/index.html": "_site/index.html"
				}
			}
		},
		uglify: {
			default: {
				files: {
					'js/scripts.min.js': ['js/scripts.js']
				}
			}
		},
		compress: {
			html: {
				options: {
					mode: "gzip"
				},
				expand: true,
				cwd: "_site/",
				src: ["**/*.html"],
				dest: "_site/",
				ext: ".html.gz"
			},
			jpg: {
				options: {
					mode: "gzip"
				},
				expand: true,
				cwd: "_site/",
				src: ["**/*.jpg"],
				dest: "_site/",
				ext: ".jpg.gz"
			},
			css: {
				options: {
					mode: "gzip"
				},
				expand: true,
				cwd: "_site/",
				src: ["**/*.css"],
				dest: "_site/",
				ext: ".css.gz"
			},
			js: {
				options: {
					mode: "gzip"
				},
				expand: true,
				cwd: "_site/",
				src: ["**/*.js"],
				dest: "_site/",
				ext: ".js.gz"
			},
			minjs: {
				options: {
					mode: "gzip"
				},
				expand: true,
				cwd: "_site/",
				src: ["**/*.min.js"],
				dest: "_site/",
				ext: ".min.js.gz"
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-sass");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-htmlmin");
	grunt.loadNpmTasks("grunt-contrib-compress");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-coffee");
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask("html", ["htmlmin"]);
	grunt.registerTask("gzip", ["compress"]);
	grunt.registerTask("js", ["coffee", "uglify"]);

	grunt.registerTask("watch", ["watch"]);
	grunt.registerTask("default", ["sass", "coffee", "htmlmin", "uglify", "compress"]);
};
