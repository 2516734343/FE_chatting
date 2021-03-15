
export const getColors = () => {

  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);
  return "rgb(" + r + ',' + g + ',' + b + ")";
}


export const getTagColors = () => {
  const tagColor = ['success', 'gold', 'cyan', 'processing', 'green', 'orange', 'error', 'warning', 'magenta', 'blue', 'red', 'volcano', 'lime', 'geekblue', 'purple'];
  const idx = Math.floor(Math.random() * 15, 10);
  return tagColor[idx];
};
