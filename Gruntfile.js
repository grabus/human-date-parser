module.exports = function(grunt) {
    grunt.initConfig({
        clean: {
            js: {
                src: ['build/*']
            }
        },
        browserify: {
            dist: {
                files: {
                    'build/parser.js': [
                        'human-date-parser.js'
                    ]
                },
                options: {
                    alias: [
                        'human-date-parser.js:HumanDateParser'
                    ]
                }
            }
        },
        uglify: {
            build: {
                src: 'build/parser.js',
                dest: 'build/parser.min.js'
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/**/*.js']
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-contrib-uglify')
    grunt.loadNpmTasks('grunt-mocha-test')
    grunt.loadNpmTasks('grunt-browserify')

    //grunt.registerTask('default', ['clean:js', 'concat:js', 'uglify'])
    grunt.registerTask('build', ['clean:js', 'browserify:dist'])
    grunt.registerTask('build-min', ['build', 'uglify'])
    grunt.registerTask('test', ['mochaTest'])
}
