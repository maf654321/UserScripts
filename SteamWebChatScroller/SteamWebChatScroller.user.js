// ==UserScript==
// @name Steam web chat scroller
// @namespace http://sharparam.com/
// @description Scrolls the message view on new messages in the Steam web chat.
// @downloadURL https://github.com/Sharparam/UserScripts/raw/master/SteamWebChatScroller/SteamWebChatScroller.user.js
// @updateURL https://github.com/Sharparam/UserScripts/raw/master/SteamWebChatScroller/SteamWebChatScroller.meta.js
// @include https://steamcommunity.com/chat/*
// @version 1.0.0
// @grant none
// @run-at document-end
// ==/UserScript==

var registered = false;

function registerObserver() {
    if (registered)
        return;

    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            Array.prototype.forEach.call(mutation.addedNodes, function(node) {
                node.scrollIntoView(true);
            });
        });
    });

    observer.observe(document.querySelector('.chat_dialog_content_inner'), {
        childList: true
    });

    registered = true;
}

var logObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        Array.prototype.forEach.call(mutation.addedNodes, function(node) {
            if (node.className == 'chat_dialog') {
                registerObserver();
                logObserver.disconnect();
            }
        });
    });
});

logObserver.observe(document.querySelector('#chatlog'), {
    childList: true
});
