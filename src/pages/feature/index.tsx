import Taro, { PureComponent } from "@tarojs/taro";
import { View, Button } from "@tarojs/components";
// import Demo from './components/demo';
// import MySlider from "../../components/mySlider";
const salesApp = Taro.getApp();
export default class Feature extends PureComponent {
  state = {
    value: 25,
  };
  onChange = (value) => {
    this.setState({
      value
    })
  }
  componentDidMount() {
    // console.log(navigator.userAgent, 'userAgent')
    // alert(navigator.userAgent)

  }
  handleClick() {
    const { value } = this.state
    this.setState({
      value: value + 1
    })
  }
  handleBack() {
    salesApp.value = this.state.value
    Taro.navigateBack({
      delta: 1
    })
  }
  render() {
    const {  value } = this.state;
    return (
      <View>
        <View>滑块的值: {value}</View>
        {/* <Demo count={value}></Demo> */}
        <Button onClick={this.handleClick}>点我</Button>
        <Button onClick={this.handleBack}>返回h5页面</Button>
      </View>
    );
  }
}
