let utils = {}

utils.parseOutboundTokenData = function(data){
  const parsedData = JSON.parse(data);
  return parsedData;
}

module.exports = utils;
