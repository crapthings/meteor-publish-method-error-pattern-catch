Meteor.startup(async function () {
  const test = await new Promise(resolve => Meteor.call('test', (err, resp) => resolve([err, resp])))
  console.log(test)
})
