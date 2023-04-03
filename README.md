# Inactive twitter users

This utility will help you track your inactive twitter following list. You can know who in your following list is inactive and stale. Not sharing anything. 

Everything here is without any use of Twitter API.

## How to use

There are two way to use this utility.

1. **Enter manually your following REST ids.** These ids are how to APIs communicate about user with APIs.
2. **Fetch following REST ids automatically through your cookie.** In this method you need to add your cooking and csrf token in .env file so that your following list can be extracted on behalf of you.

Steps for way 1 (Enter manually your following REST ids):

1. After cloning the project. Do `npm install` to install few libraries.
2. Then add the rest ids of followings in /metadata/dynamic/manual_following_list.json. How to get the rest ids is in that folder only. Steps to get rest_id in /metadata/dynamic/manual_following_list.json README.md.
3. Once list is ready. Then run npm start. It will run the index.js file.
4. The excel of user with their activity will be present in /data/inactive-user-analysis.xlsx.




Just sharing way 1 for now. Will take some time to share the 2nd way in a safe way.