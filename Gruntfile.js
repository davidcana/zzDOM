module.exports = function(grunt) {
    
    grunt.initConfig({
        pkg: grunt.file.readJSON( 'package.json' ),
        browserify: {
            'node-core-simple-browserify': {
                options: {
                    browserifyOptions: {
                        debug: true
                    }
                },
                src: 'build/node-core-simple.js',
                dest: 'build/node-core-simple.browserify.js'
            },
            'node-zz-simple-browserify': {
                options: {
                    browserifyOptions: {
                        debug: true
                    }
                },
                src: 'build/node-zz-simple.js',
                dest: 'build/node-zz-simple.browserify.js'
            },
            'node-plugin-center-simple-browserify': {
                options: {
                    browserifyOptions: {
                        debug: true
                    }
                },
                src: 'build/node-plugin-center-simple.js',
                dest: 'build/node-plugin-center-simple.browserify.js'
            },
            'node-plugin-events-simple-browserify': {
                options: {
                    browserifyOptions: {
                        debug: true
                    }
                },
                src: 'build/node-plugin-events-simple.js',
                dest: 'build/node-plugin-events-simple.browserify.js'
            },
            'node-plugin-forms-simple-browserify': {
                options: {
                    browserifyOptions: {
                        debug: true
                    }
                },
                src: 'build/node-plugin-forms-simple.js',
                dest: 'build/node-plugin-forms-simple.browserify.js'
            },
            'node-plugin-utils-browserify': {
                options: {
                    browserifyOptions: {
                        debug: true
                    }
                },
                src: 'build/node-plugin-utils.js',
                dest: 'build/node-plugin-utils.browserify.js'
            },
            'node-plugin-visible-simple-browserify': {
                options: {
                    browserifyOptions: {
                        debug: true
                    }
                },
                src: 'build/node-plugin-visible-simple.js',
                dest: 'build/node-plugin-visible-simple.browserify.js'
            },
            'node-full-simple-browserify': {
                options: {
                    browserifyOptions: {
                        debug: true
                    }
                },
                src: 'build/node-full-simple.js',
                dest: 'build/node-full-simple.browserify.js'
            },
            'node-core-multiple-browserify': {
                options: {
                    browserifyOptions: {
                        debug: true
                    }
                },
                src: 'build/node-core-multiple.js',
                dest: 'build/node-core-multiple.browserify.js'
            },
            'node-zz-multiple-browserify': {
                options: {
                    browserifyOptions: {
                        debug: true
                    }
                },
                src: 'build/node-zz-multiple.js',
                dest: 'build/node-zz-multiple.browserify.js'
            }
        },
        qunit: {
            browser: {
                options: {
                    timeout: 60000,
                    urls: [
                        'http://localhost:9000/test/simple-closures-core.html',
                        'http://localhost:9000/test/simple-closures-events.html',
                        'http://localhost:9000/test/simple-closures-visible.html',
                        'http://localhost:9000/test/simple-closures-forms.html',
                        'http://localhost:9000/test/simple-closures-center.html',
                        'http://localhost:9000/test/simple-closures.html',
                        'http://localhost:9000/test/multiple-closures-core.html',
                        'http://localhost:9000/test/multiple-closures-events.html',
                        'http://localhost:9000/test/multiple-closures-visible.html',
                        'http://localhost:9000/test/multiple-closures-forms.html',
                        'http://localhost:9000/test/multiple-closures.html',
                        'http://localhost:9000/test/zz-closures-core.html',
                        'http://localhost:9000/test/zz-closures-utils.html',
                        'http://localhost:9000/test/zz-closures.html',
                        'http://localhost:9000/test/plugins-closures.html',
                        'http://localhost:9000/test/simple-gcc.html',
                        'http://localhost:9000/test/multiple-gcc.html',
                        'http://localhost:9000/test/zz-gcc.html',
                        'http://localhost:9000/test/plugins-gcc.html',
                        'http://localhost:9000/test/simple-closures-concat.html',
                        'http://localhost:9000/test/multiple-closures-concat.html',
                        'http://localhost:9000/test/zz-closures-concat.html',
                        'http://localhost:9000/test/plugins-closures-concat.html',
                        'http://localhost:9000/test/simple-gcc-concat.html',
                        'http://localhost:9000/test/multiple-gcc-concat.html',
                        'http://localhost:9000/test/zz-gcc-concat.html',
                        'http://localhost:9000/test/plugins-gcc-concat.html',
                        'http://localhost:9000/test/multiple-gcc-debug.html',
                        'http://localhost:9000/test/plugins-gcc-debug.html',
                        'http://localhost:9000/test/simple-gcc-debug.html',
                        'http://localhost:9000/test/zz-gcc-debug.html'
                    ]
                }
            }
        },
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
            'closures-full': {
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
                    'src/mm-closures.js',
                    'src/export.js'
                ],
                dest: 'build/zzDOM-closures-full.js',
                nonull: true
            },
            'closures-core': {
                src: [
                    'src/zzDOM.js', 
                    'src/ss.js', 
                    'src/mm-closures.js',
                    'src/export.js'
                ],
                dest: 'build/zzDOM-closures-core.js',
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
                    'src/export.js'
                ],
                dest: 'build/zzDOM-gcc.js',
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
            'multiple-closures-concat': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/multiple-closures-concat.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/multiple.body.html',
                    'test/body/multiple.body.events.html',
                    'test/body/multiple.body.visible.html',
                    'test/body/multiple.body.forms.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/multiple-closures-concat.html',
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
            'plugins-closures-concat': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/plugins-closures-concat.head.html',
                    'test/body/plugins.body.html'
                ],
                dest: 'test/plugins-closures-concat.html',
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
            'simple-closures-concat': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/simple-closures-concat.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/simple.body.html',
                    'test/body/simple.body.events.html',
                    'test/body/simple.body.visible.html',
                    'test/body/simple.body.forms.html',
                    'test/body/simple.body.center.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/simple-closures-concat.html',
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
            'zz-closures-concat': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/zz-closures-concat.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/zz.body.html',
                    'test/body/zz.body.utils.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/zz-closures-concat.html',
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
            },
            'plugin-events': {
                options: {
                    banner: ''
                },
                src: [
                    'src/zzDOM-events.js',
                    'src/ss-events.js',
                    'src/plugin-events.js'
                ],
                dest: 'build/zzDOM-plugin-events.js',
                nonull: true
            },
            'plugin-events-node': {
                options: {
                    banner: ''
                },
                src: [
                    'src/core-require.js',
                    'src/zzDOM-events.js',
                    'src/ss-events.js',
                    'src/plugin-events.js'
                ],
                dest: 'build/zzDOM-plugin-events-node.js',
                nonull: true
            },
            'plugin-visible': {
                options: {
                    banner: ''
                },
                src: [
                    'src/zzDOM-visible.js',
                    'src/ss-visible.js',
                    'src/plugin-visible.js'
                ],
                dest: 'build/zzDOM-plugin-visible.js',
                nonull: true
            },
            'plugin-visible-node': {
                options: {
                    banner: ''
                },
                src: [
                    'src/core-require.js',
                    'src/zzDOM-visible.js',
                    'src/ss-visible.js',
                    'src/plugin-visible.js'
                ],
                dest: 'build/zzDOM-plugin-visible-node.js',
                nonull: true
            },
            'plugin-utils': {
                options: {
                    banner: ''
                },
                src: [
                    'src/zzDOM-utils.js'
                ],
                dest: 'build/zzDOM-plugin-utils.js',
                nonull: true
            },
            'plugin-utils-node': {
                options: {
                    banner: ''
                },
                src: [
                    'src/core-require.js',
                    'src/zzDOM-utils.js'
                ],
                dest: 'build/zzDOM-plugin-utils-node.js',
                nonull: true
            },
            'plugin-forms': {
                options: {
                    banner: ''
                },
                src: [
                    'src/ss-forms.js',
                    'src/plugin-forms.js'
                ],
                dest: 'build/zzDOM-plugin-forms.js',
                nonull: true
            },
            'plugin-forms-node': {
                options: {
                    banner: ''
                },
                src: [
                    'src/core-require.js',
                    'src/ss-forms.js',
                    'src/plugin-forms.js'
                ],
                dest: 'build/zzDOM-plugin-forms-node.js',
                nonull: true
            },
            'plugin-center': {
                options: {
                    banner: ''
                },
                src: [
                    'src/ss-center.js',
                    'src/plugin-center.js'
                ],
                dest: 'build/zzDOM-plugin-center.js',
                nonull: true
            },
            'plugin-center-node': {
                options: {
                    banner: ''
                },
                src: [
                    'src/core-require.js',
                    'src/ss-center.js',
                    'src/plugin-center.js'
                ],
                dest: 'build/zzDOM-plugin-center-node.js',
                nonull: true
            },
            'node-core-simple-js': {
                options: {
                    banner: ''
                },
                src: [
                    'test/src/app/node-core.header.js',
                    'test/src/app/simple.js'
                ],
                dest: 'build/node-core-simple.js',
                nonull: true
            },
            'node-core-simple-html': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/node-core-simple.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/simple.body.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/node-core-simple.html',
                nonull: true
            },
            'node-zz-simple-js': {
                options: {
                    banner: ''
                },
                src: [
                    'test/src/app/node-zz.header.js',
                    'test/src/app/simple.js'
                ],
                dest: 'build/node-zz-simple.js',
                nonull: true
            },
            'node-zz-simple-html': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/node-zz-simple.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/simple.body.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/node-zz-simple.html',
                nonull: true
            },
            'node-plugin-center-simple-js': {
                options: {
                    banner: ''
                },
                src: [
                    'test/src/app/node-plugin-center.header.js',
                    'test/src/app/simple.center.js'
                ],
                dest: 'build/node-plugin-center-simple.js',
                nonull: true
            },
            'node-plugin-center-simple-html': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/node-plugin-center-simple.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/simple.body.center.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/node-plugin-center-simple.html',
                nonull: true
            },
            'node-plugin-events-simple-js': {
                options: {
                    banner: ''
                },
                src: [
                    'test/src/app/node-plugin-events.header.js',
                    'test/src/app/simple.events.js'
                ],
                dest: 'build/node-plugin-events-simple.js',
                nonull: true
            },
            'node-plugin-events-simple-html': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/node-plugin-events-simple.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/simple.body.events.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/node-plugin-events-simple.html',
                nonull: true
            },
            'node-plugin-forms-simple-js': {
                options: {
                    banner: ''
                },
                src: [
                    'test/src/app/node-plugin-forms.header.js',
                    'test/src/app/simple.forms.js'
                ],
                dest: 'build/node-plugin-forms-simple.js',
                nonull: true
            },
            'node-plugin-forms-simple-html': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/node-plugin-forms-simple.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/simple.body.forms.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/node-plugin-forms-simple.html',
                nonull: true
            },
            'node-plugin-utils-js': {
                options: {
                    banner: ''
                },
                src: [
                    'test/src/app/node-plugin-utils.header.js',
                    'test/src/app/zz.utils.js'
                ],
                dest: 'build/node-plugin-utils.js',
                nonull: true
            },
            'node-plugin-utils-html': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/node-plugin-utils.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/zz.body.utils.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/node-plugin-utils.html',
                nonull: true
            },
            'node-plugin-visible-simple-js': {
                options: {
                    banner: ''
                },
                src: [
                    'test/src/app/node-plugin-visible.header.js',
                    'test/src/app/simple.visible.js'
                ],
                dest: 'build/node-plugin-visible-simple.js',
                nonull: true
            },
            'node-plugin-visible-simple-html': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/node-plugin-visible-simple.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/simple.body.visible.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/node-plugin-visible-simple.html',
                nonull: true
            },
            'node-full-simple-js': {
                options: {
                    banner: ''
                },
                src: [
                    'test/src/app/node-zz.header.js',
                    'test/src/app/simple.js',
                    'test/src/app/simple.events.js',
                    'test/src/app/simple.visible.js',
                    'test/src/app/simple.forms.js',
                    'test/src/app/simple.center.js'
                ],
                dest: 'build/node-full-simple.js',
                nonull: true
            },
            'node-full-simple-html': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/node-full-simple.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/simple.body.html',
                    'test/body/simple.body.events.html',
                    'test/body/simple.body.visible.html',
                    'test/body/simple.body.forms.html',
                    'test/body/simple.body.center.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/node-full-simple.html',
                nonull: true
            },
            'node-core-multiple-js': {
                options: {
                    banner: ''
                },
                src: [
                    'test/src/app/node-core.header.js',
                    'test/src/app/multiple.js'
                ],
                dest: 'build/node-core-multiple.js',
                nonull: true
            },
            'node-core-multiple-html': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/node-core-multiple.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/multiple.body.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/node-core-multiple.html',
                nonull: true
            },
            'node-zz-multiple-js': {
                options: {
                    banner: ''
                },
                src: [
                    'test/src/app/node-zz.header.js',
                    'test/src/app/multiple.js'
                ],
                dest: 'build/node-zz-multiple.js',
                nonull: true
            },
            'node-zz-multiple-html': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/node-zz-multiple.head.html',
                    'test/body/body.start-tag.html',
                    'test/body/qunit.html',
                    'test/body/multiple.body.html',
                    'test/body/body.end-tag.html'
                ],
                dest: 'test/node-zz-multiple.html',
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
                        'src/mm-closures.js',
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
        },
        exec: {
            check_node: 'node samples/src/app/node.js'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-exec');
    
    require('google-closure-compiler').grunt(grunt, {
        platform: ['native', 'java', 'javascript'],
        max_parallel_compilations: require('os').cpus().length
    });
    // The load-grunt-tasks plugin won’t automatically load closure-compiler

    grunt.registerTask('test', ['qunit']);
    grunt.registerTask('default', [
        'concat:closures-full', 
        'concat:closures-core',
        'concat:gcc', 
        'concat:plugin-events', 
        'concat:plugin-events-node', 
        'concat:plugin-visible', 
        'concat:plugin-visible-node', 
        'concat:plugin-utils', 
        'concat:plugin-utils-node',
        'concat:plugin-forms', 
        'concat:plugin-forms-node', 
        'concat:plugin-center', 
        'concat:plugin-center-node', 
        'uglify', 
        'compress:closures-full',
        'compress:closures-core',
        'closure-compiler'
    ]);
    grunt.registerTask('buildTests', [
        'concat:multiple-closures-core',
        'concat:multiple-closures-events',
        'concat:multiple-closures-visible',
        'concat:multiple-closures-forms',
        'concat:multiple-closures', 
        'concat:multiple-closures-concat', 
        'concat:multiple-gcc',
        'concat:multiple-gcc-concat',
        'concat:multiple-gcc-debug',
        'concat:plugins-closures',
        'concat:plugins-closures-concat',
        'concat:plugins-gcc',
        'concat:plugins-gcc-concat',
        'concat:plugins-gcc-debug',
        'concat:simple-closures-core',
        'concat:simple-closures-events',
        'concat:simple-closures-visible',
        'concat:simple-closures-forms',
        'concat:simple-closures-center',
        'concat:simple-closures',
        'concat:simple-closures-concat',
        'concat:simple-gcc',
        'concat:simple-gcc-concat',
        'concat:simple-gcc-debug',
        'concat:zz-closures-core',
        'concat:zz-closures-utils',
        'concat:zz-closures',
        'concat:zz-closures-concat',
        'concat:zz-gcc',
        'concat:zz-gcc-concat',
        'concat:zz-gcc-debug',
        'concat:node-core-simple-js',
        'concat:node-core-simple-html',
        'concat:node-zz-simple-js',
        'concat:node-zz-simple-html',
        'concat:node-plugin-center-simple-js',
        'concat:node-plugin-center-simple-html',
        'concat:node-plugin-events-simple-js',
        'concat:node-plugin-events-simple-html',
        'concat:node-plugin-forms-simple-js',
        'concat:node-plugin-forms-simple-html',
        'concat:node-plugin-utils-js',
        'concat:node-plugin-utils-html',
        'concat:node-plugin-visible-simple-js',
        'concat:node-plugin-visible-simple-html',
        'concat:node-full-simple-js',
        'concat:node-full-simple-html',
        'concat:node-core-multiple-js',
        'concat:node-core-multiple-html',
        'concat:node-zz-multiple-js',
        'concat:node-zz-multiple-html'
    ]);
    grunt.registerTask('updateWeb', ['concat', 'uglify', 'copy:standaloneMin', 'copy:standalone']);
    grunt.registerTask('all', ['default', 'buildTests', 'test']);
};
