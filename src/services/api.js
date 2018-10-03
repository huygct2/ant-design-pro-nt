import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryAccount(params) {
  return request(`/api/account?${stringify(params)}`);
}
