module.exports = function(grunt) {
    grunt.initConfig({
        clean: {
            js: {
                src: ['build/*']
            }
        },
        concat: {
            js: {
                files: {
                    'build/parser.js': [
                        'parser-date.js',
                        'parser-regulars.js',
                        'human-date-parser.js'
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
    grunt.loadNpmTasks('grunt-contrib-concat')
    grunt.loadNpmTasks('grunt-contrib-uglify')
    grunt.loadNpmTasks('grunt-mocha-test')

    grunt.registerTask('default', ['clean:js', 'concat:js', 'uglify', 'mochaTest'])
}
