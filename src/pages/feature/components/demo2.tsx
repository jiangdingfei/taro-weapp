import Taro, { useEffect } from '@tarojs/taro';
import { View } from '@tarojs/components';
import Demo2 from './demo2';
// const Demo = (props) => {
//   const {  count } = props
//   useEffect(() => {
//     console.log('componentDidMount')
//   }, [])
//   return (
//     <View>{count }</View>
//   )
// }
// export default Demo;

export default class Demo2 extends Taro.PureComponent {
  componentDidMount() {
    console.log('componentDidMount151')
  }

  render() {
    const { count } = this.props;
    return (
        <View>{count + 2}</View>
    )
  }
}
