// import * as cs from '../constants';

const initialState = {
  documentTitle: 'Orderock',
  openKeys: [''],
  menuselectedKeys: ['home'],
  minScreen: false,
  noticeList: [],
  tableRow: 10,
  showGuideStatus: false,
  noticeCount: 10
};

// const layoutReducer = (state = initialState) => state;
export default function layoutReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
// export default layoutReducer;
