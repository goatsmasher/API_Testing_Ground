const Twitter = require("twitter"),
	config = require("./config.js");

const T = new Twitter(config);
const params = {
	q: "#node.js",
	count: 3,
	result_type: "recent",
	lang: "en"
};

//To favorite tweets with traditional for loop
let id = { id: data.statuses[i].id_str };
T.post("favorites/create", id, function (err, response) {
	if (err) {
		console.log(err[0].message);
	}
	else {
		let username = response.user.screen_name;
		let tweetId = response.id_str;
		console.log("Favorited: ", `https://twitter.com/${username}/status/${tweetId}`);
	}
});


//To follow users using forEach()
T.get("search/tweets", params, (err, data, response) => {
	if (!err) {
		data.statuses.forEach(function (element) {
			let screen_name = element.user.screen_name;
			T.post("friendships/create", { screen_name }, (err, res) => {
				if (err) console.log(err);
				else {
					console.log(screen_name, ": **Followed**");
				}
			});

		}, this);
	}
	else {
		console.log(err);
	}
});

