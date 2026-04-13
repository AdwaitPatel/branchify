process.on("message", (msg) => {

  if (msg.type === "create") {

    const { branch, port } = msg.data;

    console.log(`Manager: Creating environment for ${branch}`);

    const pid = Math.floor(Math.random() * 10000);

    process.send({
      type: "created",
      data: {
        branch,
        port,
        pid
      }
    });
  }

  if (msg.type === "stop") {

    console.log(`Manager: stopping ${msg.data.branch}`);

    process.send({
      type: "stopped",
      data: msg.data
    });
  }

});
