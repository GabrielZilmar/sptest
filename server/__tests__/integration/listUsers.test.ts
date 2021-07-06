/* global describe, it, expect, afterAll */

import Api from '../utils/apiCalls';

import mock from '../mocks/listUsers';

describe('ListUsers', () => {
  afterAll(async () => {
    await Api.close();
  });

  it('should return the users with default queries', async () => {
    const response = await Api.listUsers(null);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(30);
    expect(response.body[0]?.id).toBe(1);
  });

  it('should return the users with one default queries', async () => {
    let response = await Api.listUsers(mock.sinceQuery);
    expect(response.status).toBe(200);
    expect(response.body[0]?.id).toBeGreaterThan(mock.sinceQuery.since);

    response = await Api.listUsers(mock.perPageQuery);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(mock.perPageQuery.perPage);
  });

  it('should return the users respecting the queries', async () => {
    const response = await Api.listUsers(mock.validQueries);

    expect(response.status).toBe(200);
    expect(response.body[0]?.id).toBeGreaterThan(mock.validQueries.since);
    expect(response.body.length).toBe(mock.validQueries.perPage);
  });

  it('should not return the users', async () => {
    const response = await Api.listUsers(mock.invalidQueries);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('The queries need to be numbers. Since need to be >= 0 and perPage > 0 and < 100');
  });
});
