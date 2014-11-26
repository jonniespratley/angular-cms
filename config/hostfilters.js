{
	"hostname.domain.tld": {
		"redirect": "www.google.com"
	},
	"*:80": {
		"proxyto": "localhost:9000",
		"validuser": {
			"admin": "admin",
			"user": "fred"
		},
		"description": "Very secret project here ;-)"
	}
}