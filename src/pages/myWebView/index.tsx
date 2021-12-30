import Taro from "@tarojs/taro";
import { WebView, View, Button } from "@tarojs/components";
import "./index.scss";

interface ConProps {
  url: string
}
interface ConState {
  [key: string]: string
}
export default class MyWebView extends Taro.PureComponent<ConProps, ConState> {
  defaultProps = {
    url: ""
  };
  handleError() {
    alert("error");
  }
  handleLoad() {
    alert('success')
  }
  handleClick() {
    alert('click')
  }
  handle() {
    alert('aa')
  }
  render() {
    const { url } = this.props;
    console.log(this.$router);
    return (
      <View className='my-web-view'>
        <WebView
          className='container'
          src='https://dmzstg1.pa18.com/elifesales/api/sales/plan/pdfTerm?planCode=3118&attachmentType=1&sourceCode=PA18_SHOP_LIFE&versionNo=3118-1'
          onLoad={this.handleLoad}
          onError={this.handleError}
        ></WebView>
        <Button onClick={this.handle} className='close'></Button>
      </View>
    );
  }
}
