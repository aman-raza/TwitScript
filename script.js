const Twit = require('twit')
    // const notifier = require('node-notifier');
    // const open = require('open');
    // const franc = require('franc')

const apikey = 'DEY1Nna....aARlKgRPwFZ6gB'
const apiSecretKey = 'i3ubTxuix3Z0CEVqTmxwC9gaq6....ZJFsdAPSqP2uRqxg7KEf'
const accessToken = '959877444965511168-H6XH5a3TW....5lRveqy3bBoaoncYRu'
const accessTokenSecret = 'LJzkWLnb3MS0r351....r65Url0GPlyulIxa8MWcqycev'

var T = new Twit({
    consumer_key: apikey,
    consumer_secret: apiSecretKey,
    access_token: accessToken,
    access_token_secret: accessTokenSecret,
});

(async() => {

    // Get recent tweets
    T.get('search/tweets', { q: '#quotes', count: 30 }, function(err, data, response) {
        const tweets = data.statuses
            // .map(tweet => `LANG: ${franc(tweet.text)} : ${tweet.text}`) //Check Language
            .map(tweet => tweet.text)
            .filter(tweet => tweet.toLowerCase().includes('quotes'));
        console.log(tweets);
        // document.getElementById().innerHTML = tweet;s
    })

    // Real time monitoring using stream (#Hashtag)
    var stream = T.stream('statuses/filter', { track: '#tesla' })
    stream.on('tweet', function(tweet) {
        console.log(tweet.text);
        console.log('Language: ' + franc(tweet.text));
        console.log('------');
    })

    // Real time monitoring using stream (!Location)
    var sanFrancisco = ['-122.75', '36.8', '-121.75', '37.8']
    var stream = T.stream('statuses/filter', { locations: sanFrancisco })

    // Show notification for each tweets recieved
    stream.on('tweet', function(tweet) {
        console.log(tweet.text);
        let url = `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`

        notifier.notify({
            title: tweet.user.name,
            message: tweet.text
        });

        notifier.on('click', async function(notifierObject, options, event) {
            console.log('clicked');
            await open(url);
        });
    })
})();