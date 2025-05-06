



const createBulkInsertTemplate = (arr,columnCount) => {
  // this one is for bulk insertion for sql query ouput is like [($1, $2, $3) ($4, $5, $6)]
  const array = arr.map((_, idx) => {
    let elemStr = '(';
    for(let j = 0; j <columnCount; j++){
      if (j === columnCount - 1) {
        elemStr += `$${ idx * columnCount + j + 1}`;
      }else{
        elemStr += `$${ idx * columnCount + j + 1}, `;
      }
    }
    elemStr += ')';
    return elemStr;
  });

  return array.join(',');
};

module.exports = {
  createBulkInsertTemplate
};
