(function($){

  Drupal.behaviors.copycat = {
    attach: function(context) { 
      copycat_init();
      $('#copycat-trigger').live('click', copycat_get_form);
      $('#copycat-submit').live('click', copycat_process_form);
    }}
  // set the hover event on the desired fields
  function copycat_init() {  
    $('.field-name-body .field-item').hover( enable_copycat_trigger, disable_copycat_trigger);
  }
  // enable triggering
  function enable_copycat_trigger(el){
    if(!$(this).parent().hasClass('copycat')) {
      $(this).prepend('<div id="copycat-trigger"></div>').wrap('<div class="copycat" />');
    } 
  }
  // disable triggering
  function disable_copycat_trigger(el){
    $('#copycat-trigger').remove();
    $(this).unwrap('<div class="copycat" />');
  }
  
  // get the edit form and replace content
  function copycat_get_form(el) {
    console.log('get form');
    if(!$('body').hasClass('copycat-active')){
      $('#copycat-trigger').remove();
      var copy = $('.copycat').find('.field-item').html();
      var nid = $('.copycat').parents('.node').attr('id').replace('node-','');
      $.ajax({
        url: '/ajax/copycat/edit',
        data: {
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
  
  // process the edit form & replace content again
  function copycat_process_form(el){
    console.log('form processing');
    // replace old content with new content
    var copy = $('#copycat-value').val();
    $('#copycat-form').replaceWith(($('#copycat-value').val()));
    var nid = $('.copycat').parents('.node').attr('id').replace('node-','');
    // and change the value in db
      $.ajax({
        url: '/ajax/copycat/save',
        data: {
          copy : copy,
          nid : nid
        },
        success : function(data) {
          console.log('succes');
        }
      });    
    $('body').removeClass('copycat-active');
  }
  
})(jQuery);


