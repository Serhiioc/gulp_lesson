const { src, dest, watch, parallel, series,} = require("gulp");
const  scss = require("gulp-sass");
const  prefix = require("gulp-autoprefixer");
const  sync = require("browser-sync").create();
const  imgmin = require("gulp-imagemin");
const  ttf2woff = require("gulp-ttf2woff");
const  ttf2woff2 = require("gulp-ttf2woff2");
const  fs = require("fs");
const  fileinclude = require("gulp-file-include");
const  rename = require("gulp-rename");
const  del = require("del");
const  groupmedia = require("gulp-group-css-media-queries");
const  cleancss = require("gulp-clean-css");
const  babel = require("gulp-babel");  
const  _webp = require("gulp-webp");
const  webphtml = require("gulp-webp-html");


//! Папки сборки
let source_folder = "app";
let project_folder = require("path").basename(__dirname);

// ! Массив значений
let parth = {
  build: {
    html: project_folder + "/",
    css: project_folder + "/css",
    js: project_folder + "/js",
    fonts: project_folder + "/fonts",
    img: project_folder + "/img",
  },
  src: {
    htmlpart: source_folder + "/**/*.html",
    html: source_folder + "/index.html",
    css: source_folder + "/scss/*.scss",
    fontScss: source_folder + "/scss/_fonts.scss",
    js: source_folder + "/js/common.js",
    fonts: source_folder + "/fonts/*.ttf",
    img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
  },
  watch: {
    html: source_folder + "/**/*.html",
    css: source_folder + "/scss/**/*.scss",
    js: source_folder + "/js/**/*.js",
    img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}", 
  },
  clean: "./" + project_folder + "/"
};

// ! Создание папок
function createFolders() {
  return src("*.*", { read: false })
    .pipe(dest("./app/scss/parts"))
    .pipe(dest("./app/js/"))
    .pipe(dest("./app/img/"))
    .pipe(dest("./app/fonts/"))
    .pipe(dest("./app/partsHtml/"));
};

// ! Создание файлов
function createFiles(done) {
  createFolders();

  setTimeout(() => {
    fs.writeFile("./app/index.html", "", function (err) {
      if (err) {
        throw err;
      }
      console.log("File greated");
    });
    fs.writeFile(
      "./app/scss/style.scss", "", function (err) {
        if (err) {
          throw err;
        }
        console.log("File greated");
      }
    );
    fs.writeFile("./app/scss/_basic.scss", "", function (err) {
      if (err) {
        throw err;
      }
      console.log("File greated");
    });
    fs.writeFile("./app/scss/_mixin.scss", "", function (err) {
      if (err) {
        throw err;
      }
      console.log("File greated");
    });
    fs.writeFile(
      "./app/js/common.js",
      'document.addEventListener("DOMContentLoaded", function() {});',
      function (err) {
        if (err) {
          throw err;
        }
        console.log("File greated");
      }
    );
  }, 500);

  done();
};

// ! Создание файлов верстки
function html() {
  return src(parth.src.html)
  .pipe(fileinclude({
    prefix: '@@',
    basepath: '@file'
  }))
  .pipe(dest(parth.build.html))
};

// ! Конвертиррование для разработки
const styles = () => {
  return src (parth.src.css)
  .pipe(
    scss({
      outputStyle: "compressed"
    })
  )
  .pipe(
    rename({
      extname: ".min.css"
    })
  )
  .pipe(dest(parth.build.css))
}

// ! Конвертация стилей
function convertStyles() {
  return src(parth.src.css)
  .pipe(scss({
    outputStyle: "expanded"
  }))
  .pipe(
    prefix({
      cascade: true
    })
  )
  .pipe(groupmedia())
  .pipe(dest(parth.build.css))
  .pipe(cleancss({debug: true}, (details) => {
    console.log(`${details.name}: ${details.stats.originalSize}`);
    console.log(`${details.name}: ${details.stats.minifiedSize}`);
  }))
  .pipe(
    rename({
      extname: ".min.css"
    })
  )
  .pipe(dest(parth.build.css))
  .pipe(sync.stream())
};

// ! Сжатие картинок
function imageMin() {
  return src(parth.src.img)
  // .pipe(_webp({
  //   quality: 70
  // }))
  // .pipe(dest(parth.build.img))
  // .pipe(src(parth.src.img))
  .pipe(
    imgmin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      interlaced: true,
      optimizationLevel: 3 // 0 to7
  })
  )
  .pipe(dest(parth.build.img))
};

// ! Скрипт для розработки
const jsIn = () => {
  return src(parth.src.js)
  .pipe(fileinclude())
  .pipe(
    rename({
      extname: ".min.js"
    })
  )
  .pipe(dest(parth.build.js))
  .pipe(sync.stream())
}

// ! Создание файлов скрипта
function js() {
  return src(parth.src.js)
  .pipe(fileinclude())
  .pipe(dest(parth.build.js))
  .pipe(
    babel({
    presets: ['@babel/env'],
    plugins: ["@babel/plugin-transform-arrow-functions"]
    })
  )
  .pipe(
    rename({
      extname: ".min.js"
    })
  )
  .pipe(dest(parth.build.js))
  .pipe(sync.stream())
}

// ! Очистка папки проекта
function clean () {
  return del(parth.clean)
};

// ! Слижение измениний
function watchFiles() {
  watch([parth.watch.html], html);
  watch([parth.watch.css], convertStyles);
  watch([parth.watch.img], imageMin);
  watch([parth.watch.js], js);
  watch([parth.watch.html]).on("change", sync.reload)
  watch([parth.watch.css]).on("change", sync.reload)
};

// ! Просмотр результата в браузере
function browserSync() {
  sync.init({
    server: {
      baseDir: "./" + project_folder + "/"
    },
    // browser: ["chrome", "firefox"], //! Открытие в нескольких браузерах
    notify: false,
    // reloadOnRestart: false,
  });
};


//! Шрифты

const fontVals = {
	thin: 100,
	thinitalic: 100,
	light: 300,
	lightitalic: 300,
	regular: 400,
	regularitalic: 400,
	medium: 500,
	mediumitalic: 500,
	semibold: 600,
	semibolditalic: 600,
	bold: 700,
	bolditalic: 700,
	extrabold: 800,
	extrabolditalic: 800,
	black: 900,
	blackitalic: 900,
};
const fontWeight = (font) => {
	for (let item of Object.keys(fontVals)) {
		if (font.toLowerCase().includes(item)) {
			return fontVals[item];
		}
	}
};

const convertFonts = () => {
  src(parth.src.fonts).pipe(ttf2woff()).pipe(dest(parth.build.fonts));
  return src(parth.src.fonts).pipe(ttf2woff2()).pipe(dest(parth.build.fonts));
}

const fontScss = source_folder + "/scss/_fonts.scss";

const cleanFonts = (done) => {
   del(parth.src.fontScss)
  setTimeout(() => {
    fs.writeFile(
      parth.src.fontScss, "", function (err) {
        if (err) {
          throw err;
        }
        console.log("File greated");
      }
    );
  }, 500);
  done();
}

const fontsStyle = (done) => {
	let file_content = fs.readFileSync(fontScss);
	fs.readdir("app/fonts", function (err, items) {
		try {
			if (items) {
				let c_fontname;
				for (let i = 0; i < items.length; i++) {
					let fontname = items[i].split(".");
					fontname = fontname[0];
					if (c_fontname != fontname) {
						fs.appendFile(`${fontScss}`, `@include font-face("${fontname}", "${fontname}", ${fontWeight(fontname)});\r\n`, () => {});
					}
					c_fontname = fontname;
				}
			}
		} catch (err) {
			throw err;
		}
  });
  done();
};

// ! Глобализация функций
let assembly = series(clean, parallel(html, styles, jsIn, imageMin));

let build = series(clean, parallel(html, convertStyles, js, imageMin));

exports.assembly = assembly;
exports.build = build;
exports.js = js;
exports.clean = clean;
exports.html = html;
exports.watchFiles = watchFiles;
exports.browserSync = browserSync;
exports.imageMin = imageMin;

// ! Задача создания исходных папок и файлов
exports.struct = createFiles;

// ! Вызов конвертации шрифтов
exports.saveFonts = series(cleanFonts, convertFonts, fontsStyle);

// ! Основная задача галп
exports.default = parallel(assembly, watchFiles, browserSync);
exports.final = parallel(build, watchFiles, browserSync);





// * Функции на будущие


// ! перемение ля svg
/*
const  svgsprite = require("gulp-svg-sprite");
const  svgmin = require('gulp-svgmin');
const  cheerio = require('gulp-cheerio');
const  replace = require('gulp-replace');
*/
// ! Сжатие svg
/*
function svgSprite() {
  return src([source_folder + '/iconsprite/*.svg'])
  .pipe(svgmin({
    js2svg: {
      pretty: true
    }
  }))
  .pipe(cheerio({
    run: function ($) {
      $('[fill]').removeAttr('fill');
      $('[stroke]').removeAttr('stroke');
      $('[style]').removeAttr('style');
    },
    parserOptions: {xmlMode: true}
  }))
  .pipe(svgsprite({
    mode: {
      stack: {
        sprite: "../icons/icons.svg",
        // example: true
      }
    },
  }))
  .pipe(dest(parth.build.img))
};

// ? Вызов функции сжатия
exports.svgSprite = svgSprite;

*/

//! добавление кода с поддержкой webp
/*
const addWebpToHtml = () => {
	return src(parth.build.html).pipe(webphtml()).pipe(dest(parth.build.html));
};

exports.addWebpToHtml = addWebpToHtml;
*/
