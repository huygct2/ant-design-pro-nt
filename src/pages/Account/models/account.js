import { queryRule, removeRule, addRule, updateRule } from '@/services/api';

const VIEWS = {
  list: { key: 'list', name: 'Table Users' },
  detail: { key: 'detail', name: 'Uesr details' }
}

export default {
  namespace: 'account',

  state: {
    VIEWS,
    view: VIEWS.list,
    data: {
      list: [],
      pagination: {},
    }
  },

  effects: {
    *toggleView({ payload }, { put }) {
      yield put({
        type: 'toggleView'
      });
    },
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    toggleView(state) {
      return {
        ...state,
        view: state.view.key === VIEWS.list.key ? VIEWS.detail : VIEWS.list,
      };
    }
  },
};
