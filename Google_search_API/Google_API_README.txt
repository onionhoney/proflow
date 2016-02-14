### Creating Google Custom Search Engine
https://cse.google.com/cse/all
Choose searching domain (entire web or particular website).
Get Search engine ID in Setup -> Basics -> Details.

cx: 011043985394505284497:04toexks_gs

### Testing the CSE created
See HTML webpage "Google_API_testing.html"

### Adding credentials for Custom Search API to access
Google Custom Search API in Google Developers Console -> API Manager

API Key (Browser key): AIzaSyAe0ReD5igVVJFmDMJKHCAOU3nRHT4E2As

### Testing "CSE:list" function in Google APIs Explorer
using my own "cx" and API Key.
https://developers.google.com/apis-explorer/#search/cse:list/m/customsearch/v1/search.cse.list

Result data in "CSE-list_testing-result.json", with searching keyword "Hello" on the entire web.

### References
Custom Search: Overview: https://developers.google.com/custom-search/docs/overview
	Available APIs
	Class Reference

JSON/Atom Custom Search API: Introduction
JSON/Atom API Reference -> CSE:list: https://developers.google.com/custom-search/json-api/v1/reference/cse/list

JavaScript API Reference: https://developers.google.com/custom-search/docs/js/cselement-reference