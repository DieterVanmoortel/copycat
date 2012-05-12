(function($){
Drupal.behaviors.easyedits = {
  attach: function(context) {
    $('.easyedits-wrapper', context)
    .not('.easyedits-processed')
    .addClass('easyedits-processed')
    .each(this.exec);
  },
  exec: function() {
    // @todo: Click sucks, consider making it focusable.
    $('.easyedits-output', this).bind('click', Drupal.behaviors.easyedits.activate);
  },
  activate: function() {
    // @todo: Clean up.
    var $output = $(this),
        $form = $output.next('.easyedits-form'),
        $wrap = $output.parent();
    $output.toggleClass('element-invisible');
    // @todo: find a reliable way to trigger focus
    $form.toggleClass('element-invisible');
    // Add 'active' identifier
    // @todo: this will explode with multiple on the same page
    $wrap[0].id = 'easyedits-active-wrapper';
  }
};
  Drupal.behaviors.copycat = {
    attach: function(context) { 
      copycat_init();
      $('#copycat-trigger').live('click', copycat_get_form);
      $('#copycat-submit').live('click', copycat_process_form);
    }}
  // set the hover event on the desired fields
  function copycat_init() {  
    $('.field-name-body').each(function(){$(this).prepend('<div id="copycat-trigger"></div>')});
  }
  // enable triggering
  function enable_copycat_trigger(el){
//    if(!$(this).parent().hasClass('copycat')) {
      console.log($(this).val());
//    } 
  }
  // disable triggering
  function disable_copycat_trigger(el){
    $('#copycat-trigger').remove();
    $(this).unwrap('<div class="copycat" />');
  }
  
  // get the edit form and replace content
  function copycat_get_form(el) {
    console.log('get form');
//    if(!$('body').hasClass('copycat-active')){
//      var nid = $('.copycat').parents('.node').attr('id').replace('node-','');
      $.ajax({
        url: '/ajax/copycat/edit',
        data: {
          nid : 20
        },
        success : function(data) {
          $('.field-name-body').find('.field-item').html(data).unwrap();
//          $('body').addClass('copycat-active');
        }
      });
//    }
  }
  
  // process the edit form & replace content again
  function copycat_process_form(el){
    console.log('form processing');
    // replace old content with new content
//    var copy = $('#copycat-value').val();
//    $('#copycat-form').replaceWith(($('#copycat-value').val()));
    var nid = $('.copycat').parents('.node').attr('id').replace('node-','');
    // and change the value in db
      $.ajax({
        url: '/ajax/copycat/save',
        data: {
          nid : 20
        },
        success : function(data) {
          console.log('succes');
        }
      });    
    $('body').removeClass('copycat-active');
  }
  
})(jQuery);


