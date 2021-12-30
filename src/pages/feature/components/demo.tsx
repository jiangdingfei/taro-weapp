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

export default class Demo extends Taro.PureComponent {
  componentDidMount() {
    console.log('componentDidMount111')
  }

  render() {
    const { count } = this.props;
    return (
      <View>
        <View>{count + 1}</View>
        {count > 25 && <Demo2 count={count}></Demo2>}
      </View>
    )
  }
}
