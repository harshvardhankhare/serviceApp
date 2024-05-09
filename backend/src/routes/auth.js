// server/routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Gig = require("../models/gig")
const Order = require("../models/order")
const Conversation = require("../models/conversationmodel")
const Message = require("../models/messagemodel")
//const createSecretToken = require('../util/createSecretToken')
const cookieParser = require("cookie-parser")

// Register
createSecretToken = (id) => {
  return jwt.sign({ id }, 'jwtSecret', {
    expiresIn: 3 * 24 * 60 * 60,
  });
};
userVerification = (req, res) => {
  const token = req.cookies.token
  if (!token) {
    return res.json({ status: false })
  }
  jwt.verify(token, 'jwtSecret', async (err, data) => {
    if (err) {
      return res.json({ status: false })
    } else {
      const user = await User.findById(data.id)
      if (user) return res.json({ status: true, user: user })
      else return res.json({ status: false })
    }
  })
}

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return next("You are not authenticated!")


  jwt.verify(token, "jwtSecret", async (err, payload) => {
    if (err) return next("Token is not valid!")
    req.userId = payload.id;
    req.isSeller = payload.isSeller;
    next()
  });
};

const createError = (status, message) => {
  const err = new Error();
  err.status = status;
  err.message = message;

  return err;
};




router.post('/register', async (req, res, next) => {
  console.log("you come here")
  try {
   
    const { username, password, email, country, desc, isSeller } = req.body;
    let user = await User.findOne({ username });
    if (user) {
      return res.status(200).json({ msg: 'User already exists' });
    }
    user = new User({ username, password, email, country, desc, isSeller });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const token = createSecretToken(user.id)
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    console.log("cookie-send")
    res.status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next()
    //res.json({ msg: 'User registered successfully', user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Login
router.post('/login', async (req, res, next) => {
  console.log("you reached here")
  try {
    const { username, password } = req.body;
    let user = await User.findOne({ username });
    if (!user) {
      console.log("you reached bere")
      return res.status(400).json({ msg: 'Invalid credentials 66' });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(201).json({ message: "User logged in successfully", success: true });
    next()
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
router.post('/', userVerification);


router.get("/all", async (req, res) => {
  try {
    const users = await User.find(); // Assuming you have a 'comments' field in your Post schema to populate comments
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

router.post("/addgig", verifyToken, async (req, res) => {

  try {
    console.log("reacherd gig add backend")
    const userid = req.userId
    console.log(userid)
    const { title, desc, cats, servicetitle, shortdesc, deltime, revnum, price, } = req.body
    const gig = new Gig({ title, userid, desc, cats, servicetitle, shortdesc, deltime, revnum, price })
    gig.save()

    res.status(201).json({ success: true });
  }
  catch (e) {
    console.error(e.message);
    res.status(500).send('Server Error');
  }

})

router.get("/gigs", async (req, res) => {
  try {
    console.log("come here")

    const searchTerm = req.query.search
    const regex = new RegExp(searchTerm, 'i'); // Case-insensitive search

    const gigs = await Gig.find({ title: regex });
    res.json(gigs);

  } catch (error) {
    console.error('Error fetching gigs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }


})

router.get("/gig/single/:id", async (req, res) => {
  try {
     console.log("reached single gig backend")
    const gig = await Gig.findById(req.params.id);

    const userid = gig.userid

    if (!gig) next(createError(404, "Gig not found!"));
    const user = await User.findById(userid)
    // console.log(user)
    res.status(200).send({ gig, user });
  } catch (e) {
    console.e("error fetching gig : ", e)
    res.status(500).json({ error: "internal server error" });
  }
})
router.get("/user/:id", async (req, res) => {
  try {
    console.log(req.params.id)
    const user = await User.findById(req.params.id)
    if (!user) next(createError(404, "Gig not found!"));
    console.log(user)
    res.status(200).send(user);

  } catch (e) {

    res.status(500).json({ error: "internal server error" })
  }
})


router.post("/order", async (req, res) => {

  try {
    console.log("reacherd order backend")

    const { gigId, title, sellerId, price, buyerId } = req.body

    const order = new Order({ gigId, title, sellerId, price, buyerId })
    order.save()

    res.status(201).json('order added succesfully')

  }
  catch (e) {
    console.error(e.message);
    res.status(500).send('Server Error');
  }

})


router.get("/order/buyer", async (req, res) => {


  try {
    console.log("reached here order")
    console.log(req.query.id)
    const bId = req.query.id;
    const orders = await Order.find({ buyerId: bId });

    res.json(orders);

  } catch (error) {

    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

})
router.get("/conversations/single/:id", async (req, res, next) => {
  try {
    // const conversation = await Conversation.find({ id: req.params.id });
    console.log("reached single conersation api")
    const idx = req.params.id
    const conversation = await Conversation.findOne({ id: idx })
    console.log(conversation)
    if (!conversation) return next(createError(404, "Not found!"));
    res.status(200).send(conversation);
  } catch (err) {
    next(err);
  }

})
router.post("/conversations/create", async (req, res, next) => {

  console.log(req.body)


  console.log("create-conversation api")
  const newConversation = new Conversation({
    id: req.body.id,
    sender: req.body.cu._id,
    rec: req.body.cu.isSeller ? req.body.ox.buyerId : req.body.sellerId,
    readBySeller: true,
    readByBuyer: true,
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(201).send(savedConversation);
  } catch (err) {
    next(err);
  }
})

router.get("/message/:id", async (req, res, next) => {
  try {
    console.log("message endpoint")
    const messages = await Message.find({ conversationId: req.params.id });

    res.status(200).send(messages);
  } catch (err) {
    next(err);
  }
})
router.post("/message/", async (req, res) => {
  console.log(req.body)
  const newMessage = new Message({
    conversationId: req.body.conversationId,
    userId: req.body.userId,
    desc: req.body.desc,
  });
  try {

    const savedMessage = await newMessage.save();
    await Conversation.findOneAndUpdate(
      { id: req.body.conversationId },
      {
        $set: {
          readBySeller: true,
          readByBuyer: true,
          lastMessage: req.body.desc,
        }
      },
      { new: true }
    );
    console.log(savedMessage)

    res.status(201).send(savedMessage);

    console.log("message create endpoint")

  } catch (err) {
    next(err);
  }
})
router.get("/conversations", async (req, res, next) => {
  try {

    const conversations = await Conversation.find().sort({ updatedAt: -1 });
    let conv = [];

    conversations.forEach(Element => {
      if (Element.sender == req.query.id) {
        conv.push(Element)
      }
    })


    res.status(200).send(conv);
  } catch (err) {
    next(err);
  }
})
router.get("/service", async (req, res, next) => {


  try {
    const gigs = await Gig.find({ userid: req.query.userId });

    res.status(200).send(gigs);
  } catch (err) {
    next(err);
  }
}
)
router.delete("/service/:id", async (req, res, next) => {
  try {


   // const gig = await Gig.findById(req.params.id);
    // if (gig.userid !== req.userId)
    //   return next(createError(403, "You can delete only your gig!"));

    await Gig.findByIdAndDelete(req.params.id);
    console.log("deleted")
   // Status=true
    res.status(200).json({msg:"Gig has been deleted!",x:true});
  } catch (err) {
    next(err);
  }
})

router.get("/gigs/explore", async (req,res)=>{

  try {
    
    const gigs = await Gig.find();
    res.json(gigs);

  } catch (error) {
    console.error('Error fetching gigs:', error);
  }
})

module.exports = router;
