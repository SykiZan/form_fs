exports.getAllUsers = (req, res, next) => {
  console.log("users");
  res.status(200).json({
    status: "success",
    data: {
      users: [
        { name: "Jack", age: "25" },
        { name: "Katy", age: "21" },
      ],
    },
  });
};
exports.getOneUser = (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: {
      name: "Katy",
      age: "21",
    },
  });
};
exports.createUser = (req, res, next) => {
  console.log(req.body);
  res.status(200).json({
    status: "success",
    data: {
      name: "Ronny",
      age: "23",
    },
  });
};
