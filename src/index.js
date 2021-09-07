var removeVids = function () {
    var n = parseInt(prompt('Number of videos to remove?', 1));
    var watchedPercent = parseInt(prompt('Percent to consider watched', 100));
    var vids = Array.from(document.querySelectorAll('ytd-playlist-video-renderer'));
    var vidsThatMatch = vids.filter(v => {
        return v.querySelectorAll('#progress').length && parseInt(v.querySelector('#progress').style.width) >= watchedPercent;
    });
    if (vidsThatMatch.length < n) { n = vidsThatMatch.length }; 
    var i = 0; 
    var interval = setInterval(function () {
         if (n > 0) {
            vidsThatMatch[i].querySelector('yt-icon-button.ytd-menu-renderer').click();
            var title = vidsThatMatch[i].querySelector('#video-title');
            console.log('Removed:', title.innerText, title.href);

            // need to search the whole document pop up lives in another container
            setTimeout(() => {
                var removeResults = document.evaluate("//span[contains(., 'Remove from')]", document, null, XPathResult.ANY_TYPE, null);
                var removeText = removeResults.iterateNext();
                removeText.click();
                n--;
                i++;
            });
        } else {
            console.log('No vids');
            clearInterval(interval);
        }
    }, 500);
}; 
removeVids();