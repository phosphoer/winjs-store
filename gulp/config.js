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
  markup: {
    src: src + "/**/*.html",
    dest: dest
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
