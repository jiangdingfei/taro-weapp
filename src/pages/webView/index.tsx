import Taro from "@tarojs/taro";
import { WebView, View } from "@tarojs/components";

interface ConState {
  [key: string]: string
}
const salesApp = Taro.getApp();
export default class MyWebView extends Taro.PureComponent<null, ConState> {
  state = {
    url: ""
  };
  count = 0;

  handleError() {
    // alert("error");
  }
  handleLoad() {
    // alert("success");
  }
  handleClick() {
    // alert("click");
  }
  handle() {
    // alert("aa");
  }
  componentDidMount() {
    this.setState({
      url: "http://www.flydream.online/index.html#/detail"
      // url: 'http://127.0.0.1:3001'
    });
  }

  componentDidShow() {
    if (this.count++) {
      console.log('============')
      const value = salesApp.value;
      const { url } = this.state;
      this.setState({
        url: url + `?value=${value}`
      });
    }
  }
  render() {
    const { url } = this.state;
    console.log(this.$router);
    return (
      <View className='my-web-view'>
        <WebView
          className='container'
          src={url}
          onLoad={this.handleLoad}
          onError={this.handleError}
        ></WebView>
      </View>
    );
  }
}
