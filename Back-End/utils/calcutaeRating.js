function calcutaeRating(arr) {
  let compare = ["1", "2", "3", "4", "5"];
  let reslut = [];
  let leftHandSide = 0;
  let rightHandSide = 0;
  for (i = 0; i < compare.length; i++) {
    let count = 0;

    for (j = 0; j < arr.length; j++) {
      if (compare[i] == arr[j]) {
        count++;
      }
    }
    reslut.push([compare[i], count]);
  }

  reslut = Object.assign({}, reslut);
  reslut = Object.entries(reslut).map((el) => {
    return { rateing: el[1][0], count: el[1][1] };
  });

  for (i = 0; i < reslut.length; i++) {
    leftHandSide += reslut[i].count * reslut[i].rateing;
    rightHandSide += reslut[i].count;
  }

  return Math.round(((leftHandSide / rightHandSide) * 100).toFixed(1)) / 100;
}

module.exports = { calcutaeRating };
