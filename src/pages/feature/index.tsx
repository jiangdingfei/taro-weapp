import Taro, { PureComponent } from "@tarojs/taro";
import { View } from "@tarojs/components";
import Benefit from './components/benefit'

export default class Feature extends PureComponent {
  render() {
    return (
      <View>
        <Benefit></Benefit>
      </View>
    );
  }
}
