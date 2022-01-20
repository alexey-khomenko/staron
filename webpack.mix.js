let mix = require('laravel-mix');
mix.pug = require('laravel-mix-pug-recursive');

mix
  .setPublicPath('docs')
  .setResourceRoot('../')
  .copyDirectory('resources/images/*.*', 'docs/images')
  .copyDirectory('resources/fonts/*.*', 'docs/fonts')
  .copyDirectory('resources/favicons/*.*', 'docs')
  .pug('resources/views/pages/*.pug', 'docs', {
    excludePath: 'resources/views/pages',
    pug: {
      pretty: true,
    },
  })
;

const styles = [
  'app-base',
  'app-fonts',
  'app-normalize',
  'swiper-bundle',

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
  'layout/modal-application_success',

  'layout/main',

  'pages/3d',
  'pages/404',
  'pages/about_koros_and_lotte',
  'pages/cart',
  'pages/catalog',
  'pages/collection',
  'pages/contacts',
  'pages/exploitation_and_care',
  'pages/glue',
  'pages/payment_and_delivery',
  'pages/product',
  'pages/study',
  'pages/study_directions',
  'pages/study_request',

  'page/3d/bottom',
  'page/3d/top',

  'page/cart/order',
  'page/cart/info',
  'page/cart/modal',

  'page/catalog/buttons',
  'page/catalog/cards',

  'page/collection/buttons',
  'page/collection/cards',
  'page/collection/filter',
  'page/collection/modal',
  'page/collection/modal-images',
  'page/collection/modal-texts',

  'page/contacts/top',
  'page/contacts/middle',
  'page/contacts/bottom',

  'page/docs-guarantee-commercial/content',
  'page/docs-guarantee-private/content',
  'page/docs-pdf-company/content',
  'page/docs-security/content',
  'page/docs-sizes/content',

  'page/exploitation_and_care/care',
  'page/exploitation_and_care/exploitation',
  'page/exploitation_and_care/easily_removable_substances',
  'page/exploitation_and_care/difficult_removable_substances',

  'page/gallery/buttons',
  'page/gallery/content',
  'page/gallery/modal',
  'page/gallery/top',

  'page/index/slider',
  'page/index/scroll',
  'page/index/benefits',
  'page/index/trend',
  'page/index/trend-left',
  'page/index/trend-right',
  'page/index/production',

  'page/new/bottom',
  'page/new/buttons',
  'page/new/content',
  'page/new/top',

  'page/news/buttons',
  'page/news/content',
  'page/news/top',

  'page/payment_and_delivery/top',
  'page/payment_and_delivery/middle',
  'page/payment_and_delivery/bottom',

  'page/product/images',
  'page/product/info',

  'page/search/top',
  'page/search/results',
  'page/search/empty',

  'page/study/bottom',

  'page/study_directions/events',
  'page/study_request/card',
  'page/study_request/modal',

  'page/where_to_buy/top',
  'page/where_to_buy/bottom',
  'page/where_to_buy/bottom-dealers',

  'partials/docs/aside',
  'partials/docs/bottom',
  'partials/docs/modal',
  'partials/docs/top',

  'partials/docs/content-default',
  'partials/docs/content-guarantee',

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

  'pages/study_request',

  'page/3d/bottom',
  'page/3d/top',

  'page/cart/order',
  'page/cart/info',

  'page/catalog/buttons',

  'page/collection/buttons',
  'page/collection/cards',
  'page/collection/filter',

  'page/gallery/buttons',
  'page/gallery/modal',

  'page/index/slider',
  'page/index/scroll',
  'page/index/benefits',
  'page/index/trend',
  'page/index/trend-right',

  'page/news/buttons',
  'page/news/top',

  'page/product/images',
  'page/product/info',

  'page/search/top',
  'page/search/results',

  'page/where_to_buy/top',
  'page/where_to_buy/bottom',

  'partials/docs/top',
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