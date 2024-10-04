class ChangingTitle2 {
  constructor(x = null) {
    this.node = x;
    this.letterfy(this.node.querySelector('h1'));
    this.isAnimating = true; // Flag to indicate if animation is still active
    this.finalText = '👋'; // Define the final text
  }

  letterfy(node) {
    let text = node.innerText;
    node.innerText = '';
    node.classList.add('current');
    for (let i = 0; i < text.length; i++) {
      let span = document.createElement('span');
      span.innerText = text[i];
      span.classList.add('letter2', 'in');
      span.style.animationDelay = `${i * 0.1}s`;
      node.appendChild(span);
    }
  }

  changeText(newText) {
    if (!this.isAnimating) return; // If animation is not active, do nothing

    let oldTitle = this.node.querySelector('.current');
    if (oldTitle) {
      let i = 0;
      for (let letter2 of oldTitle.children) {
        letter2.style.animationDelay = `${i++ * 0.1}s`;
        letter2.classList.remove('in');
        letter2.classList.add('out');
      }
      oldTitle.classList.remove('current');

      let newTitle = document.createElement('h1');
      newTitle.classList.add('current');
      for (let i = 0; i < newText.length; i++) {
        let span = document.createElement('span');
        span.innerText = newText[i];
        span.classList.add('letter2', 'in');
        span.style.animationDelay = `${i * 0.1 + 0.5}s`;
        newTitle.appendChild(span);
      }

      this.node.appendChild(newTitle);
      setTimeout(() => {
        oldTitle.remove();
        // If the newText is the final text, stop further animations
        if (newText === this.finalText) {
          this.isAnimating = false;
        }
      }, 2000);
    }
  }
}

// Usage example
let ct = new ChangingTitle2(document.querySelector('.changing-title2'));
const texts = ['Driving', ' Digital', ' Innovation 👋', '　'];
let count = 0;
let intervalId = setInterval(() => {
  ct.changeText(texts[++count % texts.length]);
  // 애니메이션이 공백일 때 종료
  if (texts[count % texts.length] === '　') {
    clearInterval(intervalId);
  }
}, 2000);
