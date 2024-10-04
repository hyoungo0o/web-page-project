//class ChangingTitle {
//  constructor(x = null) {
//    this.node = x;
//    this.letterfy(this.node.querySelector('h1'));
//  }
//
//  letterfy(node) {
//    let text = node.innerText;
//    node.innerText = '';
//    node.classList.add('current');
//    for (let c of text) {
//      let span = document.createElement('span');
//      span.innerText = c;
//      span.classList.add('letter', 'in');
//      span.style.animationDelay = `${text.indexOf(c) * 0.1}s`; // 0.5초 지연
//      node.appendChild(span);
//    }
//  }
//
//  changeText(newText) {
//    let oldTitle = this.node.querySelector('.current');
//    if (oldTitle) {
//      let i = 0;
//      for (let letter of oldTitle.children) {
//        letter.style.animationDelay = `${i++ * 0.1}s`;
//        letter.classList.remove('in');
//        letter.classList.add('out');
//      }
//      oldTitle.classList.remove('current');
//      let newTitle = document.createElement('h1');
//      newTitle.classList.add('current');
//      for (let c of newText) {
//        let span = document.createElement('span');
//        span.innerText = c;
//        span.classList.add('letter', 'in');
//        span.style.animationDelay = `${newText.indexOf(c) * 0.1}s`; // 0.5초 지연
//        newTitle.appendChild(span);
//      }
//      this.node.appendChild(newTitle);
//      setTimeout(() => this.removeNode(oldTitle), 500);
//    }
//  }
//
//  removeNode(x) {
//    x.remove();
//  }
//}
//
//
