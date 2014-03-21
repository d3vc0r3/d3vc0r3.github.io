// 移動 dom
// $( ".main-nav ul" ).appendAround();

// 讓服務頁副導覽，可以在第一畫面中顯示現在頁面標示。

$('.quick-nav-title').on('click', function(event){
  $('.quick-nav-list').toggleClass('open');
  event.preventDefault()
})

if ( $('.services-nav').length != 0 ) {
  var activeItem = $('.services-nav-item.active');
  $('.services-nav').scrollLeft( activeItem.offset().left - activeItem.width() / 2 );
}

if ( $('.page-content-sidebar-affix').length != 0 ) {
  jQuery(window).load(function() {
    setTimeout(function () {
      var $sideBar = $('.page-content-sidebar-affix')
      $sideBar.affix({
        offset: {
        top: function () {
                  console.log($('.page-content-sidebar-affix').offset().top -24);
                  return (this.top = $('.page-content-sidebar-affix').offset().top -24)
                },
        bottom: function () {
                  console.log($('.footer').outerHeight(true));
                  return (this.bottom = $('.footer').outerHeight(true) )
                }
        }
      })
      window._sidebar = $sideBar;
    }, 100)
  }).resize( function() {
    // fix resize don't work bug
    // _sidebar.data('bs.affix').options.offset.top = $('.page-content-sidebar-affix').offset().top -48,
    _sidebar.data('bs.affix').options.offset.bottom = $('.footer').outerHeight(true)
  })
}
