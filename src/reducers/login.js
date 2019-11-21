const defaultState = {
    inputValue: '',
    list:[1,2],
    showMsg:false
}
export default (state = defaultState,action)=>{
    // 根绝action.type 判断更改何值
    if(action.type === 'change_input_value'){
        // why copy old state -> newState ? reducer 可以接收state 不能修改state！！！
        const newState = JSON.parse(JSON.stringify(state)); // 深度拷贝
        newState.inputValue = action.value;
        return newState;
    }
    return state;
}