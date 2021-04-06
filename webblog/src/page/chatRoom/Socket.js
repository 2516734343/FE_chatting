class Socket {
  constructor(url, key) {
    this.url = url + key;
    this.socket = '';
    // this.init();
  }
  init() {
    //判断当前浏览器支持不支持WebSocket
    if ('WebSocket' in window) {
      this.socket = new WebSocket(this.url);
    } else {
      // alertTip("该浏览器不支持WebSocket，请切换浏览器或升级后再试");
      return;
    }
    this.onopen();
    // this.onclose();
  }
  onopen() {
    this.socket.onopen = () => {
      // alert(1)
      console.log('链接成功！')
    }
  }
  onclose() {
    this.socket.onclose = () => {
      // alert(2)
      console.log('链接断开！')
    }
  }
  onmessage(callback) {
    this.socket.onmessage = (option) => {
      let data = option.data;
      if (data == '连接成功') {
        return;
      }
      // console.log(data, 'data')
      // data = eval("(" + data + ")");
      // data = JSON.parse(data);
      callback(data);
    }
  }
  send(option) {
    this.socket.send(option);
  }
  close() {
    this.socket.close();
  }
}
export default Socket;
