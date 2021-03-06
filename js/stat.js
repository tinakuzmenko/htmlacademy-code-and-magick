'use strict';
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var CONTENT_GAP = 20;
var CONTENT_X = CLOUD_X + CONTENT_GAP;
var CONTENT_Y = CLOUD_Y + CONTENT_GAP;
var TEXT_WIDTH = 50;
var BAR_WIDTH = 40;
var BAR_MAX_HEIGHT = 150;

var renderRectangle = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var createFontStyle = function (ctx, font, baseline, style) {
  ctx.font = font;
  ctx.textBaseline = baseline;
  ctx.fillStyle = style;
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var getRandomInt = function (max) {
  return Math.floor(Math.random() * Math.floor(max));
};

var getRandomColorSaturation = function (hue, lightness) {
  var saturation = getRandomInt(100);
  var randomSaturation = 'hsl(' + hue + ', ' + saturation + '%, ' + lightness + '%)';
  return randomSaturation;
};

window.renderStatistics = function (ctx, names, times) {
  renderRectangle(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderRectangle(ctx, CLOUD_X, CLOUD_Y, '#fff');
  createFontStyle(ctx, '16px PT Mono', 'hanging', '#000');
  ctx.fillText('Ура вы победили!', CONTENT_X, CONTENT_Y);
  ctx.fillText('Список результатов:', CONTENT_X, CONTENT_Y + CONTENT_GAP);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var currentX = CONTENT_X + (BAR_WIDTH + TEXT_WIDTH) * i;
    var currenBarHeight = (BAR_MAX_HEIGHT * times[i]) / maxTime;
    var currentY = CLOUD_HEIGHT - CONTENT_GAP - GAP - currenBarHeight;
    var currentTime = Math.floor(times[i]);

    createFontStyle(ctx, '16px PT Mono', 'hanging', '#000');
    ctx.fillText(names[i], currentX, CLOUD_HEIGHT - CONTENT_GAP);
    ctx.fillText(currentTime, currentX, currentY - CONTENT_GAP);

    ctx.fillStyle = names[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : getRandomColorSaturation(240, 50);
    ctx.fillRect(currentX, currentY, BAR_WIDTH, currenBarHeight);
  }
};
