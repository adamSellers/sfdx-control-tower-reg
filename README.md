# SFDX  App
This application is the front facing component of the Salesforce Control Tower Registration. 
At the moment, this is not even approaching something that I would consider to be a PoC ... if you have stumbled on this repo by accident then I would walk on by :) 

## Dev, Build and Test
```
sfdx force:source:push 
```
And then
```
sfdx force:org:open
```
And now you are going to need to configure a few things..

* You want a CSP Trusted Site. This will be the site that hosts the registration application handling the OAuth flow. 
* Open the home page and configure the custom component that is now there (Registration App Configuration is it's name in the Lightning App Builder)
..* You will need the OAuth Client_ID, the callback context and the server as well (same as your CSP Trusted Site)


