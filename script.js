const maskBg = (function () {
  const bg = document.querySelector('.mask_bg');
  const bgSrc = bg.getAttribute('data-src');
  
  bg.style.backgroundImage = `url(${bgSrc})`;
})()

const maskTest = function () {
  let container = '';
  let contents = '';
  let canvas = '';
  let ctx = '';
  let drawSvg = new Image();
  let currentSize = '';
  let percent = 0;
  let maxScale = 1.5;
  let minScale = 0.5;
  let minSvgSize = 0;
  let setSvgSize = 500;
  let svgCenterL = 0;
  let svgCenterT = 0;

  const _init = function () {
    container = document.querySelector('.container');
    contents = document.querySelector('.contents');
    canvas = document.querySelector('.mask_canvas');
    ctx = canvas.getContext("2d");
    
    canvas.width = contents.clientWidth;
    canvas.height = contents.clientHeight;
    drawSvg.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent('<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100" height="100" viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve"><circle cx="50" cy="50" r="42.41"/></svg>');
    minSvgSize = Math.min( setSvgSize * minScale, setSvgSize * (canvas.width / setSvgSize) );
    svgSize = canvas.width * maxScale;

    drawSvg.onload ? _draw(0) : null; 
  }

  const _draw = function (percent) {

    // 값 설정
    scalePercent = 1 - percent;
    currentSize = (svgSize * scalePercent + minSvgSize);
    svgCenterL = ( canvas.width / 2 ) - ( currentSize / 2 ); 
    svgCenterT = ( canvas.height / 2 ) - ( currentSize / 2 );

    console.log(percent, scalePercent, currentSize, svgCenterL, svgCenterT)

    // 0. canvas 리셋
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. canvas 설정
    ctx.globalCompositeOperation = 'xor';
    
    // 2. 배경 그리기
    ctx.beginPath();
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.closePath();
    
    // 3. 이미지 그리기
    ctx.beginPath();
    ctx.drawImage(drawSvg, svgCenterL, svgCenterT, currentSize, currentSize);
    ctx.closePath();
  }

  const _scroll = function () {
    let _scrollTop = scrollY - container.offsetTop;
    let _moveArea = container.clientHeight - window.innerHeight;
    let _percent = Math.min(1, _scrollTop / _moveArea);
    _percent = Math.min(1, Math.max(0, _percent));
    
    _draw(_percent);
  }

  _init();

  window.addEventListener('scroll', _scroll)

  return {
    init : _init,
    draw : _draw,
  }
};

window.addEventListener('load', maskTest);