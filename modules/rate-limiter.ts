//module - ./modules/rate-limiter.ts


import {
  CustomRateLimitDetails,
  ZuploRequest,
  ZuploContext,
} from "@zuplo/runtime";


export function rateLimitKey(
  request: ZuploRequest,
  context: ZuploContext,
  policyName: string,
): CustomRateLimitDetails | undefined {

  const details: CustomRateLimitDetails = {
    key: request.headers.get("true-client-ip"),
  };

  return details;
}