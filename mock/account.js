import { parse } from 'url';

// mock tableListDataSource
function getData() {
  const data = [];
  for (let i = 0; i < 46; i += 1) {
    data.push({
      key: i,
      disabled: i % 6 === 0,
      name: `name ${i}`,
      lastname: `${i}-nt`,
      email: `mail-${i}@bn.zu`,
      phone: Math.floor(Math.random() * 1000),
      activity: 'nothing',
    });
  }
  return data;
}

function getAccounts(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  let dataSource = getData();

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  if (params.status) {
    const status = params.status.split(',');
    let filterDataSource = [];
    status.forEach(s => {
      filterDataSource = filterDataSource.concat(
        dataSource.filter(data => parseInt(data.status, 10) === parseInt(s[0], 10))
      );
    });
    dataSource = filterDataSource;
  }

  if (params.name) {
    dataSource = dataSource.filter(data => data.name.indexOf(params.name) > -1);
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const currentPage = parseInt(params.currentPage, 10) || 1;
  const result = {
    list: dataSource.splice(currentPage * pageSize, pageSize),
    pagination: {
      total: dataSource.length,
      pageSize,
      current: currentPage,
    },
  };

  return res.json(result);
}

export default {
  'GET /api/account': getAccounts,
};
