const express = require("express");
const cors = require("cors");
const https = require("https");
const fs = require("fs");
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const { search } = require("./xlsxService");

const app = express();
app.use(cors());
app.use(express.static("build"));
app.use(express.json());

app.post("/api/search", async (req, res) => {
  await downloadFileIfNotExists();
  const result = doSearch(req.body);
  res.send(result);
});

app.post("/api/intersectionSearch", async (req, res) => {
  await downloadFileIfNotExists();
  const result = doIntersectionSearch(req.body);
  res.send(result);
});

app.listen(8000);

async function downloadFileIfNotExists() {
  if (!fs.existsSync(process.env.SAVE_FILE_PATH)) {
    console.log("Downloading...");
    await download(process.env.SOURCE_FILE_URL, process.env.SAVE_FILE_PATH);
    console.log("Downloaded");
  }
}

async function download(url, dest, cb) {
  var file = fs.createWriteStream(dest);

  return new Promise((resolve) => {
    https.get(url, function (response) {
      response.pipe(file);
      file.on("finish", function () {
        file.close(cb);
      });
      response.on("end", () => {
        resolve();
      });
    });
  });
}

function doSearch(params) {
  const directFields = [
    "caNo",
    "installation",
    "meterNo",
    "buildingCode",
    "csn",
    "gsn",
    "poleNo",
  ];
  const newFields = JSON.parse(process.env.KEY_TO_HEADER);
  return search(process.env.SAVE_FILE_PATH, (item) => {
    let found = false;
    directFields.forEach((i) => {
      if (
        Object.keys(params).findIndex((v) => v === i) >= 0 &&
        item[newFields[i]] === params[i]
      )
        found = true;
    });
    if (found) return true;
    else if (Object.keys(params).findIndex((v) => v === "name") >= 0) {
      if (item["First Name"].includes(params["name"])) return true;
      else if (item["Middle Name"].includes(params["name"])) return true;
      else if (item["Last Name"].includes(params["name"])) return true;
    } else if (Object.keys(params).findIndex((v) => v === "contactNo") >= 0) {
      if (item["Contact Number1"].includes(params["contactNo"])) return true;
      else if (item["Contact Number2"].includes(params["contactNo"]))
        return true;
      else if (item["Contact Number3"].includes(params["contactNo"]))
        return true;
      else if (item["Contact Number4"].includes(params["contactNo"]))
        return true;
    } else return false;
  });
}

function doIntersectionSearch(params) {
  //TODO

  return [];

  // const directFields = [
  //   "caNo",
  //   "installation",
  //   "meterNo",
  //   "buildingCode",
  //   "csn",
  //   "gsn",
  //   "poleNo",
  // ];
  // const newFields = JSON.parse(process.env.KEY_TO_HEADER);
  // return search(process.env.SAVE_FILE_PATH, (item) => {
  //   let found = true;
  //   directFields.forEach((i) => {
  //     if (
  //       Object.keys(params).findIndex((v) => v === i) >= 0 &&
  //       item[newFields[i]] !== params[i]
  //     )
  //       found = false;
  //   });
  //   if (!found) return false;
  //   else if (Object.keys(params).findIndex((v) => v === "name") >= 0) {
  //     if (item["First Name"].includes(params["name"])) return true;
  //     else if (item["Middle Name"].includes(params["name"])) return true;
  //     else if (item["Last Name"].includes(params["name"])) return true;
  //   } else if (Object.keys(params).findIndex((v) => v === "contactNo") >= 0) {
  //     if (item["Contact Number1"].includes(params["contactNo"])) return true;
  //     else if (item["Contact Number2"].includes(params["contactNo"]))
  //       return true;
  //     else if (item["Contact Number3"].includes(params["contactNo"]))
  //       return true;
  //     else if (item["Contact Number4"].includes(params["contactNo"]))
  //       return true;
  //   } else return false;
  // });
}
