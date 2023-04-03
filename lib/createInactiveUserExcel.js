const fs = require("fs");
const ExcelJS = require("exceljs");

const createInactiveUserExcel = async (
  inactiveUserData,
  activeUserOffset = 10
) => {
  // Add lastActive and isActive properties to each element
  const currentDate = new Date();
  for (const item of inactiveUserData) {
    const lastTweetDate = new Date(item.lastTweetDate);
    const lastReplyDate = new Date(item.lastReplyData);
    const latestDate =
      lastTweetDate > lastReplyDate ? lastTweetDate : lastReplyDate;
    item.lastActive = latestDate.getTime();
    item.lastActiveDate = latestDate.toString();
    item.isActive =
      currentDate.getTime() - activeUserOffset * 24 * 60 * 60 * 1000 <
      latestDate.getTime(); // 10 days
  }

  // Sort the data in ascending order based on lastTweetDateTimestamp
  inactiveUserData.sort((a, b) => a.lastActive - b.lastActive);

  // Write the data to an Excel file
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Data");
  worksheet.columns = [
    { header: "User ID", key: "userId", width: 15 },
    { header: "User Name", key: "userName", width: 20 },
    { header: "Handle Name", key: "handleName", width: 20 },
    { header: "Is Active", key: "isActive", width: 10 },
    { header: "Last Active Date", key: "lastActiveDate", width: 20 },
    { header: "Last Tweet Date", key: "lastTweetDate", width: 20 },
    { header: "Last Reply Date", key: "lastReplyData", width: 20 },
  ];
  
  // Set the data rows
  inactiveUserData.forEach((obj) => {
    worksheet.addRow({
      userId: obj.userId,
      userName: obj.userName,
      handleName: {
        text: obj.handleName,
        hyperlink: "https://twitter.com/" + obj.handleName,
      },
      isActive: obj.isActive,
      lastActiveDate: obj.lastActiveDate,
      lastTweetDate: obj.lastTweetDate,
      lastReplyData: obj.lastReplyData,
    });
  });

  // Auto-adjust the column widths
  worksheet.columns.forEach((column) => {
    column.width =
      Math.max(
        column.header.length,
        ...column.values.map((value) => (value ? value.toString().length : 0))
      ) + 2;
  });

  workbook.xlsx
    .writeFile(__dirname + "/../data/inactive-user-analysis.xlsx")
    .then(() => {
      console.log("File created successfully!");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = { createInactiveUserExcel };
