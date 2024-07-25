const mongoose = require("mongoose");
const { default: BackupToolkit } = require("mongodb-backup-toolkit");

const Script = async () => {
  await Backup();
  process.exit(0);
};

const Backup = async () => {
  const date = new Date(Date.now());
  await BackupToolkit.backup(
    "mongodb+srv://Ayden:M5xy2IWWclR7t3xt@cluster0.xgxfz3t.mongodb.net/battleship?retryWrites=true&w=majority&appName=Cluster0",
    `./dumbs/dumb_${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}_${date.getHours()}H${date.getMinutes()}/`
  );
};

mongoose
  .connect(
    "mongodb+srv://Ayden:M5xy2IWWclR7t3xt@cluster0.xgxfz3t.mongodb.net/websocket?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to MongoDB");
    Script();
  })
  .catch((e) => console.error(e));
