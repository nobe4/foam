// Global DOM elements
var configContainer = document.getElementById('config-container');
var errorContainer = document.getElementById('error-container');
var statusContainer = document.getElementById('status-container');

// UI events
document.getElementById('save').addEventListener('click', saveConfig);
document.getElementById('new').addEventListener('click', newConfig);
document.getElementById('reload').addEventListener('click', reloadConfig);

document.getElementById('stop').addEventListener('click', stopRunning);
document.getElementById('start').addEventListener('click', startRunning);
document.getElementById('restart').addEventListener('click', restartRunning);

// Stop the current process
function stopRunning(){
  chrome.runtime.sendMessage({'action': 'stop'});
  updateStatus('stopped');
}

// Start the current process
function startRunning(){
  chrome.runtime.sendMessage({'action': 'start'});
  updateStatus('running');
}

// Start the current process
function restartRunning(){
  chrome.runtime.sendMessage({'action': 'restart'});
  updateStatus('running');
}

// Create a new config element
function newConfig(){
  configContainer.appendChild( createConfigElement());
}

// Reload config elements
function reloadConfig(){
  store.get(generateList);
}

// Status container
function updateStatus(status){
  statusContainer.innerHTML = status;
}

// Config container

// Create the config list
function generateList(config){
  configContainer.innerHTML = '';

  for(var index in config){
    configContainer.appendChild(
      createConfigElement(config[index])
    );
  }

}

// Create a new config element
function createConfigElement(element){
  var element = element || {};

  var container = document.createElement('div');
  container.className = 'config';

  container.innerHTML = '<input type="text" name="url" class="url" ' +
    ((element.url) ? ('value="' + element.url + '">') : 'placeholder="url">');

  container.innerHTML += '<input type="text" name="selector" class="selector" ' +
    ((element.selector)? ('value="' + element.selector + '">') : 'placeholder="selector">');

  container.innerHTML += '<input type="number" name="timeout" class="timeout" ' +
    ((element.timeout) ? ('value="' + element.timeout + '">') : 'placeholder="timeout">');

  container.innerHTML += '<button>✖</button>';

  container.getElementsByTagName('button')[0].addEventListener('click', function(){
    container.remove();
  });

  return container;
}

// Error container
function updateError(error){
  errorContainer.innerHTML = error;
  // If an error was provided, return false, if not return true
  return !error;
}

// Clean the config element and display an error
function cleanConfig(elements){
  var url = elements[0].value;
  var selector = elements[1].value;
  var timeout = elements[2].value;

  if(url === ''){
    return updateError('Missing url');
  }

  if(selector === ''){
    return updateError('Missing selector');
  }

  if(timeout === ''){
    return updateError('Missing timeout');
  }

  timeout = parseInt(timeout);
  updateError('');

  return {
      url: url,
      selector: selector,
      timeout: timeout
    };
}

// Save the current configuration
function saveConfig(){
  var configElements = document.querySelectorAll('.config');
  var configList = [];

  for(var i = 0; i < configElements.length; i ++){
    var configElement = cleanConfig(configElements[i].childNodes);

    if(configElement){
      configList.push(configElement);
    }

  }

  store.set(configList, function(){
    updateStatus('saved');
  });
}

store.get(generateList);
