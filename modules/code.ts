import { ZuploContext, ZuploRequest } from "@zuplo/runtime";

export default async function (request: ZuploRequest, context: ZuploContext) {

  // check to see if the header exists, otherwise return back full access
  if (request.headers.has('Akamai-Bot')) {
    // parse out the header to find the segment the request should be bucketed in
    const botInfo = request.headers.get('Akamai-Bot');
    // extract out the text after the last colon in the string
    const segment = botInfo.substring(botInfo.lastIndexOf(':') + 1).trim();
    if (segment === 'cautious') {
          return {
            key: request.headers.get('True-Client-IP'),
            requestsAllowed: 15,
            timeWindowMinutes: 1
          };
        } else if (segment === 'strict') {
          return {
            key: request.headers.get('True-Client-IP'),
            requestsAllowed: 10,
            timeWindowMinutes: 1
          };
        } else if (segment === 'aggressive') {
          return {
            key: request.headers.get('True-Client-IP'),
            requestsAllowed: 3,
            timeWindowMinutes: 1
          };
        }
  
  }
  // either no Akamai-Bot header or header does not indicate a bot
  return {
    key: request.headers.get('True-Client-IP'),
    requestsAllowed: 50,
    timeWindowMinutes: 1
  }
}