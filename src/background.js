chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: '*'},
      })
      ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
  chrome.webRequest.onBeforeRequest.addListener(function(details) {
    console.log(details.url)
    if (details.url.startsWith('http://reddit.com/') || details.url.startsWith('https://reddit.com/') || details.url.startsWith('https://www.reddit.com/') || details.url.startsWith('http://www.reddit.com/')){
      console.log("WANT TO CHANGE: ", details.url)
      var index = details.url.indexOf("com");
      var newUrl = "http://old.reddit." + details.url.substring(index);
      console.log("new url: ", newUrl)
      return {redirectUrl: newUrl};
    }
  }, {
    urls: ["<all_urls>"],
    types: ['main_frame', 'sub_frame'],
  }, [
    'blocking'
  ]);
});
