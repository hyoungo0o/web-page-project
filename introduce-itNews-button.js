const newsButton = document.querySelector('.introduce-news-button');
const newsBtnText = newsButton.textContent;
const newsWidth = newsButton.clientWidth;
const newsHeight = newsButton.clientHeight;
const newsSvg = Snap(newsWidth, newsHeight);
newsSvg.attr('class', 'introduce-news-svg');
const newsColor1 = '#ffffff';
const newsGradient = 'L(0, 0, 300, 300)#ff0000-#cc0000';
const newsMaskOffset = newsButton.clientHeight;

const newsBorder = newsSvg
  .rect(0, 0, newsWidth, newsHeight)
  .attr({ 'fill': 'none', 'stroke': newsColor1, 'stroke-width': 4, 'class': 'border' });

const newsMask = newsSvg
  .path(`M0,0 L${newsWidth + newsMaskOffset},0 L${newsWidth},${newsHeight} L-${newsMaskOffset}, ${newsHeight} Z`)
  .attr({ 'fill': 'white', 'stroke': 'white', 'class': 'mask', 'stroke-width': 0 })
  .transform(`t-${newsWidth + newsMaskOffset},0`);

const newsMaskInvert = newsMask
  .clone()
  .transform('t0,0');

const newsText = newsSvg
  .text(newsWidth / 2, newsHeight / 2, newsBtnText)
  .attr({ 'text-anchor': 'middle', 'dominant-baseline': 'central', 'fill': newsColor1 });

const introduceNewsButton = newsSvg
  .group(newsText, newsBorder)
  .attr({ mask: newsMaskInvert });

const newsTextMasked = newsText
  .clone()
  .attr({ 'fill': newsGradient });

const newsBorderMasked = newsBorder
  .clone()
  .attr({ 'stroke': newsGradient });

const newsMasked = newsSvg
  .group(newsTextMasked, newsBorderMasked)
  .attr({ mask: newsMask });

newsSvg.hover(
  () => {
    newsMask.attr('stroke-width', 4);
    newsMask.stop().animate({ transform: 't0,0' }, 500, mina.easein);
    newsMaskInvert.stop().animate({ transform: `t${newsWidth + newsMaskOffset},0` }, 500, mina.easein);

    // 테두리 빨간색 그라데이션으로 변경
    newsBorderMasked.attr({ 'stroke': newsGradient });
  },
  () => {
    newsMask.stop().animate({ transform: `t-${newsWidth + newsMaskOffset},0` }, 350, mina.easeout, () => newsMask.attr('stroke-width', 0));
    newsMaskInvert.stop().animate({ transform: 't0,0' }, 350, mina.easeout);

    // 호버 해제 시 테두리 색상 원래대로
    newsBorderMasked.attr({ 'stroke': newsColor1 });
  }
);

newsSvg.click(() => newsButton.click());
newsButton.replaceWith(newsSvg.node);
