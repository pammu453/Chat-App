const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

const convertExcelToJson = (filePath) => {
  try {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const json = xlsx.utils.sheet_to_json(sheet);
    return json;
  } catch (error) {
    console.error(`Error converting file ${filePath}:`, error);
    return null;
  }
};

const profitAndLossFilePath = path.join(__dirname, '../uploads/Demo Company _Global_ - Profit and Loss 13 May 2024.xlsx');
const balanceSheetFilePath = path.join(__dirname, '../uploads/Demo Company _Global_ - Balance Sheet 30 Apr 2024.xlsx');

const profitAndLossJson = convertExcelToJson(profitAndLossFilePath);
if (profitAndLossJson) {
  fs.writeFileSync(path.join(__dirname, '../uploads/profitAndLoss.json'), JSON.stringify(profitAndLossJson, null, 2));
  console.log('Converted Profit and Loss file to JSON successfully.');
}

const balanceSheetJson = convertExcelToJson(balanceSheetFilePath);
if (balanceSheetJson) {
  fs.writeFileSync(path.join(__dirname, '../uploads/balanceSheet.json'), JSON.stringify(balanceSheetJson, null, 2));
  console.log('Converted Balance Sheet file to JSON successfully.');
}
