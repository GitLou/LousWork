function notyAlert(type, msgTxt) {
  var text;
  switch(type){
    case 'warning':
      text = '<div class="activity-item"> <i class="glyphicon glyphicon-ok-sign text-warning"></i> '+msgTxt+' </div>';
      break;
    case 'error':
      text = '<div class="activity-item"> <i class="glyphicon glyphicon-remove-sign text-danger"></i> '+msgTxt+' </div>';
      break;
    case 'success':
      text = '<div class="activity-item"> <i class="glyphicon glyphicon-ok text-success"></i> '+msgTxt+' </div>';
      break;
    default:
      text = '<div class="activity-item"> <i class="glyphicon glyphicon-info-sign text-warning"></i> '+msgTxt+' </div>';
  }
  var n = noty({
    text: text,
    type: type,
    dismissQueue: true,
    timeout: 4000,
    killer: true,
    layout: 'topRight',
    closeWith: ['hover'],
    theme: 'relax',
    maxVisible: 3,
    animation: {
      open: 'animated pulse',
      close: 'animated fadeOut',
      easing: 'swing',
      speed: 500
    }
  });
}