exports.handler = function (event, context, callback) {
  console.log(JSON.stringify(event));
  console.log(JSON.stringify(context));
  callback(null, { statusCode: 200 });
}
