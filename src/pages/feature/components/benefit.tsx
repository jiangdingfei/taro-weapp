import Taro, { PureComponent } from "@tarojs/taro";
import { View } from "@tarojs/components";
import MySlider from "../../../components/mySlider";

export default class Benefit extends PureComponent {
  state = {
    max: 70,
    min: 0,
    value: 25
  };
  onChange = (value) => {
    this.setState({
      value
    })
  }
  componentDidMount() {
    console.log(111)
  }
  render() {
    const { max, min, value } = this.state;
    return (
      <View>
        <View>滑块的值: {value}</View>
        <MySlider max={max} min={min} value={value} onChange={this.onChange}></MySlider>
      </View>
    );
  }
}
