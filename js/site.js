function IsMobile(){
   if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
      return true;
    }else{
      return false;
    }
}

function stopBodyScroll (isFixed) {
   var top = 0;
  if (isFixed) {
    top = window.scrollY;
    document.body.style.position = 'fixed'
    document.body.style.top = -top + 'px'
  } else {
   document.body.style.position = '';
   document.body.style.top = '';

    window.scrollTo(0, top) // 回到原先的top
  }
}

IsMenuOpen = false;
$(document).ready(function() {

   var toggle = $('.toggle');
   toggle.on('click',function(){
      $(this).toggle('active');
   });

   // var faq = $('.faqs ul li');
   // faq.on('click',function(){
   //    $(this).toggleClass("active");
   // });

   $('.jobs .job-list .job-list-item').click(function(){
      $(this).toggleClass("active").children(".slider").slideToggle("slow");
   });

   $('.faqs ul li').click(function(){
      $(this).toggleClass("active").children(".slider").slideToggle(400);
   });
   
   setTimeout(()=>{
      $(".mobile_toggle").on('click', function(event){
         event.stopPropagation();
         event.stopImmediatePropagation();
         console.log('m click');
         $(this).toggleClass('active');
      });

      $(window).scroll(function() {
         if(!IsMobile()){
            var scrollTop = $(this).scrollTop();
            var sub = $('.sub-nav');
            if(scrollTop > 208){
              if(sub && !sub.hasClass('fixed')){
                sub.addClass('fixed')
              }
            }else{
               if(sub && sub.hasClass('fixed')){
                  sub.removeClass('fixed')
                }
            }
         }else{
            var scrollTop = $(this).scrollTop();
            var sub = $('.sub-nav');
            if(scrollTop > 168){
              if(sub && !sub.hasClass('fixed')){
                sub.addClass('fixed')
              }
            }else{
               if(sub && sub.hasClass('fixed')){
                  sub.removeClass('fixed')
                }
            }
         }
       });

       $('.nav').click(function(){
         var vw = $(window).width();
         if(IsMobile() || vw <= 960){
            var nav = $(this);
            var m = $('#menu-m');
            if(nav.hasClass('active')){
               nav.removeClass('active');
               m.removeClass('active');
               stopBodyScroll(false);
            }else{
               nav.addClass('active')
               m.addClass('active');
               stopBodyScroll(true);
            }
         }
       });

       $('.nav .menuLable').click(function(){
         var vw = $(window).width();

         if(vw > 960){
            var self = $(this);
            if(self.hasClass('active')){
               self.removeClass('active');
            }else{
               $(self).parents('.menu').find('.menuLable').removeClass('active');
               if(self.hasClass('active')){
                  self.removeClass('active');
               }else{
                  self.addClass('active');
               }
            }
         }
       });
       //點選項外關閉選單
       $('body').click(function(event){
         var nav = $(event.target).parents('.nav');
         console.log('nav',nav);
         if(nav.length == 0){
            $('.menu').find('.menuLable').removeClass('active');
         }
       })
   },500);
   

   
});

//需求選項變更設定預算
var defalt_opt = [
   {value:'1',text:'4,000,000  ~ 5,000,000'},
   {value:'2',text:'5,000,000 ~ 6,000,000'},
   {value:'3',text:'> 6,000,000'},
];
var opt_2 = [
   {value:'a',text:'500,000 ~ 1,500,000'},
   {value:'b',text:'1,500,000 ~ 3,000,000'},
   {value:'c',text:'3,000,000 ~ 6,000,000'},
   {value:'d',text:'> 6,000,000'},
];
function setBudget(item){
   console.log('setBudget');
   var selectTarget = $('#budget');
   var seletedValue = $(item).val();
   if(seletedValue == '02'){
      //若需求 = a 設定預算選項為 opt_1
      selectTarget.empty();
      opt_2.forEach(item => {
         selectTarget.append($('<option>', {
            value: item['value'],
            text: item['text']
        }));
      });
   }

   if(seletedValue == '03'){
      //若需求 = c 設定預算選項為 opt_2
      selectTarget.empty();
      opt_2.forEach(item => {
         selectTarget.append($('<option>', {
            value: item['value'],
            text: item['text']
        }));
      });
   }

   if(seletedValue == '04'){
      //若需求 = c 設定預算選項為 opt_2
      selectTarget.empty();
      opt_2.forEach(item => {
         selectTarget.append($('<option>', {
            value: item['value'],
            text: item['text']
        }));
      });
   }
   
   //以上皆非 判斷回預設
   if(seletedValue != '02' && seletedValue != '03' && seletedValue != '04'){
      selectTarget.empty();
      defalt_opt.forEach(item => {
         selectTarget.append($('<option>', {
            value: item['value'],
            text: item['text']
        }));
      });
   }
}


$(document).ready(function(){
   
   //文章code 樣式
   $(".article_content pre").addClass("prettyprint linenums prettyprinted");

   //sub-na 橫向捲軸定位
   if ( $("html").hasClass("sub-menu") ) {
      var subnav = $('.sub-nav .tab');
      var subnav_offset = $('.sub-nav .tab li a.active').offset().left;
      subnav.scrollLeft(subnav_offset - 20);
   };

   // parallax 效果
   if ( $("html").hasClass("parallax") ) {
      
      function parallaxInit() {
          var target = $('#parallax');
          var targetY = target.offset().top;
          var targetHeight = target.outerHeight();
          var targetWidth = target.outerWidth();
          var startParallax = targetY - $(window).height();
          var endParallax = targetY + targetHeight;
          var bgPositionY = Math.max( 0, targetWidth / 16 * 9 - targetHeight );
          target.css( "background-position-y", -bgPositionY );
          window.addEventListener('scroll', function() {
            var scrollY = window.pageYOffset;
            if ( scrollY >= startParallax && scrollY <= endParallax ) {
               target.css( "background-position-y", -bgPositionY + scrollY / 3 );
            };
          });
      };
      parallaxInit();
      $(window).resize(function() {
          parallaxInit();
      });
   };

});