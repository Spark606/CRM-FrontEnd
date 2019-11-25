import * as cs from '../constants';
const data = [
    {
      key: 1,
      clientName: 'John Brown',
      certificate: '一级房建转加造价初',
      remarks: 'New York No. 1 Lake Park',
      getClientTime: '2012-12-11',
      expireDate: '2010-12-24',
      status: 1,
      tel: '17844537359',
      qq: '1105394023',
      agent: 'Liz',
      province: '四川',
      gender: 1,
      email: 'lizbaby606@163.com',
    },
    {
      key: 2,
      clientName: 'Joe Black',
      certificate: '一级房建转加造价初',
      remarks: 'London No. 1 Lake Park',
      getClientTime: '2012-12-11',
      expireDate: '2020-12-24',
      status: 1,
      tel: '17844537359',
      qq: '1105394023',
      agent: 'Liz',
      province: '四川',
      gender: 1,
      email: 'lizbaby606@163.com',
    },
    {
      key: 3,
      clientName: 'Jim Green',
      certificate: '一级房建转加造价初',
      remarks: 'Sidney No. 1 Lake Park',
      getClientTime: '2012-12-11',
      expireDate: '2020-12-24',
      status: 2,
      tel: '17844537359',
      qq: '1105394023',
      agent: 'Liz',
      province: '四川',
      gender: 1,
      email: 'lizbaby606@163.com',
    },
    {
      key: 4,
      clientName: 'Jim Red',
      certificate: '一级房建转加造价初',
      remarks: 'London No. 2 Lake Park',
      getClientTime: '2012-12-11',
      expireDate: '2020-12-24',
      status: 1,
      tel: '17844537359',
      qq: '1105394023',
      agent: 'Liz',
      province: '四川',
      gender: 1,
      email: 'lizbaby606@163.com',
    },
    {
      key: 5,
      clientName: 'Jim Red',
      certificate: '一级房建转加造价初',
      remarks: 'London No. 2 Lake Park',
      getClientTime: '2012-12-11',
      expireDate: '2020-12-24',
      status: 1,
      tel: '17844537359',
      qq: '1105394023',
      agent: 'Liz',
      province: '四川',
      gender: 1,
      email: 'lizbaby606@163.com',
    },
    {
      key: 6,
      clientName: 'Jim Red',
      certificate: '一级房建转加造价初',
      remarks: 'London No. 2 Lake Park',
      getClientTime: '2012-12-11',
      expireDate: '2020-12-24',
      status: 1,
      tel: '17844537359',
      qq: '1105394023',
      agent: 'Liz',
      province: '四川',
      gender: 1,
      email: 'lizbaby606@163.com',
    },
    {
      key: 7,
      clientName: 'Jim Red',
      certificate: '一级房建转加造价初',
      remarks: 'London No. 2 Lake Park',
      getClientTime: '2012-12-11',
      expireDate: '2020-12-24',
      status: 1,
      tel: '17844537359',
      qq: '1105394023',
      agent: 'Liz',
      province: '四川',
      gender: 1,
      email: 'lizbaby606@163.com',
    },
    {
      key: 8,
      clientName: 'Jim Red',
      certificate: '一级房建转加造价初',
      remarks: 'London No. 2 Lake Park',
      getClientTime: '2012-12-11',
      expireDate: '2020-12-24',
      status: 1,
      tel: '17844537359',
      qq: '1105394023',
      agent: 'Liz',
      province: '四川',
      gender: 1,
      email: 'lizbaby606@163.com',
    },
    {
      key: 9,
      clientName: 'Jim Red',
      certificate: '一级房建转加造价初',
      remarks: 'London No. 2 Lake Park',
      getClientTime: '2012-12-11',
      expireDate: '2020-12-24',
      status: 1,
      tel: '17844537359',
      qq: '1105394023',
      agent: 'Liz',
      province: '四川',
      gender: 1,
      email: 'lizbaby606@163.com',
    },
    {
      key: 10,
      clientName: 'Jim Red',
      certificate: '一级房建转加造价初',
      remarks: 'London No. 2 Lake Park',
      getClientTime: '2012-12-11',
      expireDate: '2020-12-24',
      status: 1,
      tel: '17844537359',
      qq: '1105394023',
      agent: 'Liz',
      province: '四川',
      gender: 1,
      email: 'lizbaby606@163.com',
    },
    {
        key: 11,
        clientName: 'John Brown',
        certificate: '一级房建转加造价初',
        remarks: 'New York No. 1 Lake Park',
        getClientTime: '2012-12-11',
        expireDate: '2010-12-24',
        status: 1,
        tel: '17844537359',
        qq: '1105394023',
        agent: 'Liz',
        province: '四川',
        gender: 1,
        email: 'lizbaby606@163.com',
      },
      {
        key: 12,
        clientName: 'Joe Black',
        certificate: '一级房建转加造价初',
        remarks: 'London No. 1 Lake Park',
        getClientTime: '2012-12-11',
        expireDate: '2020-12-24',
        status: 1,
        tel: '17844537359',
        qq: '1105394023',
        agent: 'Liz',
        province: '四川',
        gender: 1,
        email: 'lizbaby606@163.com',
      },
      {
        key: 13,
        clientName: 'Jim Green',
        certificate: '一级房建转加造价初',
        remarks: 'Sidney No. 1 Lake Park',
        getClientTime: '2012-12-11',
        expireDate: '2020-12-24',
        status: 2,
        tel: '17844537359',
        qq: '1105394023',
        agent: 'Liz',
        province: '四川',
        gender: 1,
        email: 'lizbaby606@163.com',
      },
      {
        key: 14,
        clientName: 'Jim Red',
        certificate: '一级房建转加造价初',
        remarks: 'London No. 2 Lake Park',
        getClientTime: '2012-12-11',
        expireDate: '2020-12-24',
        status: 1,
        tel: '17844537359',
        qq: '1105394023',
        agent: 'Liz',
        province: '四川',
        gender: 1,
        email: 'lizbaby606@163.com',
      },
      {
        key: 15,
        clientName: 'Jim Red',
        certificate: '一级房建转加造价初',
        remarks: 'London No. 2 Lake Park',
        getClientTime: '2012-12-11',
        expireDate: '2020-12-24',
        status: 1,
        tel: '17844537359',
        qq: '1105394023',
        agent: 'Liz',
        province: '四川',
        gender: 1,
        email: 'lizbaby606@163.com',
      },
      {
        key: 16,
        clientName: 'Jim Red',
        certificate: '一级房建转加造价初',
        remarks: 'London No. 2 Lake Park',
        getClientTime: '2012-12-11',
        expireDate: '2020-12-24',
        status: 1,
        tel: '17844537359',
        qq: '1105394023',
        agent: 'Liz',
        province: '四川',
        gender: 1,
        email: 'lizbaby606@163.com',
      },
      {
        key: 17,
        clientName: 'Jim Red',
        certificate: '一级房建转加造价初',
        remarks: 'London No. 2 Lake Park',
        getClientTime: '2012-12-11',
        expireDate: '2020-12-24',
        status: 1,
        tel: '17844537359',
        qq: '1105394023',
        agent: 'Liz',
        province: '四川',
        gender: 1,
        email: 'lizbaby606@163.com',
      },
      {
        key: 18,
        clientName: 'Jim Red',
        certificate: '一级房建转加造价初',
        remarks: 'London No. 2 Lake Park',
        getClientTime: '2012-12-11',
        expireDate: '2020-12-24',
        status: 1,
        tel: '17844537359',
        qq: '1105394023',
        agent: 'Liz',
        province: '四川',
        gender: 1,
        email: 'lizbaby606@163.com',
      },
      {
        key: 19,
        clientName: 'Jim Red',
        certificate: '一级房建转加造价初',
        remarks: 'London No. 2 Lake Park',
        getClientTime: '2012-12-11',
        expireDate: '2020-12-24',
        status: 1,
        tel: '17844537359',
        qq: '1105394023',
        agent: 'Liz',
        province: '四川',
        gender: 1,
        email: 'lizbaby606@163.com',
      },
  ];
const records = [
  {
    key: 1,
    content: 'Create a services site',
    recorderName: 'Liz',
    recorderId: 3,
    recorderTime: '2018-12-11 22:23:21'
  },
  {
    key: 2,
    content: 'Solve initial network problems',
    recorderName: 'Liz',
    recorderId: 3,
    recorderTime: '2018-12-11 22:23:21'
  },
  {
    key: 3,
    content: 'Technical testing',
    recorderName: 'Liz',
    recorderId: 3,
    recorderTime: '2018-12-11 22:23:21'
  },
  {
    key: 4,
    content: 'Network problems being solved',
    recorderName: 'Liz',
    recorderId: 3,
    recorderTime: '2018-12-11 22:23:21'
  },

];
const initialState = {
    clientsList: data,
    tableRow: 10,
    currentPage: 1,
    oneClientRecord: records
};

// const layoutReducer = (state = initialState) => state;
export default function clientReducer(state = initialState, action) {
    switch (action.type) {
        case cs.GET_CLIENTS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case cs.GET_CLIENTS_SUCCESS:
            return Object.assign({}, state, {
                ...action.payload,
                isFetching: false,
            });
        case cs.GET_CLIENTS_FAIL:
            return Object.assign({}, state, {
                isFetching: false,
            });

            
        case cs.GET_RECORDS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case cs.GET_RECORDS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                ...action.payload,
            });
        case cs.GET_RECORDS_FAIL:
            return Object.assign({}, state, {
                isFetching: false,
            });

          // case cs.GET_CLIENTS_REQUEST:
        //     return Object.assign({}, state, {
        //         isFetching: true
        //     });
        // case cs.GET_CLIENTS_SUCCESS:
        //     return Object.assign({}, state, {
        //         isFetching: false,
        //     });
        // case cs.GET_CLIENTS_FAIL:
        //     return Object.assign({}, state, {
        //         isFetching: false,
        //     });
        default:
            return state;
    }
}
  // export default layoutReducer;
