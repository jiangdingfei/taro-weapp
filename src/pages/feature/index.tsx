import Taro, { PureComponent } from '@tarojs/taro';
import { View } from '@tarojs/components';
import MySlider from '../../components/mySlider'

export default class Feature extends PureComponent {
  render() {
    return (
      <View>
        <MySlider></MySlider>
      </View>
    )
  }
}
