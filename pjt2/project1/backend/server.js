//create server

const express = require("express");
const app = express();

app.use(express.json());

//assign PORT
const PORT = process.env.PORT || 3001;

// set the secret key variable for jwt
const config = require("./config");
app.set("jwt-secret", config.secret);

//use body-parser for read data

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//load db
// const db = require('./config/db');
const sequelize = require("./models").sequelize;
sequelize.sync();

//////////////////////////////////////////////////////////////////////////

//load table
const {
  User,
  Board,
  Story,
  Sequelize: { Op },
} = require("./models");

sequelize.query("SET NAMES utf8mb4");

//signup api

const crypto = require("crypto");

app.post("/api/signup", (req, res) => {
  console.log(req.body);

  //hash password

  let hashPassword = "";

  try {
    hashPassword = crypto
      .createHash("sha512")
      .update(req.body.password)
      .digest("hex");

    User.create({
      email: req.body.email,
      username: req.body.username,
      password: hashPassword,
      personalcolor: req.body.personalcolor,
      userimgurl: req.body.userimgurl,
    })
      .then((result) => {
        res.send({
          message: 0,
          result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.send({
          message: 1,
        });
      });
  } catch (error) {
    console.log(error);
    return;
  }
});

//////////////////////////////////////////////////////////////////////////

//login api

const jwt = require("jsonwebtoken");

app.post("/api/login", (req, res) => {
  console.log(req.body);

  const key = req.app.get("jwt-secret");

  let hashPassword = "";

  try {
    hashPassword = crypto
      .createHash("sha512")
      .update(req.body.password)
      .digest("hex");
  } catch (error) {
    console.log(error);
    return;
  }

  User.findAll({
    where: { [Op.and]: [{ email: req.body.email, password: hashPassword }] },
  })
    .then((result) => {
      if (result[0]) {
        const user_id = String(result[0].id);

        let token = jwt.sign(
          {
            type: "JWT",
            username: result[0].username,
          },
          key,
          {
            expiresIn: "1d",
            issuer: "IGoAT",
            jwtid: user_id,
          }
        );
        return res.send({
          message: 0,
          result,
          jwt: token,
        });
      } else {
        return res.send({
          message: 1,
          result,
          jwt: "",
        });
      }
    })
    .catch(() => {
      res.send({
        message: 2,
      });
    });
});

//////////////////////////////////////////////////////////////////////////

// write board api

const multer = require("multer");
const storage = require("./storage");

const upload = multer({ storage: storage }).single("file"); //single: to use single file upload, array: to use multiple file upload

app.post("/api/board", upload, (req, res) => {
  console.log(req.body);

  console.log(req.file);

  Board.create({
    title: req.body.title,
    content: req.body.content,
    personalcolor: req.body.personalcolor,
    imageUrl: `images/${req.file.filename}`,
    user_id: Number(req.body.user_id),
  })
    .then((result) => {
      res.send({
        title: req.body.title,
        content: req.body.content,
        personalcolor: req.body.personalcolor,
        imageUrl: `images/${req.file.filename}`,
        user_id: Number(req.body.user_id),
        message: "게시판에 글을 작성하였습니다!",
      });
    })
    .catch((err) => {
      console.log("1");
      console.log(err);
      res.send({
        message: 1,
      });
    });
});

//////////////////////////////////////////////////////////////////////////

// makeup api

const uploads = multer({ storage: storage }).array("images"); //single: to use single file upload, array: to use multiple file upload

const { PythonShell } = require("python-shell");

app.use("/images", express.static("./images"));

app.post("/api/makeup", uploads, (req, res) => {
  var a = "";
  if (req.body.images > 100) {
    num = req.body.images - 100;
    a = `./img2/${num}.jpg`;
  } else if (req.body.images) {
    a = `./img1/0_${req.body.images}.jpg`;
  } else {
    a = req.files[1].filename;
  }

  var options = {
    mode: "text",
    pythonPath: "/SubPjt2/backend/usr/bin/python3",
    pythonOptions: ["-u"],
    scriptPath: "",
    args: [req.files[0].filename, a],
  };

  PythonShell.run("./makeup.py", options, function (err, results) {
    try {
      res.send({
        message: 0,
        imageUrl: `http://i8c201.p.ssafy.io:${PORT}/${results[0]}`,
      });
    } catch (err) {
      console.log(err);
      res.send({
        message: 1,
      });
    }
  });
});
/////////////////////////////////////////////////////////////

//calculate distance

app.get("/api/dist", (req, res) => {
  var options = {
    mode: "text",
    pythonPath: "",
    pythonOptions: ["-u"],
    scriptPath: "",
    args: [req.query.output_img, req.query.check],
  };

  PythonShell.run("./distance.py", options, function (err, results) {
    try {
      res.send({
        message: 0,
        data: JSON.parse(results[0]),
      });
    } catch (err) {
      res.send({
        message: 1,
      });
    }
  });
});

/////////////////////////////////////////////////////////////

// personalcolor

app.post("/api/personal", upload, (req, res) => {
  var options = {
    mode: "text",
    pythonPath: "/SubPjt2/backend/usr/bin/python3",
    pythonOptions: ["-u"],
    scriptPath: "",
    args: [`./images/${req.file.filename}`],
  };

  PythonShell.run("./personalcolor.py", options, function (err, results) {
    try {
      res.send({
        message: 0,
        data: results[0],
      });
    } catch (err) {
      res.send({
        message: 1,
      });
    }
  });
});

///////////////////////////////////////////////////////////

// get all board

app.get("/all/board", (req, res) => {
  Board.findAll()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      throw err;
    });
});

////////////////////////////////////////////////////////////////
// create stories

const upload_story = multer({ storage: storage }).single("file"); //single: to use single file upload, array: to use multiple file upload

app.post("/api/story", upload_story, (req, res) => {
  console.log("#$#$@#$@#$@#$@#$@#$");
  console.log(req.body);
  console.log("#$#$@#$@#$@#$@#$@#$");
  // console.log(req.file);

  Story.create({
    membership: req.body.membership,
    content: req.body.content,
    shopname: req.body.shopname,
    stylename: req.body.stylename,
    styleinfo: req.body.styleinfo,
    address: req.body.address,
    imageUrl: `images/${req.file.filename}`,
    board_id: Number(req.body.board_id),
  })
    .then((result) => {
      res.send({
        membership: req.body.membership,
        imageUrl: `images/${req.file.filename}`,
        content: req.body.content,
        shopname: req.body.shopname,
        stylename: req.body.stylename,
        styleinfo: req.body.styleinfo,
        address: req.body.address,
        board_id: Number(req.body.board_id),
        message: "게시판에 글을 작성하였습니다!",
      });
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
});

//////////////////////////////////////////////////////////// make stories

// get board_id for story

app.get("/id/board", async (req, res) => {
  Board.findOne({
    attributes: [sequelize.fn("max", sequelize.col("id"))],
    raw: true,
  })
    .then((result) => {
      console.log(Object.values(result));
      console.log(Object.values(result)[0]);
      res.send({
        data: Object.values(result)[0],
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "에러가 발생했다.",
      });
    });
});

// get all stories

app.get("/get/stories", (req, res) => {
  const board_id = Number(req.query.id);

  Story.findAll({
    where: { board_id: board_id },
  })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: "에러가 발생했다.",
      });
    });
});

//get a story

app.get("/get/story", (req, res) => {
  const story_id = Number(req.query.id);

  Story.findOne({
    where: { id: story_id },
  })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: "에러가 발생했다.",
      });
    });
});

// delete story

app.post("/delete/story", (req, res) => {
  const story_id = Number(req.body.id);
  console.log(req.body.id);
  Story.destroy({
    where: { id: story_id },
  })
    .then(res.sendStatus(200))
    .catch((err) => {
      throw err;
    });
});

// get update story

// update articles

app.post("/update/story", upload, (req, res) => {
  console.log(req.body);
  console.log(req.file);
  const { id, membership, content, address, shopname, stylename, styleinfo } =
    req.body;
  
  if (req.file){

    Story.update(
      {
        address: req.body.address,
        content: req.body.content,
        shopname: req.body.shopname,
        stylename: req.body.stylename,
        styleinfo: req.body.styleinfo,
        membership: req.body.membership,
        imageUrl: `images/${req.file.filename}`,
      },
  
      { where: { id: req.body.id } }
    )
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });


  } else {
    Story.update(
      {
        address: req.body.address,
        content: req.body.content,
        shopname: req.body.shopname,
        stylename: req.body.stylename,
        styleinfo: req.body.styleinfo,
        membership: req.body.membership,
      },
  
      { where: { id: req.body.id } }
    )
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }
  
});

//////////////////////////////////////////////////////////////// make items

// get story_id

app.get("/id/story", async (req, res) => {
  Story.findOne({
    attributes: [sequelize.fn("max", sequelize.col("id"))],
    raw: true,
  })
    .then((result) => {
      console.log(Object.values(result));
      console.log(Object.values(result)[0]);
      res.send({
        data: Object.values(result)[0],
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "에러가 발생했다.",
      });
    });
});

////////////////////////////////////////////////////

// get a board
app.get("/get/board", (req, res) => {
  //const story_id = Number(req.query.id);
  console.log(req.query.id);

  Board.findOne({
    where: { id: req.query.id },
  })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: "에러가 발생했다.",
      });
    });
});

// delete articles

app.post("/delete/data", (req, res) => {
  const board_id = Number(req.body.id);
  console.log(req.body.id);
  Board.destroy({
    where: { id: req.body.id },
  })
    .then(res.sendStatus(200))
    .catch((err) => {
      throw err;
    });
});

// update articles
app.post("/update/data", upload, (req, res) => {
  if (req.file) {
    Board.update(
      {
        title: req.body.title,
        content: req.body.content,
        personalcolor: req.body.personalcolor,
        imageUrl: `images/${req.file.filename}`,
      },
      // user_id: Number(req.body.user_id)
      { where: { id: req.body.id } }
    )
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  } else {
    Board.update(
      {
        title: req.body.title,
        content: req.body.content,
        personalcolor: req.body.personalcolor,
      },
      // user_id: Number(req.body.user_id)
      { where: { id: req.body.id } }
    )
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }
});

// seasonal personal color
app.get("/get/season", (req, res) => {
  // console.log(req.query.personalcolor)

  Board.findAll({
    where: { personalcolor: req.query.personalcolor },
  })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: "에러가 발생했다.",
      });
    });
});

// update userimgurl

app.post("/update/userimgurl", upload, (req, res) => {
  User.update(
    {
      userimgurl: `images/${req.file.filename}`,
    },
    { where: { id: req.body.id } }
  )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      throw err;
    });
});

// get user

app.get("/get/user", (req, res) => {
  console.log(req.query);
  User.findOne({
    where: { id: req.query.id },
  })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log("err", err);
    });
});

// update usermyself

app.post("/update/usermyself", upload, (req, res) => {
  User.update(
    {
      usermyself: req.body.myself,
    },
    { where: { id: req.body.id } }
  )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      throw err;
    });
});

// update userpc

app.post("/update/userpc", upload, (req, res) => {
  console.log(req.body);
  User.update(
    {
      personalcolor: req.body.pc,
    },
    { where: { id: req.body.id } }
  )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      throw err;
    });
});

// follow

app.post("/update/follower", upload, (req, res) => {
  User.update(
    {
      follower: req.body.follower,
    },
    {
      where: { id: req.body.id },
    }
  )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      throw err;
    });
});

////////////////////////////////////////////////////////////////////
//start sever
//npm start
app.listen(PORT, () => {
  console.log(`Server On : http://i8c201.p.ssafy.io:${PORT}`);
});
