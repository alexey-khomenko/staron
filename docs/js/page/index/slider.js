document.addEventListener('DOMContentLoaded', function () {

  const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
    autoplay: {
      delay: 5000,
    },
    on: {
      activeIndexChange: function () {
        setTimeout(() => {
          const slide = document.querySelector('.slider .swiper-slide-active');

          const titleObj = document.querySelector('.slider .title');
          const subTitleObj = document.querySelector('.slider .sub-title');
          const linkObj = document.querySelector('.slider .link');

          titleObj.textContent = slide.dataset.title;
          subTitleObj.textContent = slide.dataset.subTitle;
          linkObj.href = slide.dataset.link;

          const bullets = document.querySelectorAll('.slider .bullet');
          const index = +slide.dataset.swiperSlideIndex;

          for (let key = 0; key < bullets.length; key++) {
            if (key === index) {
              bullets[key].classList.add('active');
            }
            else {
              bullets[key].classList.remove('active');
            }
          }
        }, 10);
      },
    },
  });

  document.addEventListener('click', function (e) {
    const bullet = e.target.closest('.slider .bullet:not(.active)');

    if (!bullet) return true;

    swiper.slideToLoop(+bullet.dataset.index);
    swiper.autoplay.start();
  });

});