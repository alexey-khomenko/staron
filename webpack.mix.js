let mix = require('laravel-mix');
mix.pug = require('laravel-mix-pug-recursive');

mix
  .setPublicPath('docs')
  .setResourceRoot('../')
  .copyDirectory('resources/images/*.*', 'docs/images')
  .copyDirectory('resources/fonts/*.*', 'docs/fonts')
  .copyDirectory('resources/favicons/*.*', 'docs/favicons')
  .pug('resources/views/pages/*.pug', 'docs', {
    excludePath: 'resources/views/pages',
    pug: {
      pretty: true,
    },
  })
;

const styles = [
  'layouts/app-base',
  'layouts/app-fonts',
  'layouts/app-normalize',

  'layout/footer',
  'layout/footer-left',
  'layout/footer-center',
  'layout/footer-right',

  'layout/header',
  'layout/header-top',
  'layout/header-bottom',

  'layout/modal',
  'layout/modal-application',

  'layout/main',
];

for (let style of styles) {
  mix.sass(`resources/styles/${style}.scss`, `css/${style}.css`);
}

const scripts = [
  'layouts/script',

  'layout/header-top',
  'layout/modal',
  'layout/modal-application',
];

for (let script of scripts) {
  mix.copy(`resources/scripts/${script}.js`, `docs/js/${script}.js`);
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