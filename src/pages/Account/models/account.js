import { queryAccount } from '@/services/api';

const VIEWS = {
  list: { key: 'list', name: 'Table Users' },
  detail: { key: 'detail', name: 'Uesr details' },
};

export default {
  namespace: 'account',

  state: {
    VIEWS,
    view: VIEWS.list,
    currentUser: {},
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryAccount, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    toggleView(state, action) {
      return {
        ...state,
        view: state.view.key === VIEWS.list.key ? VIEWS.detail : VIEWS.list,
        currentUser: action.payload,
      };
    },
  },
};
