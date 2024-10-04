const clientsButton = document.querySelector('.main-clients-button');

const clientsBtnText = clientsButton.textContent;
const clientsWidth = clientsButton.clientWidth;
const clientsHeight = clientsButton.clientHeight;
const clientsSvg = Snap(clientsWidth, clientsHeight);
clientsSvg.attr('class', 'main-clients-svg');
const clientsColor1 = '#FFFFFF';
const clientsGradient = 'L(0, 0, 300, 300)#dcbab9-#D2A3A2';
const clientsMaskOffset = clientsButton.clientHeight;

const clientsBorder = clientsSvg
  .rect(0, 0, clientsWidth, clientsHeight)
  .attr({ 'fill': 'none', 'stroke': clientsColor1, 'stroke-width': 4, 'class': 'border' });

const clientsMask = clientsSvg
  .path(`M0,0 L${clientsWidth + clientsMaskOffset},0 L${clientsWidth},${clientsHeight} L-${clientsMaskOffset}, ${clientsHeight} Z`)
  .attr({ 'fill': 'white', 'stroke': 'white', 'class': 'mask', 'stroke-width': 0 })
  .transform(`t-${clientsWidth + clientsMaskOffset},0`);

const clientsMaskInvert = clientsMask
  .clone()
  .transform('t0,0');

const clientsText = clientsSvg
  .text(clientsWidth / 2, clientsHeight / 2, clientsBtnText)
  .attr({ 'text-anchor': 'middle', 'dominant-baseline': 'central', 'fill': clientsColor1 });

const mainClientsButton = clientsSvg
  .group(clientsText, clientsBorder)
  .attr({ mask: clientsMaskInvert });

const clientsTextMasked = clientsText
  .clone()
  .attr({ 'fill': clientsGradient });

const clientsBorderMasked = clientsBorder
  .clone()
  .attr({ 'stroke': clientsGradient });

const clientsMasked = clientsSvg
  .group(clientsTextMasked, clientsBorderMasked)
  .attr({ mask: clientsMask });

clientsSvg.hover(
  () => {
    clientsMask.attr('stroke-width', 4);
    clientsMask.stop().animate({ transform: 't0,0' }, 500, mina.easein);
    clientsMaskInvert.stop().animate({ transform: `t${clientsWidth + clientsMaskOffset},0` }, 500, mina.easein);
  },
  () => {
    clientsMask.stop().animate({ transform: `t-${clientsWidth + clientsMaskOffset},0` }, 350, mina.easeout, () => clientsMask.attr('stroke-width', 0));
    clientsMaskInvert.stop().animate({ transform: 't0,0' }, 350, mina.easeout);
  }
);

clientsSvg.click(() => clientsButton.click());
clientsButton.replaceWith(clientsSvg.node);
