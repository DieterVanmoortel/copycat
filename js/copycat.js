(function($){

  Drupal.behaviors.copycat = {
    attach: function(context) { 
      copycat_init();
    }}

  function copycat_init() {  
    $('.field-name-body .field-item').mouseenter(function(e){
      $(this).prepend('<div id="copycat-trigger">trigger</div>').wrap('<div class="copycat" />');
    });
    $('.field-name-body .field-item').mouseleave(function(e){
      $('#copycat-trigger').remove();
      $(this).unwrap();
    });
//    $('#copycat-trigger').click(function(){
//        console.log('test');
//      })
  }
})(jQuery);


