//Akamai-Bot: Unknown Bot (7B0E3E55A5C82C70F90BCAD94E19866A):monitor:Behavior Anomaly:60:strict

import { ZuploContext, ZuploRequest } from "@zuplo/runtime";

export async function rateLimitKey (request: ZuploRequest, context: ZuploContext) {

  let clientIp = request.headers.get('My-True-Client-IP')

  // check to see if the header exists, otherwise return back full access
  if (request.headers.has('Akamai-Bot')) {
    // parse out the header to find the segment the request should be bucketed in
    const botInfo = request.headers.get('Akamai-Bot');
    context.log.info({botInfo: botInfo, clientIp: clientIp})
    // extract out the text after the last colon in the string
    const segment = botInfo.substring(botInfo.lastIndexOf(':') + 1).trim();
    context.log.info("segment: " + segment)
    if (segment === 'cautious') {
      return {
        key: clientIp,
        requestsAllowed: 15,
        timeWindowMinutes: 1
      };
    } else if (segment === 'strict') {
      return {
        key: clientIp,
        requestsAllowed: 10,
        timeWindowMinutes: 1
      };
    } else if (segment === 'aggressive') {
      context.log.info("I'm an aggressive bot")
      return {
        key: clientIp,
        requestsAllowed: 3,
        timeWindowMinutes: 1
      };
    }
  
  }
  // either no Akamai-Bot header or header does not indicate a bot
  return {
    key: clientIp,
    requestsAllowed: 50,
    timeWindowMinutes: 1
  }
}