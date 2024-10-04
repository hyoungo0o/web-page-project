const historyButton = document.querySelector('.main-history-button');
const historyBtnText = historyButton.textContent;
const historyWidth = historyButton.clientWidth;
const historyHeight = historyButton.clientHeight;
const historySvg = Snap(historyWidth, historyHeight);
historySvg.attr('class', 'main-history-svg');
const historyColor1 = '#000000';
const historyGradient = 'L(0, 0, 300, 300)#dcbab9-#D2A3A2';
const historyMaskOffset = historyButton.clientHeight;

const historyBorder = historySvg
  .rect(0, 0, historyWidth, historyHeight)
  .attr({ 'fill': 'none', 'stroke': historyColor1, 'stroke-width': 4, 'class': 'border' });

const historyMask = historySvg
  .path(`M0,0 L${historyWidth + historyMaskOffset},0 L${historyWidth},${historyHeight} L-${historyMaskOffset}, ${historyHeight} Z`)
  .attr({ 'fill': 'white', 'stroke': 'white', 'class': 'mask', 'stroke-width': 0 })
  .transform(`t-${historyWidth + historyMaskOffset},0`);

const historyMaskInvert = historyMask
  .clone()
  .transform('t0,0');

const historyText = historySvg
  .text(historyWidth / 2, historyHeight / 2, historyBtnText)
  .attr({ 'text-anchor': 'middle', 'dominant-baseline': 'central', 'fill': historyColor1 });

const mainHistoryButton = historySvg
  .group(historyText, historyBorder)
  .attr({ mask: historyMaskInvert });

const historyTextMasked = historyText
  .clone()
  .attr({ 'fill': historyGradient });

const historyBorderMasked = historyBorder
  .clone()
  .attr({ 'stroke': historyGradient });

const historyMasked = historySvg
  .group(historyTextMasked, historyBorderMasked)
  .attr({ mask: historyMask });

historySvg.hover(
  () => {
    historyMask.attr('stroke-width', 4);
    historyMask.stop().animate({ transform: 't0,0' }, 500, mina.easein);
    historyMaskInvert.stop().animate({ transform: `t${historyWidth + historyMaskOffset},0` }, 500, mina.easein);
  },
  () => {
    historyMask.stop().animate({ transform: `t-${historyWidth + historyMaskOffset},0` }, 350, mina.easeout, () => historyMask.attr('stroke-width', 0));
    historyMaskInvert.stop().animate({ transform: 't0,0' }, 350, mina.easeout);
  }
);

historySvg.click(() => historyButton.click());
historyButton.replaceWith(historySvg.node);
