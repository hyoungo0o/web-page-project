document.addEventListener('DOMContentLoaded', function() {
  const element = document.querySelector('.xdmp-container');
  const originalHTML = element.innerHTML;

  // 단어, 아이콘 및 <br> 태그별로 감싸는 함수
  function wrapElements(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      const wrappedHTML = text
        .split(/(\s+)/) // 공백을 기준으로 분리
        .map(part => {
          if (part.trim().length > 0) {
            return `<div class="word-wrapper"><div class="word">${part}</div></div>`;
          } else {
            return `<span class="space">${part}</span>`;
          }
        })
        .join('');

      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = wrappedHTML;
      while (tempDiv.firstChild) {
        node.parentNode.insertBefore(tempDiv.firstChild, node);
      }
      node.parentNode.removeChild(node);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.tagName === 'I' && node.classList.contains('fas')) {
        // 폰트어썸 아이콘을 감싸는 경우
        const iconWrapper = document.createElement('div');
        iconWrapper.classList.add('icon-wrapper');
        iconWrapper.appendChild(node.cloneNode(true));
        node.parentNode.insertBefore(iconWrapper, node);
        node.parentNode.removeChild(node);
      } else if (node.tagName === 'BR') {
        // <br> 태그를 감싸는 경우
        const brWrapper = document.createElement('div');
        brWrapper.classList.add('br-wrapper');
        node.parentNode.insertBefore(brWrapper, node);
        node.parentNode.removeChild(node);
      } else {
        Array.from(node.childNodes).forEach(child => wrapElements(child));
      }
    }
  }

  const div = document.createElement('div');
  div.innerHTML = originalHTML;
  Array.from(div.childNodes).forEach(child => wrapElements(child));
  element.innerHTML = '';
  element.appendChild(div);

  // GSAP 애니메이션
  const tl = gsap.timeline({
    delay: 0.4,
    repeatDelay: 0.4,
    repeat: -1,
    paused: true
  });

  tl.addLabel('enter');

  tl.staggerFromTo(
    '.word, .icon-wrapper',
    0.5,
    { yPercent: 100 },
    { yPercent: 0, ease: 'Circ.easeOut' },
    0.2,
    'enter'
  );

  tl.staggerFromTo(
    '.word, .icon-wrapper',
    0.5,
    { opacity: 0 },
    { opacity: 1, ease: 'Power1.easeOut' },
    0.2,
    'enter'
  );

  tl.addPause();

  tl.addLabel('exit');

  tl.staggerTo(
    '.word, .icon-wrapper',
    0.3,
    { yPercent: -200, ease: 'Circ.easeIn' },
    0.1,
    'exit'
  );

  tl.staggerTo(
    '.word, .icon-wrapper',
    0.3,
    { opacity: 0, ease: 'Power1.easeIn' },
    0.1,
    'exit'
  );

  element.addEventListener('click', function() {
    console.log('click!');
    tl.play(); // 또는 tl.reverse()
  });

    // 리플레이 아이콘 클릭 이벤트 추가
    const replayIcon = document.querySelector('.replay-button');
    replayIcon.addEventListener('click', function() {
      tl.restart(); // 애니메이션 리플레이
    });

  tl.play();
});
