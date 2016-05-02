// Create a new notification
function notify(url, value){

  var notification = new Notification( value, {
    body: url || "Hey there! You've been notified!",
    icon: chrome.runtime.getURL('icons/icon128.png'),
  });

  notification.onclick = function () {
    window.open(url);
    notification.close();
  };
}
