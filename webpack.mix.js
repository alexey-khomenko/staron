let mix = require('laravel-mix');
mix.pug = require('laravel-mix-pug-recursive');

mix
  .setPublicPath('docs')
  .setResourceRoot('../')
  .copyDirectory('resources/images/*.*', 'docs/images')
  .copyDirectory('resources/favicons/*.*', 'docs/favicons')
  .js('resources/scripts/app.js', 'js/scripts.js')
  .sass('resources/styles/app.scss', 'css/styles.css')
  .pug('resources/views/pages/*.pug', 'docs', {
    excludePath: 'resources/views/pages',
    pug: {
      pretty: true,
    },
  })
;

if (!mix.inProduction()) {
  mix
    .browserSync({
      server: './docs',
      files: [
        'resources/**/*.*',
      ],
    })
  ;
}