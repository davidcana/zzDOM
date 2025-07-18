module.exports = function(grunt) {
    
    grunt.initConfig({
        pkg: grunt.file.readJSON( 'package.json' ),
        compress: {
            main: {
                options: {
                    archive: 'dist/<%= pkg.name %>-js_<%= grunt.template.today("yyyy-mm-dd_HHMM") %>.tar.gz',
                    pretty: true
                },
                expand: true,
                files: [
                    {
                        cwd: 'docs/',
                        expand: true,
                        src: ['**/*', '!**/*~'],
                        dest: 'docs'
                    },
                    {
                        cwd: 'externs/',
                        expand: true,
                        src: ['**/*', '!**/*~'],
                        dest: 'externs'
                    },
                    {
                        cwd: 'samples/',
                        expand: true,
                        src: ['**/*', '!**/*~'],
                        dest: 'samples'
                    },
                    {
                        cwd: 'src/',
                        expand: true,
                        src: ['**/*', '!**/*~'],
                        dest: 'src'
                    },
                    {
                        cwd: 'test/',
                        expand: true,
                        src: ['**/*', '!**/*~'],
                        dest: 'test'
                    }, 
                    {
                        src: ['changes.txt']
                    },
                    {
                        src: ['Gruntfile.js']
                    }, 
                    {
                        src: ['LICENSE']
                    },
                    {
                        src: ['package.json']
                    },
                    {
                        src: ['package-lock.json']
                    },
                    {
                        src: ['README.md']
                    }
                ]
            }
        },
        concat: {
            options: {
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd HH:M:s") %> */\n'
            },
            'simple-core': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/simple-core.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/simple.body.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/simple-core.html',
                nonull: true
            },
            'simple-events': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/simple-events.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/simple.body.events.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/simple-events.html',
                nonull: true
            },
            'simple-visible': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/simple-visible.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/simple.body.visible.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/simple-visible.html',
                nonull: true
            },
            'simple-forms': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/simple-forms.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/simple.body.forms.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/simple-forms.html',
                nonull: true
            },
            'simple-center': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/simple-center.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/simple.body.center.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/simple-center.html',
                nonull: true
            },
            'simple': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/simple.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/simple.body.html',
                    'test/body/simple.body.events.html',
                    'test/body/simple.body.visible.html',
                    'test/body/simple.body.forms.html',
                    'test/body/simple.body.center.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/simple.html',
                nonull: true
            },
            'multiple-core': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/multiple-core.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/multiple.body.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/multiple-core.html',
                nonull: true
            },
            'multiple-events': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/multiple-events.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/multiple.body.events.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/multiple-events.html',
                nonull: true
            },
            'multiple-visible': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/multiple-visible.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/multiple.body.visible.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/multiple-visible.html',
                nonull: true
            },
            'multiple-forms': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/multiple-forms.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/multiple.body.forms.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/multiple-forms.html',
                nonull: true
            },
            'multiple': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/multiple.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/multiple.body.html',
                    'test/body/multiple.body.events.html',
                    'test/body/multiple.body.visible.html',
                    'test/body/multiple.body.forms.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/multiple.html',
                nonull: true
            },
            'plugins': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/plugins.head.html',
                    'test/body/plugins.body.html'
                ],
                dest: 'test/plugins.html',
                nonull: true
            },
            'plugin-center-core': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/plugin-center-core.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/plugin-center-core.html',
                nonull: true
            },
            'plugin-center-full': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/plugin-center-full.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/plugin-center-full.html',
                nonull: true
            },
            'plugin-events-core': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/plugin-events-core.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/plugin-events-core.html',
                nonull: true
            },
            'plugin-events-full': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/plugin-events-full.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/plugin-events-full.html',
                nonull: true
            },
            'plugin-forms-core': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/plugin-forms-core.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/plugin-forms-core.html',
                nonull: true
            },
            'plugin-forms-full': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/plugin-forms-full.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/plugin-forms-full.html',
                nonull: true
            },
            'plugin-visible-core': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/plugin-visible-core.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/plugin-visible-core.html',
                nonull: true
            },
            'plugin-visible-full': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/plugin-visible-full.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/plugin-visible-full.html',
                nonull: true
            },
            'zz-core': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/zz-core.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/zz.body.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/zz-core.html',
                nonull: true
            },
            'zz-utils': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/zz-utils.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/zz.body.utils.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/zz-utils.html',
                nonull: true
            },
            'zz': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/zz.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/zz.body.html',
                    'test/body/zz.body.utils.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/zz.html',
                nonull: true
            },
            'simple-gcc': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/simple-gcc.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/simple.body.html',
                    'test/body/simple.body.events.html',
                    'test/body/simple.body.visible.html',
                    'test/body/simple.body.forms.html',
                    'test/body/simple.body.center.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/simple-gcc.html',
                nonull: true
            },
            'multiple-gcc': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/multiple-gcc.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/multiple.body.html',
                    'test/body/multiple.body.events.html',
                    'test/body/multiple.body.visible.html',
                    'test/body/multiple.body.forms.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/multiple-gcc.html',
                nonull: true
            },
            'zz-gcc': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/zz-gcc.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/zz.body.html',
                    'test/body/zz.body.utils.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/zz-gcc.html',
                nonull: true
            },
            'plugins-gcc': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/plugins-gcc.head.html',
                    'test/body/plugins.body.html'
                ],
                dest: 'test/plugins-gcc.html',
                nonull: true
            }
        },
        'closure-compiler': {
            'simple-core': {
                options: {
                    js: [
                        'build/simple-core-tests.js'
                    ],
                    js_output_file: 'build/simple-core-tests.min.js',
                    compilation_level: 'ADVANCED',
                    create_source_map: 'build/simple-core-tests.min.js.map',
                    warning_level: 'VERBOSE',
                    output_wrapper: '(function(){\n%output%\n}).call(this)\n//# sourceMappingURL=simple-tests.min.js.map',
                    debug: true,
                    externs: 'externs/qunit-2.11.2.js'
                }
            },
            'multiple-full': {
                options: {
                    js: [
                        'build/multiple-full-tests.js'
                    ],
                    js_output_file: 'build/multiple-full-tests.min.js',
                    compilation_level: 'ADVANCED',
                    create_source_map: 'build/multiple-full-tests.min.js.map',
                    warning_level: 'VERBOSE',
                    output_wrapper: '(function(){\n%output%\n}).call(this)\n//# sourceMappingURL=multiple-full-tests.min.js.map',
                    debug: true,
                    externs: 'externs/qunit-2.11.2.js'
                }
            },
            zz: {
                options: {
                    js: [
                        'build/zz-core-tests.js'
                    ],
                    js_output_file: 'build/zz-core-tests.min.js',
                    compilation_level: 'ADVANCED',
                    create_source_map: 'build/zz-core-tests.min.js.map',
                    warning_level: 'VERBOSE',
                    output_wrapper: '(function(){\n%output%\n}).call(this)\n//# sourceMappingURL=zz-core-tests.min.js.map',
                    debug: true,
                    externs: 'externs/qunit-2.11.2.js'
                }
            },
            plugins: {
                options: {
                    js: [
                        'build/plugins-tests.js'
                    ],
                    js_output_file: 'build/plugins-tests.min.js',
                    compilation_level: 'ADVANCED',
                    create_source_map: 'build/plugins-tests.min.js.map',
                    warning_level: 'VERBOSE',
                    output_wrapper: '(function(){\n%output%\n}).call(this)\n//# sourceMappingURL=plugins-tests.min.js.map',
                    debug: true,
                    externs: [
                        'externs/qunit-2.11.2.js',
                        'externs/velocity.js'
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-concat');
    
    require('google-closure-compiler').grunt(grunt, {
        platform: ['native', 'java', 'javascript'],
        max_parallel_compilations: require('os').cpus().length
    });
    // The load-grunt-tasks plugin won’t automatically load closure-compiler

    grunt.registerTask('default', [
        'concat:simple-core',
        'concat:simple-events',
        'concat:simple-visible',
        'concat:simple-forms',
        'concat:simple-center',
        'concat:simple',
        'concat:multiple-core',
        'concat:multiple-events',
        'concat:multiple-visible',
        'concat:multiple-forms',
        'concat:multiple',
        'concat:plugins',
        'concat:plugin-center-core',
        'concat:plugin-center-full',
        'concat:plugin-events-core',
        'concat:plugin-events-full',
        'concat:plugin-forms-core',
        'concat:plugin-forms-full',
        'concat:plugin-visible-core',
        'concat:plugin-visible-full',
        'concat:zz-core',
        'concat:zz-utils',
        'concat:zz',
        'concat:simple-gcc',
        'concat:multiple-gcc',
        'concat:zz-gcc',
        'concat:plugins-gcc'
    ]);
};
