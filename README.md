# Bulk add Confluence Space Permissions


## Description

Follow the set up directions in the Setup Instructions section to run this script. This script will allow you to bulk add a space permission for either a user or group.

## Table of Contents
* [Setup Instructions](#setup-instructions)
* [Usage](#usage)
* [Basic Auth](#basic-auth)
* [Permissions](#permissions)
* [Credits](#credits)


## Setup Instructions

Here are the setup steps:

1. Ensure you have Node.js downloaded: https://nodejs.org/en (note this link is for MacOS)

Select the option on the left. 

To check and see if you have node already installed or if the install was successful, run the command:

~~~
node -v
~~~

2. After doing a git clone, install the necessary packages. They are already added to the package.json, so all that's needed is to run the following commmand:
~~~
npm i
~~~

3. Set up an .env file

Run the following command:
~~~
touch .env
~~~

Add two values to this file with the following titles:

API_KEY - see Basic Auth section on how to get this value; see permissions section to see which permissions this user needs

URL - this is the Atlassian url instance (e.g. https://your-domain.atlassian.net)

Note: you can use .env.TEMPLATE as a reference

## Usage

To use this script, run it by using the following command:

~~~
npm run start
~~~

OR

~~~
node index.js
~~~

## Basic Auth

Atlassian uses Basic Auth for a few of their REST endpoints for their authentication headers. Here are the steps to get your API token into Basic Auth format:

1. Ensure you have an API key created. Go here to create one if needed: https://id.atlassian.com/manage-profile/security/api-tokens

2. The format of basic auth is username:password then base64. The username is your email associated with your Atlassian account and then the password is the API key.

3. In the terminal run this command: (replacing user@example.com with your Atlassian account email and api_token_string with your api ke from step 1)

~~~
echo -n user@example.com:api_token_string | base64
~~~

## Permissions 


To get the Confluence Space key to add the permission to, you will need permission to access the Confluence site ('Can use' global permission). Only spaces that the user has permission to view will be returned.

To add the permission to the space, 'Admin' permission for the space is required.

Therefore, this script cannot guarantee that ALL Confluence spaces are found or that you will be able to add the permission to any of the Confluence Spaces found, but only those available based on the above permission limitations to the API endpoints. 

## Credits

This was created by anicrob. 

Jira Cloud REST APIs Endpoints used: 
- [Get spaces](https://developer.atlassian.com/cloud/confluence/rest/v2/api-group-space/#api-spaces-get)
- [Add new permission to space](https://developer.atlassian.com/cloud/confluence/rest/v1/api-group-space-permissions/#api-wiki-rest-api-space-spacekey-permission-post)


You can find more of my work at [anicrob](https://github.com/anicrob).

