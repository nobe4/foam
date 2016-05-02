// get config form storage
// Storage :
// config :
//  - url
//  - selector
//  - timout
//  - current value

var store = {
  get: function (done){
    chrome.storage.local.get('config', function(items){
      done(items['config']);
    });
  },
  set: function(config, done){
    chrome.storage.local.set({'config': config}, function(){
      done();
    });
  }
};
