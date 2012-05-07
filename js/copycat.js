(function($){

  Drupal.behaviors.copycat = {
    attach: function(context) { 
      copycat_init();
      $('#copycat-trigger').live('click', copycat_get_form);
      $('#copycat-form .form-submit').live('click', copycat_process_form);
    }}

  function copycat_init() {  
    $('.field-name-body .field-item').mouseenter(function(e){
    if(!$(this).parent().hasClass('copycat')) {
      $(this).prepend('<div id="copycat-trigger"></div>').wrap('<div class="copycat" />');
    }
    });
    $('.field-name-body .field-item').mouseleave(function(e){
      $('#copycat-trigger').remove();
      $(this).unwrap('<div class="copycat" />');
    });
  }
  function copycat_get_form(el) {
    if(!$('body').hasClass('copycat-active')){
      $('#copycat-trigger').remove();
      var copy = $('.copycat').find('.field-item').html();
      var nid = $('.copycat').parents('.node').attr('id').replace('node-','');
      $.ajax({
        url: '/copycat',
        data: {
          op: 'get-form',
          copy : copy,
          nid : nid
        },
        success : function(data) {
          $('.copycat').find('.field-item').html(data).unwrap();
          $('body').addClass('copycat-active');
        }
      });
    }
  }
  function copycat_process_form(el){
    console.log('submit!');
    var copy = $('#copycat-form #edit-copy').text();
  }
  function copycat_cancel_form(el){
    var copy = $('#copycat-form #old_value').text();
    $('#copycat-form').html(copy);
    $('body').removeClass('copycat-active');
  }
})(jQuery);


