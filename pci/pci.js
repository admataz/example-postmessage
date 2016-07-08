(function () {
  var trustedDomain = 'http://localhost:8080';
  var outerdomain;
  var inputformwrapper;

  var send = {
    initialDomState: function () {
      window.parent.postMessage({
        initFrameHeight: document.body.offsetHeight,
        messageType: 'initialDomState'
      }, trustedDomain);
    }
  };



  function init() {
    send.initialDomState();
  }


  if ('postMessage' in window) {
    window.addEventListener('DOMContentLoaded', init);
    window.addEventListener('message', function (evt) {

      // probably should do more checking here for presence of properties on the e.data object

      if (evt.origin == trustedDomain && evt.data.messageType === 'aTestMessageType') {
        console.log("receiving in the child frame:", evt.data.messageContent);
        evt.source.postMessage({
          messageType: 'responseMessage',
          messageContent: '"Father...?"'
        }, trustedDomain)
      }
    })
  }
})();
