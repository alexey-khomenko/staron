let mix = require('laravel-mix');
mix.pug = require('laravel-mix-pug-recursive');

mix
  .setPublicPath('docs')
  .setResourceRoot('../')
  .copyDirectory('resources/images/*.*', 'docs/images')
  .copyDirectory('resources/fonts/*.*', 'docs/fonts')
  .copyDirectory('resources/favicons/*.*', 'docs/favicons')
  .copyDirectory('resources/scripts/**/*.*', 'docs/js')
  .pug('resources/views/pages/*.pug', 'docs', {
    excludePath: 'resources/views/pages',
    pug: {
      pretty: true,
    },
  })
;

const styles = [
  {path: 'layouts', file: 'app-base'},
  {path: 'layouts', file: 'app-fonts'},
  {path: 'layouts', file: 'app-normalize'},

  {path: 'layout', file: 'footer'},
  {path: 'layout', file: 'footer-left'},
  {path: 'layout', file: 'footer-center'},
  {path: 'layout', file: 'footer-right'},

  {path: 'layout', file: 'header'},
  {path: 'layout', file: 'header-top'},
  {path: 'layout', file: 'header-bottom'},

  {path: 'layout', file: 'modal'},
  {path: 'layout', file: 'modal-application'},

  {path: 'layout', file: 'main'},

  // {path: '', file: ''},
];

for (let style of styles) {
  mix.sass(`resources/styles/${style.path}/${style.file}.scss`, `css/${style.file}.css`);
}

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