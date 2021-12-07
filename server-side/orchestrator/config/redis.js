const Redis = require("ioredis");
const redis = new Redis(
  "redis://:6PWsqLAGbRksFAg9DdHRU40zlRU32tOp@redis-15851.c273.us-east-1-2.ec2.cloud.redislabs.com:15851"
);

module.exports = redis;
