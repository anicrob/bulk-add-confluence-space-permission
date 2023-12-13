const getSpaceIds = async () => {
  let spaceKeys = [];
  const index = [
    0, 25, 50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300, 325, 350, 375,
    400, 425, 450, 475, 500, 525, 550, 575, 600, 625, 650, 675, 700, 725, 750,
    775, 800,
  ];
  await Promise.all(
    index.map(async (id) => {
      try {
        const response = await fetch(
          //this will search for any spaces that are global (any space that's not a personal space) and it is not archived, so it's status is current
          `${process.env.URL}/wiki/api/v2/spaces/?type=global&status=current`,
          {
            method: "GET",
            headers: {
              Authorization: `Basic ${process.env.API_KEY}`,
              Accept: "application/json",
            },
          }
        );

        let { results } = await response.json();
        if (results.length > 0) {
          let key = results.map((item) => item.key);
          spaceKeys.push(...key);
        } else if (results.length === 1) {
          let key = results.key;
          spaceKeys.push(key);
        } else {
          return;
        }
      } catch (err) {
        console.log(err);
      }
    })
  );
  return spaceKeys;
};

module.exports = {
  getSpaceIds,
};
