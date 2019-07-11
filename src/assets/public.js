/**
 * [公共方法]
 * @author luke 2017-12-26
 */
/**
 * [增加事件判断]
 * @author luke 2017-12-26
 * @param  {[type]} v [值]
 */
const formatTime = v => {
  return v < 10 ? '0' + v : v;
};

/**
 * [判断等于null || ''  || undefined ]
 * @author luke 2017-12-26
 */
const isNull = falg => {
  return falg === null || falg === undefined || falg === '';
};

/**
 * [delArray 数组删除方法]
 * @author luke 2017-11-16
 * @param  {[Array]} arr [数组]
 * @param  {[String]} val [值]
 */
const delArray = (arr, val) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === val) {
      arr.splice(i, 1);
    }
  }
};

/**
 * [日期处理]
 * @author luke 2018-01-03
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
const formatData = value => {
  if (!value) {
    return '';
  }
  let _data = new Date(value * 1000);
  let _month = _data.getMonth() + 1;
  let _year = _data.getFullYear();
  let vdate = _data.getDate(); // 天
  let _hour = _data.getHours(); // 时
  let _minutes = _data.getMinutes(); // 分
  let _seconds = _data.getSeconds(); // 秒
  // 处理日期个位数添加0
  _month = formatTime(_month);
  _minutes = formatTime(_minutes);
  _seconds = formatTime(_seconds);
  vdate = formatTime(vdate);
  _hour = formatTime(_hour);
  return _year + '-' + _month + '-' + vdate + ' ' + _hour + ':' + _minutes + ':' + _seconds;
};

const getDays = (date1, date2) =>{
  //将时间字符串转化为距离1970年1月1日午夜零时的时间间隔的毫秒数  
  var time1 = Date.parse(date1);  
  var time2 = Date.parse(date2);  
  //将两个时间相减，求出相隔的天数  
  var dayCount = (Math.abs(time2 - time1))/1000/60/60/24;  
  return dayCount;
}

/**
 * [发送事件列表]
 * @author luke 2017-12-29
 * @param  {[type]} arr [对象]
 */
const setEvent = (arr, ths) => {
  let obj = {
    module: arr[0],
    category: arr[1],
    tid: arr[2],
    clientDate: arr[3],
    action: arr[4],
    label: arr[5],
    duringTime: arr[6],
    traceDesc: arr[7]
  }
  ths.$socket.emit('eventTrace', obj);
}


export default {
  formatTime,
  isNull,
  delArray,
  formatData,
  setEvent,
  getDays
};
