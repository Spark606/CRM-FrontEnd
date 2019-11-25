// import * as cs from '../constants';

const initialState = {
  documentTitle: 'Orderock',
  openKeys: [''],
  menuselectedKeys: ['home'],
  minScreen: false,
  noticeList: [],
  tableRow: 10,
  currentPage: 1,
  showGuideStatus: false
};

// const layoutReducer = (state = initialState) => state;
export default function layoutReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
// export default layoutReducer;
