import Taro, { PureComponent, hideToast } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import minus01 from './static/minus01.png';
import plus01 from './static/plus01.png';
import rateBtn from './static/rate_btn.png';
import './index.scss'

export default class MySlider extends PureComponent {
  // dragBlock: Taro.RefObject<unknown>;
  // dragContainer: Taro.RefObject<unknown>;
  constructor(props) {
    super(props)
    // this.dragBlock = Taro.createRef();
    // this.dragContainer = Taro.createRef()
  }
  state = {
    dragLeft: 0
  }
  refDragBlock = node => this.dragBlock = node
  refDragContainer = node => this.dragContainer = node

  handleTouchStart = async e => {
    await this.getDragInfo()
    this.spacingLeft = e.touches[0].pageX - this.blockX
  }
  handleTouchMove = e => {
    const { onChange } = this.props
    const pageX = e.touches[0].pageX
    let left
    const min = this.spacingLeft + this.contX
    const max = this.contX + this.moveMaxLength + this.spacingLeft
    if (pageX < min) {
      left = 0
    } else if (min<= pageX && pageX <= max) {
      left = pageX - min
    } else if (pageX > max){
      left = this.moveMaxLength
    }
    this.setState({
      dragLeft: left
    })
    onChange && onChange(left)
  }
  handleTouchEnd = e => {
    console.log(e)
  }
  async getDragInfo() {
    const { left: blockX, width: blockW } = await this.getDomInfo(this.dragBlock)
    const { left: contX, width: contW } = await this.getDomInfo(this.dragContainer)
    this.moveMaxLength = contW - blockW
    this.blockX = blockX
    this.blockW = blockW
    this.contX = contX
  }
  getDomInfo(ref) {
    return new Promise((resolve, reject) => {
      if (process.env.TARO_ENV === 'weapp') {
        try {
          ref.boundingClientRect(rect => {
            console.log(rect)
            resolve(rect)
          }).exec()
        } catch (error) {
          reject(error)
        }
      } else if (process.env.TARO_ENV === 'h5') {
        resolve(ref.vnode.dom.getBoundingClientRect())
      }
    })
  }
  handleMinus = () => {

  }
  handlePlus = () => {

  }
  componentWillReceiveProps = nextProps => {

  }
  render() {
    return (
      <View className='my-slider'>
        <View className='count-btn'>
          <Image className='img' src={minus01} onClick={this.handleMinus}></Image>
        </View>
        <View className='content' ref={this.refDragContainer}>
          <View id='drag-container' className='line'></View>
          <View
            id='drag-block'
            className='drag-block'
            onTouchStart={this.handleTouchStart}
            onTouchMove={this.handleTouchMove}
            onTouchEnd={this.handleTouchEnd}
            ref={this.refDragBlock}
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
