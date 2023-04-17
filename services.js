const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.listen(3001);
app.set(express.urlencoded({ extended: true }));

mongoose
  .connect(
    "mongodb://sonu:12345@ac-yfleg7h-shard-00-00.smjuhsr.mongodb.net:27017,ac-yfleg7h-shard-00-01.smjuhsr.mongodb.net:27017,ac-yfleg7h-shard-00-02.smjuhsr.mongodb.net:27017/shopGenix?ssl=true&replicaSet=atlas-7ibbxg-shard-0&authSource=admin&retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected...");
  })
  .catch((err) => console.log(err));

const productSchema = new mongoose.Schema({
  price: Number,
  image: String,
  productId: Number,
  productName: String,
  rating: { type: Number, enum: [0, 1, 2, 3, 4, 5] },
  details: String,
  description: String,
  colors: String,
  stock: Number,
  reviews: String,
  storeName: String,
});

const cartSchema = new mongoose.Schema({
  userId: String,
  product: [productSchema],
  quantity:Number
});

const orderSchema = new mongoose.Schema({
  userId: String,
  product: [productSchema],
  username:String,
  address:String,
  totalAmount:Number,
  quantity:Number,
  cartId:String
});


const userSchema = new mongoose.Schema({
  regUsername: String,
  regPassword: String,
  regEmail: String,
  regMobilenum: Number,
  isAdmin: { type: Boolean, default: false },
  deliAddress:String,
  wallet:{type:Number,default:1000000}
});

const authSchema = new mongoose.Schema({
  loginEmail: String,
  loginPassword: String,
});

const Auths = mongoose.model("Auths", authSchema);
const Cart = mongoose.model("Cart", cartSchema);
const Order = mongoose.model("Order", orderSchema);
const Users = mongoose.model("Users", userSchema);
const Products = mongoose.model("Products", productSchema);

app.get("/products", async (req, res) => {
  const a = await Products.find().lean();
  res.send(a);
});

app.get("/users", async (req, res) => {
  const a = await Users.find().lean();
  res.send(a);
});

app.post("/cart/item", async (req, res) => {
  const a = await Cart.find({userId:req.body.userId}).lean();
  res.send(a);
});

app.get("/order", async (req, res) => {
  const a = await Order.find().lean();
  res.send(a);
});

app.delete("/order/:id", async (req, res) => {
  const a = await Order.deleteOne({_id:req.params.id});
  res.send(a);
});

app.post("/order", async (req, res) => {
  const a = new Order();
  a.userId = req.body.userId;
  a.username=req.body.username;
  a.totalAmount=req.body.totalAmount;
  a.address=req.body.address;
  a.quantity=req.body.quantity,
  a.cartId=req.body.cartId,
  a.product.push({
    price: req.body.price,
    image: req.body.image,
    productId: req.body.productId,
    productName: req.body.productName,
    rating: req.body.rating,
    details: req.body.details,
    colors: req.body.colors,
    stock: req.body.stock,
    reviews: req.body.reviews,
    storeName: req.body.storeName,
    description: req.body.description,
  });
  await a.save();
  res.send(a);


});



app.get("/products/:id", async (req, res) => {
  const a = await Products.findOne({ _id: req.params.id });
  if (!a) return res.status(404).send("Product Not Found.");
  res.send(a);
});

app.get("/order/:id", async (req, res) => {
  const a = await Order.find({ userId: req.params.id }).lean();
  if (!a) return res.status(404).send("Order Not Found.");
  res.send(a);
});


app.post("/order/product", async (req, res) => {
  const a = await Products.findOne({ _id: req.body.id });
  if (!a) return res.status(404).send("Product Not Found.");
  res.send(a);
});

app.post("/products", async (req, res) => {
  const a = new Products({
    price: req.body.price,
    image: req.body.image,
    productId: req.body.productId,
    productName: req.body.productName,
    rating: req.body.rating,
    details: req.body.details,
    colors: req.body.colors,
    stock: req.body.stock,
    reviews: req.body.reviews,
    storeName: req.body.storeName,
    description: req.body.description
  });
  await a.save();
  res.send(a);
});

app.post("/cart", async (req, res) => {
  const a = new Cart();
  a.userId = req.body.userId;
  a.quantity=req.body.quantity;
  a.product.push({
    price: req.body.price,
    image: req.body.image,
    productId: req.body.productId,
    productName: req.body.productName,
    rating: req.body.rating,
    details: req.body.details,
    colors: req.body.colors,
    stock: req.body.stock,
    reviews: req.body.reviews,
    storeName: req.body.storeName,
    description: req.body.description,
  });
  await a.save();
  res.send(a);
});

app.post("/users", async (req, res) => {
  const a = new Users({
    regUsername: req.body.regUsername,
    regPassword: req.body.regPassword,
    regEmail: req.body.regEmail,
    regMobilenum: req.body.regMobilenum,
    isAdmin: req.body.isAdmin,
    deliAddress:req.body.deliAddress,
    wallet:req.body.wallet
  });
  const b = await Users.findOne({ regEmail: a.regEmail });
  if (b) return res.send("Same Email ID Exist Plz Use Another Email ID");
  if (!b) {
    await a.save();
    const token = jwt.sign(
      {
        _id: a._id,
        username: a.regUsername,
        email: a.regEmail,
        mobileNum: a.regMobilenum,
        isAdmin: a.isAdmin,
        deliAddress:a.deliAddress,
        wallet:a.wallet
      },
      "MyApp"
    );
    res.header("x-auth-token", token).send(token);
  }
});

app.post("/login", async (req, res) => {
  const a = new Auths({
    loginEmail: req.body.loginEmail,
    loginPassword: req.body.loginPassword,
  });
  const b = await Users.findOne({ regEmail: req.body.loginEmail });
  if (!b) return res.status(404).send("This Email ID Doesn't Exist");
  if (a.loginPassword !== b.regPassword)
    return res.status(404).send("Password is Invalid");

  const token = jwt.sign(
    {
      _id: b._id,
      username: b.regUsername,
      mobileNum: b.regMobilenum,
      email: b.regEmail,
      isAdmin: b.isAdmin,
      deliAddress:b.deliAddress,
      wallet:b.wallet
    },
    "MyApp"
  );
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token");
  if (a.loginPassword === b.regPassword) return res.send(token);
});

app.put("/users/:id", async (req, res) => {
  await Users.updateOne(
    { _id: req.params.id },
    {
      $set: {
        regUsername: req.body.updateUsername,
        regPassword: req.body.updatePassword,
        regMobilenum: req.body.updateMobilenum,
        deliAddress:req.body.deliAddress,
        wallet:req.body.wallet
      },
    }
  );

  const a = await Users.findOne({ _id: req.params.id });
  const token = jwt.sign(
    {
      _id: a._id,
      username: a.regUsername,
      mobileNum: a.regMobilenum,
      email: a.regEmail,
      isAdmin: a.isAdmin,
      deliAddress:a.deliAddress,
      wallet:a.wallet
    },
    "MyApp"
  );
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(token);
});



app.put("/updateWallet/:id", async (req, res) => {
  await Users.updateOne(
    { _id: req.params.id },
    {
      $set: {
        wallet:req.body.wallet
      },
    }
  );

  const a = await Users.findOne({ _id: req.params.id });
  const token = jwt.sign(
    {
      _id: a._id,
      username: a.regUsername,
      mobileNum: a.regMobilenum,
      email: a.regEmail,
      isAdmin: a.isAdmin,
      deliAddress:a.deliAddress,
      wallet:a.wallet
    },
    "MyApp"
  );
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(token);
});






app.put("/cart/:id", async (req, res) => {
  const item=await Cart.updateOne(
    { _id: req.params.id },
    {
      $set: {
        quantity: req.body.quantity
      },
    }
  );  
  res.send(item);
});






app.delete("/products/:id", async (req, res) => {
  const a = await Products.deleteOne({ _id: req.params.id });
  res.send("Successfully Deleted");
});

app.delete("/users/:id", async (req, res) => {
  const a = await Users.deleteOne({ _id: req.params.id });
  res.send("Successfully Deleted");
});

app.post('/cart/order',async(req,res)=>{
  await Cart.deleteOne({_id:req.body.cartId});
  const cart = await Cart.find({userId:req.body.userId}).lean();
  res.send(cart);
})

app.delete('/cart/:id',async(req,res)=>{
  const a=await Cart.deleteOne({_id:req.params.id});
  res.send(a);
})