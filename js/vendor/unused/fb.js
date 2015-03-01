   var FBenabled = false;

   $(function() {
      $('<div id="fb-root"></div>').prependTo($('body'));
      if (FBenabled) {
         window.fbAsyncInit = function() {
            // init the FB JS SDK
            FB.init({
               appId: '704915436265859', // App ID from the app dashboard
               channelUrl: '//quadramma.com//channel.html', // Channel file for x-domain comms
               status: true, // Check Facebook Login status
               xfbml: true // Look for social plugins on the page
                  ,
               version: 'v2.2'
            });

            // Additional initialization code such as adding Event Listeners goes here
         };

         // Load the SDK asynchronously
         (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
               return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/all.js";
            fjs.parentNode.insertBefore(js, fjs);
         }(document, 'script', 'facebook-jssdk'));
      }
   });