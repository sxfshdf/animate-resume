var result = `/*
  * 面试官你好，我是xxx
  * 我将以动画的形式介绍我自己
  * 只用文字介绍太单调了吧
  * 我就用代码来介绍吧
  * 首先准备一些样式
*/

/* 首先给所有元素加个过渡 */

*{ 
  transition: all 0.3s; 
}

/* 然后加点背景 */

html{ 
  color: #b0adb1; background: #0d1013; 
}

/* 文字和边框加点距离 */

#code{
  border: 1px solid #b0adb1;
  padding: 16px;
  margin: 16px;
  width: 45vw;
  height: 90vh;
}

/* 加点代码高亮 */

.token.selector{ color: #690; }
.token.property{ color: #905; }
.token.punctuation{ color: #999; }

/* 现在正式开始 */
/* 我需要一张白纸 */

.paper{
  position: fixed;
  right: 0;
  top: 0; 
  width: 50vw;
  height: 90vh;
  background: white;
  margin: 16px;
}

/* 好了，可以开始写简历了 */

`
var result2 = `/*
* 接下来用一个库 marked.js
* 把 Markdown 变成 HTML
*/

`

var result3 = `
/* 再给 HTML 加点样式 */

.paper .content h2{
  padding: 8px 0;
  margin: 16px 0;
  border-bottom: 1px solid #e5e5e5;
}
.paper .content ol>li,
.paper .content ul>li{
  margin: 8px 0;
}

`
var md = `
## 自我介绍
我叫 XXX ，
1990 年 1 月出生 ，
XXX 学校毕业 ，
自学前端半年 ，
希望应聘前端开发岗位 。

## 技能介绍
熟悉 JavaScript CSS

## 项目介绍
1. [简单轮播](https://sxfshdf.github.io/slide-demo/index.html)
2. [个人简历](https://sxfshdf.github.io/resume/index.html)
3. [我的画板](https://sxfshdf.github.io/canvas-demo/index.html)

## 联系方式
- QQ: 754872493
- Email: sxf754872493@gmail.com
- 手机: xxx

## 链接
[我的文章](https://www.jianshu.com/u/eda06e53689b)
`


writeCode('',result,()=>{
  createPaper(()=>{
    writeMarkdown(md,()=>{
      writeCode(result,result2,()=>{
        convertMarkdownToHtml(()=>{
          writeCode(result+result2,result3)
        })
      })
    })
  })
})





function writeMarkdown(markdown,fn){
  let domPaper = document.querySelector('#paper > .content')
  let n = 0
  let timer = setInterval(()=>{
    n += 1
    domPaper.innerHTML = markdown.substring(0, n),Prism.languages.markdown
    domPaper.scrollTop = domPaper.scrollHeight
    if( n >= markdown.length){
      window.clearInterval(timer)
      fn && fn.call()
    }
  },50)
}

function createPaper(fn){
  let paper = document.createElement('div')
  paper.className = 'paper'
  paper.id = 'paper'
  let content = document.createElement('pre')
  content.className = 'content'
  wrapper.appendChild(paper)
  paper.appendChild(content)
  fn && fn.call()
}

function writeCode(preCode,code,fn){
  let domCode = document.querySelector('#code')
  let n = 0
  let timer = setInterval(()=>{
    n += 1
    domCode.innerHTML = Prism.highlight(preCode + code.substring(0, n), Prism.languages.css);
    domCode.scrollTop = domCode.scrollHeight
    styleTag.innerHTML = preCode + code.substring(0,n)
    if( n >= code.length){
      window.clearInterval(timer)
      fn && fn.call()
    }
  },50)
}

function convertMarkdownToHtml(fn){
  let div = document.createElement('div')
  div.className = 'content'
  div.innerHTML = marked(md)
  let markdownContainer = document.querySelector('#paper > .content')
  markdownContainer.replaceWith(div)
  fn && fn.call()
}
