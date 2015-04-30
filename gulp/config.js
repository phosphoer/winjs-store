var dest = "./build";
var src = "./src";

module.exports = {
  browserSync: {
    server: {
      // Serve up our build folder
      baseDir: dest
    }
  },
  css: {
    src: src + "/**/*.css",
    dest: dest 
  },
  images: {
    src: "./images/**/*",
    dest: dest + '/images'
  },
  markup: {
    src: src + "/**/*.html",
    dest: dest
  },
  lib: {
    src: "./lib/**/*",
    dest: dest + '/lib'
  },
  ts: {
    src: src + "/**/*.ts",
    dest: dest
  },
  js: {
    src: src + "/**/*.js",
    dest: dest
  }
};
