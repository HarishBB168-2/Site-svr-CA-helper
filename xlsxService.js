const XLSX = require("xlsx");
const jslinq = require("jslinq");

module.exports.search = function (fileName, checkerFunc) {
  const workBook = XLSX.readFile(fileName);
  const sheetNameList = workBook.SheetNames;
  const jsonData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNameList[0]], {
    defval: "",
  });
  const queryData = jslinq(jsonData);
  const result = queryData
    .where(function (item) {
      return checkerFunc(item);
    })
    .toList();
  return result;
};
