/* global describe, it, expect, afterAll */

import Api from '../utils/apiCalls';

import mock from '../mocks/user';

describe('ShowDetails', () => {
  afterAll(async () => {
    await Api.close();
  });

  it('should return user details', async () => {
    const response = await Api.showUserDetails(mock.validUser);

    expect(response.status).toBe(200);
    expect(response.body.login?.toUpperCase()).toBe(mock.validUser.toUpperCase());
  });

  it('should not return user details', async () => {
    const response = await Api.showUserDetails(mock.invalidUser);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Not Found');
  });
});
