module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    autoprefixer: {
        dist: {
            files: {
                'css/app.css': 'css/app.css'
            }
        }
    },
    concat: {
      options: {
        stripBanners: true,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("dd-mm-yyyy") %> */',
      },
      dist: {
        src: ['js/jquery.placeholder.js', 'js/jquery.validate.min.js', 'js/lightbox-2.6.min.js', 'js/jquery.easing.1.3.js', 'js/jquery.modal.min.js', 'js/jquery-ui-1.10.4.custom.min.js', 'js/jquery.flexverticalcenter.js', 'js/rangeSlider.min.js', 'js/app.js'],
        dest: 'js/built.js',
      },
    },
    uglify: {
      options: {
        // compress: {
        //   global_defs: {
        //     "DEBUG": false
        //   },
        //   dead_code: true
        // },
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'js/app.min.js': ['js/built.js']
        }
      }
    },
    jade: {
      compile: {
        files: [{
          cwd: 'jade',
          src: ['*.jade'],
          dest: '.',
          expand: true,
          ext: '.html'
        }]
      },
      options: {
        pretty: true,
      }
    },
    compass: {
      dist: {
        options: {
          config: 'config.rb'
        }
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'i',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'i',
        }]
      }
    },
    watch: {
      grunt: { files: ['Gruntfile.js'] },

      compass: {
        files: 'scss/**/*.scss',
        tasks: ['compass', 'autoprefixer']
      },
      jade: {
        files: ['jade/**/*.jade'],
        tasks: ['jade'],
      },
      imagemin: {
        files: ['i/**/*.{png,jpg,gif}'],
        tasks: ['imagemin'],
      }
    },
    connect: {
      server: {
        options: {
          port: 3000,
          dest: '.'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  //grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('build', ['compass']);
  // grunt.registerTask('default', ['connect', 'build','watch','jade','imagemin','concat','uglify']);
  grunt.registerTask('default', ['connect', 'build','watch','jade','concat','uglify']);
}