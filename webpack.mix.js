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
  'layouts/swiper-bundle',

  'layout/footer',
  'layout/footer-left',
  'layout/footer-center',
  'layout/footer-right',
  'layout/footer-to-top',

  'layout/header',
  'layout/header-top',
  'layout/header-bottom',
  'layout/header-large_menu',
  'layout/header-large_menu-head',
  'layout/header-large_menu-tablet',
  'layout/header-large_menu-foot',
  'layout/header--lang',

  'layout/modal',
  'layout/modal-application',

  'layout/main',

  'pages/404',
  'pages/about_koros_and_lotte',
  'pages/exploitation_and_care',
  'pages/payment_and_delivery',

  'page/index/slider',
  'page/index/scroll',
  'page/index/benefits',
  'page/index/trend',
  'page/index/trend-left',
  'page/index/trend-right',
  'page/index/production',

  'page/exploitation_and_care/care',
  'page/exploitation_and_care/exploitation',
  'page/exploitation_and_care/easily_removable_substances',
  'page/exploitation_and_care/difficult_removable_substances',

  'page/payment_and_delivery/top',
  'page/payment_and_delivery/middle',
  'page/payment_and_delivery/bottom',

  'partials/pages/breadcrumbs',
];

for (let style of styles) {
  mix.sass(`resources/styles/${style}.scss`, `css/${style}.css`);
}

const scripts = [
  'layouts/inputmask.min',
  'layouts/swiper-bundle.min',
  'layouts/script',

  'layout/footer-to-top',

  'layout/header-top',
  'layout/header-large_menu',
  'layout/header-large_menu-head',
  'layout/header-large_menu-tablet',
  'layout/header--lang',

  'layout/modal',
  'layout/modal-application',

  'page/index/slider',
  'page/index/scroll',
  'page/index/benefits',
  'page/index/trend',
  'page/index/trend-right',

];

for (let script of scripts) {
  mix.copy(`resources/scripts/${script}.js`, `docs/js/${script}.js`);
}

if (!mix.inProduction()) {
  mix.browserSync({
    server: './docs',
    files: [
      'resources/**/*.*',
    ],
  });
}