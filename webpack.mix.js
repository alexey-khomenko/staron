let mix = require('laravel-mix');
mix.pug = require('laravel-mix-pug-recursive');

mix
  .setPublicPath('docs')
  .setResourceRoot('../')
  .js('resources/scripts/app.js', 'js/scripts.js')
  .sass('resources/styles/app.scss', 'css/styles.css')
  .options({
    postCss: [
      require('tailwindcss')('tailwind.config.js'),
    ],
  })
  .pug('resources/views/pages/*.pug', 'docs', {
    excludePath: 'resources/views/pages',
    pug: {
      pretty: true,
    },
  })
;

if (mix.inProduction()) {

}
else {
  mix
    .copyDirectory('resources/images/*.*', 'docs/images')
    .copyDirectory('resources/favicons/*.*', 'docs/favicons')
    .browserSync({
      server: './docs',
      files: [
        'resources/**/*.*',
      ],
    })
  ;
}