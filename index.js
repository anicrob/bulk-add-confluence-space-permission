const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
require("dotenv").config();
const getSpaceIds = require("./getSpaceIds");
console.log = function (d) {
  log_file.write(util.format(d) + "\n");
  log_stdout.write(util.format(d) + "\n");
};

const addConfluencePermissions = async () => {
  const spaceKeys = await getSpaceIds();
  const bodyData = {
    subject: {
      //can be group or user
      type: "group",
      //the group or user ID
      identifier: "48396120-a8fd-44af-b41c-956020390408",
    },
    operation: {
      //for info about the key and target options, look at the documentation here: https://developer.atlassian.com/cloud/confluence/rest/v1/api-group-space-permissions/#api-wiki-rest-api-space-spacekey-permission-post
      key: "read",
      target: "space",
    },
    _links: {},
  };
  await Promise.all(
    spaceKeys.map(async (spaceKey) => {
      let URL = `${process.env.URL}/wiki/rest/api/space/${spaceKey}/permission`;
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          Authorization: `Basic ${process.env.API_KEY}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });
      if (response.status === 200) {
        console.log(
          `${new Date().toGMTString()} - the permissions have been added.`
        );
      } else {
        console.log(
          `${new Date().toGMTString()} - There was an error with adding permissions in space, ${spaceKey}. ${
            response.status
          }: ${response.statusText}`
        );
      }
    })
  );
};

addConfluencePermissions();
