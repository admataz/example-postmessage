(function () {
  var trustedDomain = 'http://127.0.0.1:8080';
  var pciframe;
  var sendMessageButton;
  document.addEventListener('DOMContentLoaded', function () {
    pciframe = window.frames['pci-frame'];
    sendMessageButton = document.getElementById('send-message-button');

    sendMessageButton.addEventListener('click', function (evt) {
      pciframe.postMessage({
        messageContent: '"Luke.... Luuuuuuuke..."',
        messageType: 'aTestMessageType'
      }, trustedDomain);

    });


  });

  function handleMessage(e) {

    // probably should do more checking here for presence of properties on the e.data object

    if (e.data.messageType === 'initialDomState' && e.origin === trustedDomain) {
      console.log('setting iframe height according to contents: ' + e.data.initFrameHeight);
      document.getElementById('pci-frame')
        .setAttribute('height', e.data.initFrameHeight);
    }

    if (e.data.messageType === 'responseMessage' && e.origin === trustedDomain) {
      console.log('Child frame responded', e.data.messageContent);
    }


  }

  if (window.addEventListener) {
    window.addEventListener('message', handleMessage, false);
  } else if (window.attachEvent) { // ie8
    window.attachEvent('onmessage', handleMessage);
  }



})();
