// 吧code写到 #code 和 styleTag 里面
function writeCode(preFix,code,fn){
  let domCode = document.querySelector('#code')
  let n=0
  let timer = setInterval(()=>{
    n += 1
    domCode.innerHTML = Prism.highlight(preFix + code.slice(0,n), Prism.languages.css)
    styleTag.innerHTML = preFix + code.slice(0,n)
    domCode.scrollTop = domCode.scrollHeight
    if(n >= code.length){
      window.clearInterval(timer)
      fn.call()
    }
  },10)
}

var result = `/*
  * 面试官你好，我是xxx
  * 我将以动画的形式介绍我自己
  * 只用文字介绍太单调了吧
  * 我就用代码来介绍吧
  * 首先准备一些样式
  */
  
*{
  transition: all 1s;
}
html{
  background: #eee;
  font-size: 16px;
}
#code{
  border: 1px solid red;
  padding: 16px;
}

/* 我需要一点代码高亮 */

.token.selector{
  color: #690;
}
.token.property{
  color: #905;
}
.token.punctuation {
  color: #999;
}

/* 我来介绍一下我自己吧 */
/* 我需要一张白纸 */

#code{
  position: fixed;
  left: 0;
  width: 50%;
  height: 100%;
}
#paper{
  position: fixed;
  right: 0;
  width: 50%;
  height: 100%;
  background: white;
}

`
var result2 = `
#paper{
}
  `

writeCode('', result, ()=>{
  createPaper(()=>{
    writeCode(result, result2)
  })
})

function createPaper(fn){
  var paper = document.createElement('div')
  paper.id = 'paper'
  document.body.appendChild(paper)
  fn.call()
}

function fn3(preResult){
  
  var n = 0
  var timer = setInterval(()=>{
    n += 1
    code.innerHTML = preResult + result.slice(0,n)
    code.innerHTML = Prism.highlight(preResult + result.slice(0,n), Prism.languages.css);
    styleTag.innerHTML = preResult + result.slice(0,n)
    if(n >= result.length){
      window.clearInterval(timer)
    }
  },10)
}