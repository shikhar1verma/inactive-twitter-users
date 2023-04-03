const { fetchInactiveUsers } = require('./lib/findInactiveUsers');

(async () => {
  const inactiveDays = 10;
  await fetchInactiveUsers(inactiveDays);
})();

