const maskBg = (function () {
  const bg = document.querySelector('.mask_bg');
  const bgSrc = bg.getAttribute('data-src');
  
  bg.style.backgroundImage = `url(${bgSrc})`;
})()

const maskTest = function () {
  let contents = '';
  let canvas = '';
  let ctx = '';
  let drawSvg = new Image();
  let position = {
    x: 0,
    y: 0,
  }
  let _currentSize = '';
  let _percent = 0;
  let maxScale = 0;
  let minScale = 0;
  let minSvgSize = 0;
  let setSvgSize = 500;

  const _init = function () {
    contents = document.querySelector('.contents');
    canvas = document.querySelector('.mask_canvas');
    ctx = canvas.getContext("2d");

    // 값 설정
    canvas.width = contents.clientWidth;
    canvas.height = contents.clientHeight;
    drawSvg.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent('<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100" height="100" viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve"><circle cx="50" cy="50" r="42.41"/></svg>');
    // maxScale = 3;
    // minScale = 1;
    // minSvgSize = Math.min( setSvgSize * minScale, setSvgSize * (canvas.width / setSvgSize) );
    // svgSize = canvas.width * maxScale;
    // scalePercent = 1 - _percent;
    // _currentSize = svgSize * scalePercent + minSvgSize;
    _currentSize = 500; 

    // canvas 설정
    ctx.globalCompositeOperation = 'xor';
    
    // 1. 배경 그리기
    ctx.beginPath();
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.closePath();
    
    // 2. 이미지 그리기
    ctx.beginPath();
    drawSvg.onload = function () {
      ctx.drawImage(drawSvg, 0, 0, _currentSize, _currentSize);
    }
    ctx.closePath();
  }

  const _draw = function (e) {
    position.x = e.clientX;
    position.y = e.clientY;
    
    // canvas 설정
    ctx.globalCompositeOperation = 'xor';
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(drawSvg, position.x, position.y, _currentSize, _currentSize);
  }

  const _scroll = function () {
    
  }

  _init();

  window.addEventListener('mousemove', _draw)

  return {
    init : _init,
    draw : _draw,
  }
};

window.addEventListener('load', maskTest);