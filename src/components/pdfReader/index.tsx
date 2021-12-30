import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import PDFJS from "pdfjs-dist";
import { TextLayerBuilder } from "pdfjs-dist/web/pdf_viewer";
import "pdfjs-dist/web/pdf_viewer.css";

PDFJS.GlobalWorkerOptions.workerSrc = "pdfjs-dist/build/pdf.worker.js";
// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IProps {
  pdfUrl: string
}
// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IState {
  count: number
  string?: string
}
export default class PdfReader extends Taro.PureComponent<IProps,IState> {
  defaultProps = {
    pdfUrl: ""
  };
  public readonly state: Readonly<IState> = {
    count: 1
  }


  componentWillReceiveProps() {
    this.getPDF()
  }

  container: HTMLElement | null

  getPDF() {
    const { pdfUrl } = this.props;
    PDFJS.getDocument(pdfUrl)
      .then(pdf => {
        // 获取容器
        this.container = document.getElementById("pdf-container");
        // 获取pdf的总页数
        const num: number = pdf.numPages;
        // 执行核心解析和渲染代码
        this.renderPDF(pdf, num);
      })
      .catch(err => {
        console.log(err);
      });
  }
  renderPDF = (pdf, num) => {
    for (let i = 1; i<= num; i++) {
      let pageDiv
      pdf.getPage(i).then((page) => {
       // 设置PDF尺寸，如果渲染出来的模糊的话这个稍微可以调大点，但是要给容器的canvas设置个样式，本人亲测过,如下样式设置
        const viewport = page.getViewport(2)
        pageDiv = document.createElement('div')
        pageDiv.setAttribute('id', 'page-' + (page.pageIndex + 1))
        pageDiv.setAttribute('style', 'position: relative')
        this.container && this.container.appendChild(pageDiv)
        const canvas = document.createElement('canvas')
        pageDiv.appendChild(canvas)
        const context = canvas.getContext('2d')
        canvas.width = viewport.width
        canvas.height = viewport.height

        const renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        page.render(renderContext).then(() => {
          // 返回PDF页面上的文本片段，为了实现文本复制
          return page.getTextContent()
        }).then((textContent) => {
          // 创建文本图层div
          const textLayerDiv = document.createElement('div')
          textLayerDiv.setAttribute('class', 'textLayer')
          // 将文本图层div添加至每页pdf的div中
          pageDiv.appendChild(textLayerDiv)

          // 创建新的TextLayerBuilder实例
          const textLayer = new TextLayerBuilder({
              textLayerDiv: textLayerDiv,
              pageIndex: page.pageIndex,
              viewport: viewport
          })
          textLayer.setTextContent(textContent)
          textLayer.render()
        })
      })
    }
  }

  render() {
    return (
      <View className='file-preview'>
        <View id='pdf-container'></View>
      </View>
    );
  }
}
