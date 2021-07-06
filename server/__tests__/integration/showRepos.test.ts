/* global describe, it, expect, afterAll */

import Api from '../utils/apiCalls';

import mock from '../mocks/user';

describe('ShowRepos', () => {
  afterAll(async () => {
    await Api.close();
  });

  it('should return user repos', async () => {
    const response = await Api.showUserRepos(mock.validUser);

    expect(response.status).toBe(200);
    if (response.body.length > 0) {
      expect(response.body[0].owner?.login?.toUpperCase()).toBe(mock.validUser.toUpperCase());
    }
  });

  it('should not return user repos', async () => {
    const response = await Api.showUserRepos(mock.invalidUser);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Not Found');
  });
});
