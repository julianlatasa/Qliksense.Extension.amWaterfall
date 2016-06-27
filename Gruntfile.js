module.exports = function(grunt) {
    grunt.initConfig({
        copy: {
            main: {
                files: [{
                    expand: false,
                    cwd: '',
                    src: ['amWaterfall/amWaterfall.js', 'amWaterfall/amWaterfall.qext', 'amWaterfall/properties.js', 'amWaterfall/wbFolder.wbl'],
                    dest: 'C:/Users/Niels/Documents/Qlik/Sense/Extensions/'
                }, {
                    expand: false,
                    cwd: '',
                    src: ['amCombo/amCombo.js', 'amCombo/amCombo.qext', 'amCombo/properties.js', 'amCombo/wbFolder.wbl'],
                    dest: 'C:/Users/Niels/Documents/Qlik/Sense/Extensions/'
                }]
            }
        },
        zip: {
            'amWaterfall.zip': ['amWaterfall/amWaterfall.js', 'amWaterfall/amWaterfall.qext', 'amWaterfall/properties.js', 'amWaterfall/wbFolder.wbl'],
            'amCombo.zip': ['amCombo/amCombo.js', 'amCombo/amCombo.qext', 'amCombo/properties.js', 'amCombo/wbFolder.wbl']
        }
    });


    grunt.loadNpmTasks('grunt-zip');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('default', ['copy', 'zip']);
};
