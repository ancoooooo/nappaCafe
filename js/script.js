
//文字上からfadeIn class名：fadeIn
jQuery(function ($) {
    $(window).on('load scroll', function () {

        let box = $('.fadeIn');
        let animated = 'animated';

        box.each(function () {

            let boxOffset = $(this).offset().top;
            let scrollPos = $(window).scrollTop();
            let wh = $(window).height();

            if (scrollPos > boxOffset - wh + 100) {
                $(this).addClass(animated);
            }
        });
    });
})

//ハンバーガーメニュー　class名：is-openMenu
$(function () {
    $('.c_hamburger').on('click', () => {
        $('body').toggleClass('is-openMenu');
    })

    $(".l_gnav__headerLink").click(function () {
        $('body').removeClass('is-openMenu');
    });
})


//swiper
let swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: { // 自動再生
        delay: 2000, //自動再生のスピード
        disableOnInteraction: false, //矢印をクリックしても自動再生を止めないようにする
    },
    pagination: {
        el: ".slider_pagenation",
        clickable: true,

    },
    // spaceBetween: '100px',
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },
    breakpoints: {
      // スライドの表示枚数：600px以下
      600: {
        slidesPerView: 3,
      },
      // スライドの表示枚数：1000px以上
      1000: {
        slidesPerView: 4,
      },
    },
});



//nav fixed
window.addEventListener('load',fixedCheck);  //ページ全体（画像やスタイルシートを含む）が完全に読み込まれたときに発生
window.addEventListener('resize',fixedCheck);  //画面サイズが変わったときに発生
window.addEventListener('scroll',fixedCheck,{passive:true});  //スクロールしたときに発生
function fixedCheck(){
  let mvBottom=document.getElementById('headerMv'); 
  let globalN=document.getElementById('headerFixed');
  let fixedJudge=mvBottom.getBoundingClientRect().bottom; //navの上の要素(headerMv)のbottomの値を取得
  if(fixedJudge<=0){
    globalN.classList.add('fixed');  //headerMvのクラスにfixedを追加
  
  }else{ 
    globalN.classList.remove('fixed');  //headerMvのクラスからfixedを削除
  }
}




//タブデザイン
let tabSwitchTab = 'js-tab_switch--tab'; // 切り替えタブ要素
let tabSwitchBody = 'js-tab_switch--body'; // 切り替えられるコンテンツ要素
let tabSwitchBtn = 'js-tab_switch--button'; // 切り替えタブ要素内ボタン
let classCurrent = 'is-current'; // アクティブを示すclass

if($('.' + tabSwitchTab).length) {
  // 初期表示時
  $(window).on('load', function() {
    // タブ設定の子要素で一番最初の要素にアクティブを示すclass追加
    $('.' + tabSwitchTab).children(':first-child').addClass(classCurrent);

    // 切り替えタブ要素内のaタグにボタンを示すclass追加
    $('.' + tabSwitchTab).find('a').addClass(tabSwitchBtn);

    // 切り替えられるコンテンツ要素で一番最初の要素以外を非表示
    $('.' + tabSwitchBody).children(':not(:first-child)').hide();
  });

  // タブクリック時
  $(document).on('click', '.' + tabSwitchBtn, function(evt) {
    // アニメーション速度設定
    let animateSpeed = 300;

    // aタグの機能をリセット
    evt.preventDefault();

    // 親要素にアクティブを示すclassがついていなかったら処理をする
    if(!$(this).parent().hasClass(classCurrent)) {

      // クリックした要素のhref内のidを取得
      let tabTargetContent = $(this).attr('href');

      // hrefの中身がアンカーリンクだったら処理をする（hrefの1文字目が#で判定）
      if(tabTargetContent.charAt(0) === '#') {
        // クリックした要素の親要素の同列のコンテンツからアクティブを示すclassを削除
        $(this).parent().siblings().removeClass(classCurrent);

        // クリックした要素の親にアクティブを示すclass追加
        $(this).parent().addClass(classCurrent);

        // 切り替えられるコンテンツ要素を全て非表示
        $(tabTargetContent).siblings().hide();

        // クリック先の要素のみフェードイン
        $(tabTargetContent).fadeIn(animateSpeed);
      }
    }
  });
}


//ボタンスクロール
$(document).ready(function() {
  let pagetop = $('.pagetop');
    $(window).scroll(function () {
       if ($(this).scrollTop() > 100) {  //100を通過するとスクロールトップが表示される
            pagetop.fadeIn();
       } else {
            pagetop.fadeOut();
            }
       });//500はスクロール速度
       pagetop.click(function () {
           $('body, html').animate({ scrollTop: 0 }, 500);
              return false;
   });
});



//営業状態
// 営業時間と休業日を設定するオブジェクト
const businessHours = {
  openingHour: 11,   // 営業開始時間（例: 11時）
  closingHour: 23,  // 営業終了時間（例: 23時）
  closedDays: [4] // 定休日（例: 木曜日: 4）
};

// 営業状態をチェックする関数
function checkBusinessStatus(date, hours) {
  const day = date.getDay();
  const hour = date.getHours();

  if (hours.closedDays.includes(day)) {
      return '今日はお休みです。';
  } else if (hour >= hours.openingHour && hour < hours.closingHour) {
      return '現在営業中です。';
  } else {
      return '営業時間外です。';
  }
}

// 現在の営業状態をHTMLに反映する
function updateBusinessStatus() {
  const now = new Date();
  const status = checkBusinessStatus(now, businessHours);
  document.getElementById('business-status').textContent = status;
}

// ページが読み込まれたときに営業状態を更新
window.onload = updateBusinessStatus;

// alert('こんにちは');