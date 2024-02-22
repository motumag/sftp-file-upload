const Client = require("ssh2-sftp-client");

//Keep this credintials in .env file for security purpose.

const sftpConfig = {
  host: "192.168.2.23", //Note that this is sample remote server, you have to chage with your own remote server.
  username: "motumag", //make confirm this user is only to upload a file and no have access to other directors or any server resource
  password: "momoavator@123",
  //   You can add here if you have a key if it is key base auth.
};

const sourceFilePath = "D:/remitance request payload.txt";
const remoteFilePath = "/home/motumag/filesUploaded/destination.txt"; // here don't forget to give neccessary permission.

(async () => {
  try {
    const client = new Client();
    await client.connect(sftpConfig); //this one check if the configured above server is accessable

    try {
      await client.mkdir(
        remoteFilePath.split("/").slice(0, -1).join("/"),
        true
      );
    } catch (err) {
      if (err.message !== "File already exists") {
        throw err;
      }
    }
    await client.put(sourceFilePath, remoteFilePath);
    console.log("File transferred successfully!");

    await client.end();
  } catch (err) {
    console.error("Error:", err);
  }
})();
