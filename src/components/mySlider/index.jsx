import Taro, { PureComponent, hideToast } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { getDomInfo } from '../../utils'
import minus01 from './static/minus01.png';
import plus01 from './static/plus01.png';
import rateBtn from './static/rate_btn.png';
import './index.scss'

export default class MySlider extends PureComponent {
  state = {
    dragLeft: 0,
    _value: this.props.value,
    isTouch: false
  }
  refDragBlock = node => this.dragBlock = node
  refDragContainer = node => this.dragContainer = node

  handleTouchStart = async e => {
    const { isTouch } = this.state
    // 是否是第一次触摸滑块
    if (!isTouch) {
      this.setState({
        isTouch: true
      })
    }
    await this.getDragInfo()
    this.spacingLeft = e.touches[0].pageX - this.blockX
  }
  handleTouchMove = e => {
    console.log(e, 'touchMove')
    const { onChange, max, min } = this.props
    const pageX = e.touches[0].pageX
    let left
    const Min = this.spacingLeft + this.contX // 滑块移动的最小距离
    const Max = this.contX + this.moveMaxLength + this.spacingLeft // 滑块移动的最大距离
    if (pageX < Min) {
      left = 0
    } else if (pageX > Max){
      left = this.moveMaxLength
    } else {
      left = pageX - Min
    }
    const _value = parseInt(left/(this.moveMaxLength/(max-min)))
    this.setState({
      dragLeft: left,
      _value: _value
    })
    console.log(_value,'_value')
    onChange && onChange(_value)
  }
  handleTouchEnd = e => {
    console.log(e)
  }
  async getDragInfo() {
    const rects = await getDomInfo(['#drag-block', '#drag-container'],this)
    const { left: blockX, width: blockW } = rects[0] // 滑块的信息
    const { left: contX, width: contW } = rects[1] // 父盒子的信息
    this.moveMaxLength = contW - blockW
    this.blockX = blockX
    this.blockW = blockW
    this.contX = contX
  }
  handleMinus = async () => {
    await this.getDragInfo()
  }
  handlePlus = () => {

  }
  componentWillReceiveProps = nextProps => {
    if (this.props.value = nextProps.value) return
  }
  async componentDidMount() {
    console.log(222)
    const { value, max, min } = this.props
    await this.getDragInfo()
    this.setState({
      dragLeft: this.moveMaxLength/(max-min) * value
    })
  }
  render() {
    // const { value } = this.props
    return (
      <View className='my-slider'>
        <View className='count-btn'>
          <Image className='img' src={minus01} onClick={this.handleMinus}></Image>
        </View>
        <View className='content' id='drag-container'>
          <View className='line'></View>
          <View
            id='drag-block'
            className='drag-block'
            onTouchStart={this.handleTouchStart}
            onTouchMove={this.handleTouchMove}
            onTouchEnd={this.handleTouchEnd}
            style={`left: ${this.state.dragLeft}px`}
          >
            <Image className='img' src={rateBtn}></Image>
          </View>
        </View>
        <View className='count-btn'>
          <Image className='img' src={plus01} onClick={this.handlePlus}></Image>
        </View>
      </View>
    )
  }
}
