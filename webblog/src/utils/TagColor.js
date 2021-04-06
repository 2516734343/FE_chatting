
export const getColors = () => {

  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);
  return "rgb(" + r + ',' + g + ',' + b + ")";
  // return '#' +
  //   (function (color) {
  //     return (color += '0123401234abcabc'[Math.floor(Math.random() * 16)]) &&
  //       (color.length == 6) ? color : arguments.callee(color);
  //   })('');
}


export const getTagColors = () => {
  const tagColor = ['success', 'gold', 'cyan', 'processing', 'green', 'orange', 'error', 'warning', 'magenta', 'blue', 'red', 'volcano', 'lime', 'geekblue', 'purple'];
  const idx = Math.floor(Math.random() * 15, 10);
  return tagColor[idx];
};


export const getFontsize = () => {
  const size = parseInt((Math.random() * 7) + 12, 10);
  return size + 'px';
}