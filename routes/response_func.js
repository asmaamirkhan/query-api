module.exports = {
  success_func: function(status, data, desc) {
    let res = {
      status: status,
      data: data,
      desc: desc
    };
    return res;
  },
  failure_func: function(status, data, desc) {
    let res = {
      status: status,
      data: data,
      desc: desc
    };
    return res;
  }
};
