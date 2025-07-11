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
            },
            'closures-full': {
                options: {
                    archive: 'build/zzDOM-closures-full.min.js.tar.gz'
                },
                files: [
                    {
                        src: [ 'build/zzDOM-closures-full.min.js' ]
                    }
                ]
            },
            'closures-core': {
                options: {
                    archive: 'build/zzDOM-closures-core.min.js.tar.gz'
                },
                files: [
                    {
                        src: [ 'build/zzDOM-closures-core.min.js' ]
                    }
                ]
            }
        },
        concat: {
            options: {
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd HH:M:s") %> */\n'
            },
            'simple-closures-core': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/simple-closures-core.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/simple.body.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/simple-closures-core.html',
                nonull: true
            },
            'simple-closures-events': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/simple-closures-events.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/simple.body.events.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/simple-closures-events.html',
                nonull: true
            },
            'simple-closures-visible': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/simple-closures-visible.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/simple.body.visible.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/simple-closures-visible.html',
                nonull: true
            },
            'simple-closures-forms': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/simple-closures-forms.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/simple.body.forms.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/simple-closures-forms.html',
                nonull: true
            },
            'simple-closures-center': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/simple-closures-center.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/simple.body.center.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/simple-closures-center.html',
                nonull: true
            },
            'simple-closures': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/simple-closures.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/simple.body.html',
                    'test/body/simple.body.events.html',
                    'test/body/simple.body.visible.html',
                    'test/body/simple.body.forms.html',
                    'test/body/simple.body.center.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/simple-closures.html',
                nonull: true
            },
            'multiple-closures-core': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/multiple-closures-core.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/multiple.body.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/multiple-closures-core.html',
                nonull: true
            },
            'multiple-closures-events': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/multiple-closures-events.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/multiple.body.events.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/multiple-closures-events.html',
                nonull: true
            },
            'multiple-closures-visible': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/multiple-closures-visible.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/multiple.body.visible.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/multiple-closures-visible.html',
                nonull: true
            },
            'multiple-closures-forms': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/multiple-closures-forms.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/multiple.body.forms.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/multiple-closures-forms.html',
                nonull: true
            },
            'multiple-closures': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/multiple-closures.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/multiple.body.html',
                    'test/body/multiple.body.events.html',
                    'test/body/multiple.body.visible.html',
                    'test/body/multiple.body.forms.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/multiple-closures.html',
                nonull: true
            },
            'plugin-center-closures-core': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/plugin-center-closures-core.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/plugin-center-closures-core.html',
                nonull: true
            },
            'plugin-center-closures-full': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/plugin-center-closures-full.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/plugin-center-closures-full.html',
                nonull: true
            },
            'plugin-events-closures-core': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/plugin-events-closures-core.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/plugin-events-closures-core.html',
                nonull: true
            },
            'plugin-events-closures-full': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/plugin-events-closures-full.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/plugin-events-closures-full.html',
                nonull: true
            },
            'plugin-forms-closures-core': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/plugin-forms-closures-core.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/plugin-forms-closures-core.html',
                nonull: true
            },
            'plugin-forms-closures-full': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/plugin-forms-closures-full.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/plugin-forms-closures-full.html',
                nonull: true
            },
            'plugin-visible-closures-core': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/plugin-visible-closures-core.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/plugin-visible-closures-core.html',
                nonull: true
            },
            'plugin-visible-closures-full': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/plugin-visible-closures-full.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/plugin-visible-closures-full.html',
                nonull: true
            },
            gcc: {
                src: [
                    'src/zzDOM.js', 
                    'src/zzDOM-events.js',
                    'src/zzDOM-visible.js',
                    'src/zzDOM-utils.js',
                    'src/ss.js', 
                    'src/ss-events.js', 
                    'src/ss-visible.js', 
                    'src/ss-forms.js',
                    'src/ss-center.js',
                    'src/mm-gcc.js',
                    'src/plugin-center.js',
                    'src/plugin-events.js',
                    'src/plugin-forms.js',
                    'src/plugin-visible.js',
                    'src/export.js'
                ],
                dest: 'build/zzDOM-gcc.js',
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
            'simple-gcc-concat': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/simple-gcc-concat.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/simple.body.html',
                    'test/body/simple.body.events.html',
                    'test/body/simple.body.visible.html',
                    'test/body/simple.body.forms.html',
                    'test/body/simple.body.center.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/simple-gcc-concat.html',
                nonull: true
            },
            'simple-gcc-debug': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/simple-gcc-debug.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/simple.body.html',
                    'test/body/simple.body.events.html',
                    'test/body/simple.body.visible.html',
                    'test/body/simple.body.forms.html',
                    'test/body/simple.body.center.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/simple-gcc-debug.html',
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
            'multiple-gcc-concat': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/multiple-gcc-concat.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/multiple.body.html',
                    'test/body/multiple.body.events.html',
                    'test/body/multiple.body.visible.html',
                    'test/body/multiple.body.forms.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/multiple-gcc-concat.html',
                nonull: true
            },
            'multiple-gcc-debug': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/multiple-gcc-debug.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/multiple.body.html',
                    'test/body/multiple.body.events.html',
                    'test/body/multiple.body.visible.html',
                    'test/body/multiple.body.forms.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/multiple-gcc-debug.html',
                nonull: true
            },
            'plugins-closures': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/plugins-closures.head.html',
                    'test/body/plugins.body.html'
                ],
                dest: 'test/plugins-closures.html',
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
            },
            'plugins-gcc-concat': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/plugins-gcc-concat.head.html',
                    'test/body/plugins.body.html'
                ],
                dest: 'test/plugins-gcc-concat.html',
                nonull: true
            },
            'plugins-gcc-debug': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/plugins-gcc-debug.head.html',
                    'test/body/plugins.body.html'
                ],
                dest: 'test/plugins-gcc-debug.html',
                nonull: true
            },
            'zz-closures-core': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/zz-closures-core.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/zz.body.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/zz-closures-core.html',
                nonull: true
            },
            'zz-closures-utils': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/zz-closures-utils.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/zz.body.utils.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/zz-closures-utils.html',
                nonull: true
            },
            'zz-closures': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/zz-closures.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/zz.body.html',
                    'test/body/zz.body.utils.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/zz-closures.html',
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
            'zz-gcc-concat': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/zz-gcc-concat.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/zz.body.html',
                    'test/body/zz.body.utils.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/zz-gcc-concat.html',
                nonull: true
            },
            'zz-gcc-debug': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/zz-gcc-debug.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/zz.body.html',
                    'test/body/zz.body.utils.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/zz-gcc-debug.html',
                nonull: true
            }
        },
        uglify: {
            closures: {
                files: {
                    'build/zzDOM-closures-full.min.js': [ 'build/zzDOM-closures-full.js' ],
                    'build/zzDOM-closures-core.min.js': [ 'build/zzDOM-closures-core.js' ],
                    'build/zzDOM-plugin-events.min.js': [ 'build/zzDOM-plugin-events.js' ],
                    'build/zzDOM-plugin-visible.min.js': [ 'build/zzDOM-plugin-visible.js' ],
                    'build/zzDOM-plugin-utils.min.js': [ 'build/zzDOM-plugin-utils.js' ],
                    'build/zzDOM-plugin-forms.min.js': [ 'build/zzDOM-plugin-forms.js' ],
                    'build/zzDOM-plugin-center.min.js': [ 'build/zzDOM-plugin-center.js' ]
                }
            },
            gcc: {
                files: {
                    'build/zzDOM-gcc.min.js': [ 'build/zzDOM-gcc.js' ]
                }
            }
        },
        copy: {
            standalone: {
                src: 'build/zzDOM.js',
                dest: 'docs/lib/zzDOM.js'
            },
            standaloneMin: {
                src: 'build/zzDOM.min.js',
                dest: 'docs/lib/zzDOM.min.js'
            }
        },
        'closure-compiler': {
            simple: {
                options: {
                    js: [
                        'src/zzDOM.js',
                        'src/zzDOM-events.js',
                        'src/zzDOM-visible.js',
                        'src/zzDOM-utils.js',
                        'src/ss.js', 
                        'src/ss-events.js', 
                        'src/ss-visible.js', 
                        'src/ss-forms.js',
                        'src/ss-center.js',
                        'src/mm-gcc.js',
                        'src/plugin-center.js',
                        'src/plugin-events.js',
                        'src/plugin-forms.js',
                        'src/plugin-visible.js',
                        'test/src/app/htmlComparator.js',
                        'test/src/app/utils.js',
                        'test/src/app/simple.js',
                        'test/src/app/simple.events.js',
                        'test/src/app/simple.visible.js',
                        'test/src/app/simple.forms.js',
                        'test/src/app/simple.center.js'
                    ],
                    js_output_file: 'build/simple-tests.min.js',
                    compilation_level: 'ADVANCED',
                    create_source_map: 'build/simple-tests.min.js.map',
                    warning_level: 'VERBOSE',
                    output_wrapper: '(function(){\n%output%\n}).call(this)\n//# sourceMappingURL=simple-tests.min.js.map',
                    debug: true,
                    externs: 'externs/qunit-2.11.2.js'
                }
            },
            multiple: {
                options: {
                    js: [
                        'src/zzDOM.js', 
                        'src/zzDOM-events.js',
                        'src/zzDOM-visible.js',
                        'src/zzDOM-utils.js',
                        'src/ss.js', 
                        'src/ss-events.js', 
                        'src/ss-visible.js', 
                        'src/ss-forms.js',
                        'src/ss-center.js',
                        'src/mm-gcc.js',
                        'src/plugin-center.js',
                        'src/plugin-events.js',
                        'src/plugin-forms.js',
                        'src/plugin-visible.js',
                        'test/src/app/htmlComparator.js',
                        'test/src/app/utils.js',
                        'test/src/app/multiple.js',
                        'test/src/app/multiple.events.js',
                        'test/src/app/multiple.visible.js',
                        'test/src/app/multiple.forms.js'
                    ],
                    js_output_file: 'build/multiple-tests.min.js',
                    compilation_level: 'ADVANCED',
                    create_source_map: 'build/multiple-tests.min.js.map',
                    warning_level: 'VERBOSE',
                    output_wrapper: '(function(){\n%output%\n}).call(this)\n//# sourceMappingURL=multiple-tests.min.js.map',
                    debug: true,
                    externs: 'externs/qunit-2.11.2.js'
                }
            },
            zz: {
                options: {
                    js: [
                        'src/zzDOM.js', 
                        'src/zzDOM-events.js',
                        'src/zzDOM-visible.js',
                        'src/zzDOM-utils.js',
                        'src/ss.js', 
                        'src/ss-events.js', 
                        'src/ss-visible.js', 
                        'src/ss-forms.js',
                        'src/ss-center.js',
                        'src/mm-gcc.js',
                        'src/plugin-center.js',
                        'src/plugin-events.js',
                        'src/plugin-forms.js',
                        'src/plugin-visible.js',
                        'test/src/app/htmlComparator.js',
                        'test/src/app/utils.js',
                        'test/src/app/zz.js',
                        'test/src/app/zz.utils.js'
                    ],
                    js_output_file: 'build/zz-tests.min.js',
                    compilation_level: 'ADVANCED',
                    create_source_map: 'build/zz-tests.min.js.map',
                    warning_level: 'VERBOSE',
                    output_wrapper: '(function(){\n%output%\n}).call(this)\n//# sourceMappingURL=zz-tests.min.js.map',
                    debug: true,
                    externs: 'externs/qunit-2.11.2.js'
                }
            },
            plugins: {
                options: {
                    js: [
                        'src/zzDOM.js', 
                        'src/zzDOM-events.js',
                        'src/zzDOM-visible.js',
                        'src/zzDOM-utils.js',
                        'src/ss.js', 
                        'src/ss-events.js', 
                        'src/ss-visible.js', 
                        'src/ss-forms.js',
                        'src/ss-center.js',
                        'src/mm-gcc.js',
                        'src/plugin-center.js',
                        'src/plugin-events.js',
                        'src/plugin-forms.js',
                        'src/plugin-visible.js',
                        'test/src/app/htmlComparator.js',
                        'test/src/app/utils.js',
                        'test/src/app/plugins.js'
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
            },
            'plugins-sample': {
                options: {
                    js: [
                        'src/zzDOM.js', 
                        'src/zzDOM-events.js',
                        'src/zzDOM-visible.js',
                        'src/zzDOM-utils.js',
                        'src/ss.js', 
                        'src/ss-events.js', 
                        'src/ss-visible.js', 
                        'src/ss-forms.js',
                        'src/ss-center.js',
                        'src/mm-gcc.js',
                        'src/plugin-center.js',
                        'src/plugin-events.js',
                        'src/plugin-forms.js',
                        'src/plugin-visible.js',
                        'samples/plugins-sample.js'
                    ],
                    js_output_file: 'build/plugins-sample.min.js',
                    compilation_level: 'ADVANCED',
                    create_source_map: 'build/plugins-sample.min.js.map',
                    warning_level: 'VERBOSE',
                    output_wrapper: '(function(){\n%output%\n}).call(this)\n//# sourceMappingURL=plugins-sample.min.js.map',
                    debug: true,
                    externs: [
                        'externs/velocity.js'
                    ]
                }
            },
            sample: {
                options: {
                    js: [
                        'src/zzDOM.js', 
                        'src/zzDOM-events.js',
                        'src/zzDOM-visible.js',
                        'src/zzDOM-utils.js',
                        'src/ss.js', 
                        'src/ss-events.js', 
                        'src/ss-visible.js', 
                        'src/ss-forms.js',
                        'src/ss-center.js',
                        'src/mm-gcc.js',
                        'src/plugin-center.js',
                        'src/plugin-events.js',
                        'src/plugin-forms.js',
                        'src/plugin-visible.js',
                        'samples/sample.js'
                    ],
                    js_output_file: 'build/sample.min.js',
                    compilation_level: 'ADVANCED',
                    create_source_map: 'build/sample.min.js.map',
                    warning_level: 'VERBOSE',
                    output_wrapper: '(function(){\n%output%\n}).call(this)\n//# sourceMappingURL=sample.min.js.map',
                    debug: true
                }
            },
            minimal: {
                options: {
                    js: [
                        'samples/minimal1.js',
                        'samples/minimal2.js'
                    ],
                    js_output_file: 'build/minimal.min.js',
                    compilation_level: 'ADVANCED',
                    create_source_map: 'build/minimal.min.js.map',
                    warning_level: 'VERBOSE',
                    output_wrapper: '(function(){\n%output%\n}).call(this)\n//# sourceMappingURL=minimal.min.js.map',
                    debug: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    
    require('google-closure-compiler').grunt(grunt, {
        platform: ['native', 'java', 'javascript'],
        max_parallel_compilations: require('os').cpus().length
    });
    // The load-grunt-tasks plugin won’t automatically load closure-compiler

    grunt.registerTask('test', ['qunit']);
    grunt.registerTask('buildMain', [
        'concat:closures-full', 
        'concat:closures-core',
        'concat:gcc', 
        'concat:plugin-events', 
        'concat:plugin-visible', 
        'concat:plugin-utils', 
        'concat:plugin-forms', 
        'concat:plugin-center', 
        'uglify', 
        'compress:closures-full',
        'compress:closures-core',
        'closure-compiler'
    ]);
    grunt.registerTask('buildTests', [
        'concat:simple-closures-core',
        'concat:simple-closures-events',
        'concat:simple-closures-visible',
        'concat:simple-closures-forms',
        'concat:simple-closures-center',
        'concat:simple-closures',
        'concat:multiple-closures-core',
        'concat:multiple-closures-events',
        'concat:multiple-closures-visible',
        'concat:multiple-closures-forms',
        'concat:multiple-closures', 
        'concat:plugin-center-closures-core',
        'concat:plugin-center-closures-full',
        'concat:plugin-events-closures-core',
        'concat:plugin-events-closures-full',
        'concat:plugin-forms-closures-core',
        'concat:plugin-forms-closures-full',
        'concat:plugin-visible-closures-core',
        'concat:plugin-visible-closures-full',
        'concat:multiple-gcc',
        'concat:multiple-gcc-concat',
        'concat:multiple-gcc-debug',
        'concat:plugins-closures',
        'concat:zz-closures-core',
        'concat:zz-closures-utils',
        'concat:zz-closures',
        'concat:plugins-gcc',
        'concat:plugins-gcc-concat',
        'concat:plugins-gcc-debug',
        'concat:simple-gcc',
        'concat:simple-gcc-concat',
        'concat:simple-gcc-debug',
        'concat:zz-gcc',
        'concat:zz-gcc-concat',
        'concat:zz-gcc-debug'
    ]);
    grunt.registerTask('updateWeb', [
        'concat',
        'uglify',
        'copy:standaloneMin',
        'copy:standalone'
    ]);
    grunt.registerTask('default', [
        'buildMain',
        'buildTests'
    ]);
};
