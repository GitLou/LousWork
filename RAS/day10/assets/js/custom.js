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
    timeout: true,
    killer: true,
    layout: 'topRight',
    closeWith: ['hover'],
    theme: 'relax',
    maxVisible: 1,
    animation: {
      open: 'animated fadeInRightBig',
      close: 'animated hinge',
      easing: 'swing',
      speed: 500
    }
  });
}