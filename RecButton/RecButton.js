var RecButton = {
  swfCode: '<object width="230" height="140"><param value="transparent" name="wmode"><param value="Recorder.swf" name="movie"><param value="always" name="allowscriptaccess"><embed width="230" height="140" wmode="transparent"   type="application/x-shockwave-flash" src="Recorder.swf" allowscriptaccess="always">  </object>',
  swfObject: null,
  events: {},
    //showFlash, hideFlash, recordStart, recordStop:, playStart: , playStop:  , uploadStart, uploadState, uploadStop:, error:     
  setup: function(options){
    this.bind('showFlash', options['onShowFlash']);
    this.bind('hideFlash', options['onHideFlash']);
    options['flashContainer'].innerHTML = this.swfCode;
    this.swfObject = options['flashContainer'].children[0];
  },

  clear: function(){
    RecButton.events = {};
  },

  record: function(options){
    this.bind('recordingStart', options['onStart']);
    this.flashTrigger('startRecording');
  },
  
  stop: function(){
    this.flashTrigger('stopRecording');
    this.flashTrigger('stopPlaying');
  },
  
  play: function(){
    this.flashTrigger('startPlaying');
  },

  post: function(url){
    this.flashTrigger('post', [url]);
  },

  bind: function(eventName, fn){
    if(!RecButton.events[eventName]){ RecButton.events[eventName] = [] }
    RecButton.events[eventName].push(fn);
  },
  
  trigger: function(eventName, args){
    for(var cb in RecButton.events[eventName]){
      RecButton.events[eventName][cb](args);
    }
  },

  flashTrigger: function(functionName, args){
    if(!args){
      args = [];
    }
    
    // ugly workaround for firefox to use the embed
    var f = this.swfObject.sendToActionScript ? this.swfObject : this.swfObject.children[3];
    return f.sendToActionScript(functionName + " " + args.join(" "));
  }
};


function Recorder(swfObject){
   this.swfObject   = swfObject;
   this.isPlaying   = false;
   this.isRecording = false;
   
   this.send = function(message){
     return swfObject.sendToActionScript(message);
   };
   
   this.post = function(uri){
     return this.send('post ' + uri);
   };
   
   this.setup = function(){
     return this.send('setup');
   };
   
   this.startRecording = function(){
     this.isRecording = true;
     return this.send('startRecording');
   };
   
   this.stopRecording = function(){
     this.isRecording = false;
     return this.send('stopRecording');
   };
   
   this.startPlaying = function(){
     this.isPlaying = true;
     return this.send('startPlaying');
   };
   
   this.stopPlaying = function(){
     this.isPlaying = false;
     return this.send('stopPlaying');
   };
   
   this.getDebugLog = function(){
     return this.send('getDebugLog');
   };
}