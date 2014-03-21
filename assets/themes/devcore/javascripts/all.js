// 移動 dom
// $( ".main-nav ul" ).appendAround();

// 讓服務頁副導覽，可以在第一畫面中顯示現在頁面標示。
if ( $('.services-nav').length != 0 ) {
  var activeItem = $('.services-nav-item.active');
  $('.services-nav').scrollLeft( activeItem.offset().left - activeItem.width() / 2 );
}


// 下拉式選單開關
if ( $('.quick-nav-title').length != 0 ) {
  $('.quick-nav-title').on('click', function(event){
    $('.quick-nav-list').toggleClass('open');
    event.preventDefault()
  })
}


if ( $('.page-content-sidebar-affix').length != 0 ) {

  // 控制 fixed 時，有個固定寬度
  $('.page-content-sidebar-affix').width($('.page-content-sidebar').width());

  jQuery(window).load(function() {
    setTimeout(function () {
      var $sideBar = $('.page-content-sidebar-affix')
      $sideBar.affix({
        offset: {
        top: function () {
                  return (this.top = $('.page-content-sidebar-affix').offset().top -24)
                },
        bottom: function () {
                  return (this.bottom = $('.footer').outerHeight(true) )
                }
        }
      })
      window._sidebar = $sideBar;
    }, 100)
  }).resize( function() {
    // 控制 fixed 時，有個固定寬度
    $('.page-content-sidebar-affix').width($('.page-content-sidebar').width());
    // fix resize don't work bug
    _sidebar.data('bs.affix').options.offset.bottom = $('.footer').outerHeight(true)
  })
}
