/* eslint-disable unicorn/no-empty-file */
jest.mock('typeorm-transactional', () => ({
  Transactional: () => jest.fn(),
}));
