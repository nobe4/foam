// Local config
var config = [];
var intervals = [];
var running = false;

// Run a single query
function run(url, selector, callback){
  fetch(url, selector,
  function(value){

    callback(value.innerText);

  },
  function(err){
    console.log(err);
  });
}

function createInterval(item){

  return setInterval(function(){

    run(item.url, item.selector, function(value){
      console.log(value);

      if (value != item.value){
        item.value = value;

        notify(item.url, value);
      }

    });

  }, item.timeout * 1000) // don't go below the second, seriously
}

// Keep the intervals in memory to clear them if needed
function stop(){

  for(var i in intervals){
    clearInterval(intervals[i]);
  }

  intervals = [];

  running = false;
}

function start(){
  // Start only once
  if(running) return;
  running = true;

  store.get(function(_config){
    // Update local config
    config = _config;

    for(var i in config){

      intervals.push(
        createInterval(config[i])
      );

    }

    // Save the config only once per minute
    intervals.push(
      setInterval(function(){
        store.set(config, function(){});
      }, 60 * 1000)
    );

  });
}

chrome.runtime.onMessage.addListener(function(message){
  console.log(message.action);

  if(message.action == 'restart') {
    stop();
    start();
  } else if(message.action == 'start') {
    start();
  } else if(message.action == 'stop') {
    stop();
  }

});


// Browser action: open the option page.
chrome.browserAction.onClicked.addListener(function(tab){
  window.open(chrome.runtime.getURL('src/options/options.html'));
});
