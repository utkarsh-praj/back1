require("dotenv").config();
const express = require("express");

const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const { HoldingModel } = require("./model/HoldingsModel");
const {PositionsModel} = require("./model/PositionsModel")
const {OrdersModel} = require("./model/OrdersModel");

// app.get("/addpositions", async (req, res) => {
//   let temppositions = [
//   {
//     product: "CNC",
//     name: "EVEREADY",
//     qty: 2,
//     avg: 316.27,
//     price: 312.35,
//     net: "+0.58%",
//     day: "-1.24%",
//     isLoss: true,
//   },
//   {
//     product: "CNC",
//     name: "JUBLFOOD",
//     qty: 1,
//     avg: 3124.75,
//     price: 3082.65,
//     net: "+10.04%",
//     day: "-1.35%",
//     isLoss: true,
//   },
// ];

  
//   temppositions.forEach((item)=>{
//     let temppositions = new PositionsModel({
//         product : item.product,
//         name : item.name,
//         qty : item.qty,
//         avg : item.avg,
//         price : item.price,
//         net : item.net,
//         day : item.day,
//         isLoss : item.isLoss,
//     });
//     temppositions.save();
//   })

//   res.send("Done!"); 

// });

app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, async () => {
  console.log("App Started!");
  await mongoose.connect(uri);
  console.log("DB Connected");
  // console.log(process.env)
});
 

app.get("/allHoldings" , async (req,res) => {
  let allHoldings = await HoldingModel.find({});
  res.json(allHoldings);
  // res.send(allHoldings);
});

app.get("/allPostions" , async (req,res) => {
  let allPostions = await PositionsModel.find({});
  res.json(allPostions);
  // res.send(allHoldings);

});

app.post('/newOrder' ,async (req,res) => {
  let newOrder = new OrdersModel({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode:req.body.mode,
  })
  newOrder.save();
  res.send("Order saved!")
});


