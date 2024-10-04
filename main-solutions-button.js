const solutionsButton = document.querySelector('.main-solutions-button');

const solutionsBtnText = solutionsButton.textContent;
const solutionsWidth = solutionsButton.clientWidth;
const solutionsHeight = solutionsButton.clientHeight;
const solutionsSvg = Snap(solutionsWidth, solutionsHeight);
solutionsSvg.attr('class', 'main-solutions-svg');
const solutionsColor1 = '#FFFFFF';
const solutionsGradient = 'L(0, 0, 300, 300)#dcbab9-#D2A3A2';
const solutionsMaskOffset = solutionsButton.clientHeight;

const solutionsBorder = solutionsSvg
  .rect(0, 0, solutionsWidth, solutionsHeight)
  .attr({ 'fill': 'none', 'stroke': solutionsColor1, 'stroke-width': 4, 'class': 'border' });

const solutionsMask = solutionsSvg
  .path(`M0,0 L${solutionsWidth + solutionsMaskOffset},0 L${solutionsWidth},${solutionsHeight} L-${solutionsMaskOffset}, ${solutionsHeight} Z`)
  .attr({ 'fill': 'white', 'stroke': 'white', 'class': 'mask', 'stroke-width': 0 })
  .transform(`t-${solutionsWidth + solutionsMaskOffset},0`);

const solutionsMaskInvert = solutionsMask
  .clone()
  .transform('t0,0');

const solutionsText = solutionsSvg
  .text(solutionsWidth / 2, solutionsHeight / 2, solutionsBtnText)
  .attr({ 'text-anchor': 'middle', 'dominant-baseline': 'central', 'fill': solutionsColor1 });

const mainSolutionsButton = solutionsSvg
  .group(solutionsText, solutionsBorder)
  .attr({ mask: solutionsMaskInvert });

const solutionsTextMasked = solutionsText
  .clone()
  .attr({ 'fill': solutionsGradient });

const solutionsBorderMasked = solutionsBorder
  .clone()
  .attr({ 'stroke': solutionsGradient });

const solutionsMasked = solutionsSvg
  .group(solutionsTextMasked, solutionsBorderMasked)
  .attr({ mask: solutionsMask });

solutionsSvg.hover(
  () => {
    solutionsMask.attr('stroke-width', 4);
    solutionsMask.stop().animate({ transform: 't0,0' }, 500, mina.easein);
    solutionsMaskInvert.stop().animate({ transform: `t${solutionsWidth + solutionsMaskOffset},0` }, 500, mina.easein);
  },
  () => {
    solutionsMask.stop().animate({ transform: `t-${solutionsWidth + solutionsMaskOffset},0` }, 350, mina.easeout, () => solutionsMask.attr('stroke-width', 0));
    solutionsMaskInvert.stop().animate({ transform: 't0,0' }, 350, mina.easeout);
  }
);

solutionsSvg.click(() => solutionsButton.click());
solutionsButton.replaceWith(solutionsSvg.node);
