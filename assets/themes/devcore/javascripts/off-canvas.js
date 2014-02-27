var off_canvas = function (){

  var menuStatus = $("body");
  var openMenuButton = $(".open-menu-btn");
  var closeMenuButton = $(".outside .close-menu-btn");
  var affixHack = $(".page-content-sidebar-affix"); // fix affix bug

  openMenuButton.on("click", function(event){
    menuStatus.addClass("model open-menu");
    event.preventDefault();
  });

  closeMenuButton.on("click", function(){
    menuStatus.removeClass("open-menu").delay(500).queue(function(){
			menuStatus.removeClass("model");
			menuStatus.dequeue();
      affixHack.attr("style", "").removeClass("affix").addClass("affix-top"); // fix affix bug
    });
    event.preventDefault();
    affixHack.attr("style", "position: static"); // fix affix bug
  });

};

off_canvas();
// $( window ).resize(function() {
//   $('body').removeClass('open-menu');
// });


