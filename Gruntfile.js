module.exports = function(grunt) {
    grunt.initConfig({
        copy: {
            main: {
                files: [{
                    expand: false,
                    cwd: '',
                    src: ['amWaterfall.js','amWaterfall.qext', 'properties.js'],
                    dest: 'C:/Users/Niels/Documents/Qlik/Sense/Extensions/amWaterfall/'
                }
                ]
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('default', ['copy']);
};