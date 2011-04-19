var RecButton = {
  swfCode: '<object id="RecButton" width="230" height="140" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"><param value="transparent" name="wmode"><param value="Recorder.swf" name="movie"><param value="always" name="allowScriptAccess"><embed width="230" height="140" wmode="transparent" name="RecButton" type="application/x-shockwave-flash" src="Recorder.swf" allowscriptaccess="always">  </object>',
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
    options = options || {};
    this.bind('recordingStart', options['onStart']);
    this.flashInterface().startRecording();
  },
  
  stop: function(){
    this.flashInterface().stopRecording();
    this.flashInterface().stopPlaying();
  },
  
  play: function(){
    this.flashInterface().startPlaying();
  },

  upload: function(url, params, options){
    this.bind("uploadComplete", options.onUploadComplete);
    this.flashInterface().upload(url, params);
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

  flashInterface: function(){
    return this.swfObject.startRecording ? this.swfObject : this.swfObject.children[3];
  },
};
