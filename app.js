var express = require('express'),
	cheerio = require('cheerio'),
	request = require('request'),
	port = process.env.PORT || 5050,
	app = express();

app.get('/', function(req, res) {

	// Init vars
	var	url = 'https://www.google.com.au/?gws_rd=ssl',
		userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.7; rv:22.0) Gecko/20100101 Firefox/22.0';
	
	// Request URL
	request({ uri: url, headers: {'user-agent': userAgent} }, function (error, response, body) {
		
		if (error && response.statusCode !== 200) return res.send({error: error});
		
		// Bind the Cheerio object to $ variable so the syntax looks looks jQuery-esque.
		var	$ = cheerio.load(body);
		
		// Get the title of the page or any other DOM node using jQuery syntax.
		// See CheerioJS documentation for supported selectors https://github.com/cheeriojs/cheerio.
		// Grabbing all DOM nodes of a type will return an array of nodes which generally needs to be looped
		// through to get the inner text or an attribute. The loops will be asynchronous so you'll need to handle
		// callbacks before responding with the data.
		var title = $('title').text();
		
		// Respond with the title
		res.send(title);
		
	});

});

app.listen(port, function() {
	console.log('Listening on ' + port);
});