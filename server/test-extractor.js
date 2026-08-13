const passportJwt = require('passport-jwt');
const { ExtractJwt } = passportJwt;
const extractor = ExtractJwt.fromExtractors([
  () => undefined,
  () => 'my-token'
]);
console.log('Result:', extractor({}));
