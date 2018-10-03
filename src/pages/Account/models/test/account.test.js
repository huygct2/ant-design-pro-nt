import expect from 'expect';
import { effects } from 'dva/saga';
import account from '../account';

describe('Account Model', () => {
  it('loads', () => {
    expect(account).toExist();
  });
  describe('effects', () => {
    it('Should work', () => {
      const { call, put } = effects;
      const sagas = account.effects;
      const saga = sagas.fetch;
      const generator = saga({ type: 'account/fetch' }, { call, put });
      let next = generator.next();
      next = generator.next();
      expect(next.value).toEqual(put({ type: 'save', payload: undefined }));
    });
  });
});