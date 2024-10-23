import { ApiTokenCheckMiddleware } from './api-token-check.middleware';

describe('ApiTokenCheckMiddleware', () => {
  it('should be defined', () => {
    expect(new ApiTokenCheckMiddleware()).toBeDefined();
  });
});
