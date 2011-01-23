function debug(msg){
  console.log(msg);
}

function timer(node){
  node.innerHTML = "0:00"
  node.timer = window.setInterval(function(){
    var tmp = node.innerHTML.split(":");
    var time = parseInt(tmp[0])*60 + parseInt(tmp[1]);
    time += 1;
    node.innerHTML = parseInt(time / 60) + ":" + time % 60;
  }, 1000);
}

$(function(){
  RecButton.bind('debug', function(arg){
    debug('DEBUG: ' + arg.message);
  });


  $('.RecButtonWidget .button').live('click', function(){
    console.log($(this).attr('class'));
  });


  RecButton.setup({
    flashContainer: $('.RecButtonRecorder')[0],
    onShowFlash: function(){
      $('.RecButtonRecorder').addClass('highlight');
    },
    onHideFlash: function(arg){
      $('.RecButtonRecorder').removeClass('highlight');
    }
  });

  $('.RecButtonWidget.recording .button.record').live('click', function(){
    RecButton.stop();
    $RecButtonWidget = $(this).closest('.RecButtonWidget');
    $RecButtonWidget.removeClass('recording').addClass("recorded");
    window.clearInterval($RecButtonWidget.find('.timer')[0].timer);
    return false;
  });
  
  $('.RecButtonWidget .button.record').live('click', function(){
    var that = this;
    RecButton.record({
      onStart: function(){
        $RecButtonWidget = $(that).closest('.RecButtonWidget');
        $RecButtonWidget.removeClass("recorded").addClass('recording');
        timer($RecButtonWidget.find('.timer')[0]);
      }
    });
  });

  // play

  $('.RecButtonWidget.playing .button.play').live('click', function(){
    RecButton.stop();
    $RecButtonWidget = $(this).closest('.RecButtonWidget');
    $RecButtonWidget.removeClass('playing').addClass("played");
    //    window.clearInterval($RecButtonWidget.find('.timer')[0].timer);
    return false;
  });

  $('.RecButtonWidget .button.play').live('click', function(){
    var that = this;
    RecButton.play();
    $RecButtonWidget = $(that).closest('.RecButtonWidget');
    $RecButtonWidget.removeClass("played").addClass('playing');
  });
  
  
  $('.scconnect').live('click', function(){
    var url = 'http://localhost/complete.html';
//    var rt_url = 'http://recbutton.com/oauth/request_token?next=' + url;
    // returns with 
    var rt_url = 'http://localhost:3002/oauth/request_token?next=' + url;
    
    var x = window.open(rt_url, "sc_connect_popup", "location=1, width=456, height=500,toolbar=no,scrollbars=yes");
  });

});

var x;