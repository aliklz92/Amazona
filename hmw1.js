"use strict"

const express=require('express');
// const { getMaxListeners } = require('process');
const app = express();
app.use(express.json());
let nextuser=0;
let nextcart=0;
let ItemId=0;

let UserList=[];
const sampleUser=
    {   //size of array
        "UserId": 0,
        "FirstName": "SampleFirst",
        "LastName": "SampleLast",
        "Email": "SampleEmail",

        // "Cart":[{"Description":"Coke",ItemId:0,Item_quan: 1},
        //   {"Description":"Pepsi",ItemId:1,Item_quan: 1}]
    }



let CartList=[];
const sampleCart=
    {
        "CartId": 0,
        "UserId": 0,
        "ItemId": 0

    }


let Cart_ItemList=[];
const sampleItem=
    {   CartId: 0,
        ItemId: 0,
        Item_quan: "SampleQuan",
        Item_Name: "SampleName"
    }

let Store_ItemList=[{"Description":"Coke",ItemId:1000,Item_quan: 10},
    {"Description":"Pepsi",ItemId:1100,Item_quan: 10},
    {"Description":"Sprite",ItemId:1110,Item_quan: 10},
    {"Description":"Dr.Pepper",ItemId:1111,Item_quan: 10}];
const sampleStore=
    {
        StoreItemId: "SampleStore"

    }



//Gets the user info given the id
app.get('/user',(req,res)=>{
    res.send(UserList)
})
//Creates a new user
app.post('/user',(req,res)=>{
    
    let newUser = {};
    newUser.UserId=nextuser++
    newUser.FirstName= req.param("FirstName")
    newUser.LastName=req.param("LastName")
    newUser.Email=req.param("Email")
    //newUser.Cart=req.param("Cart")
    UserList.push(newUser)
    res.send(newUser)
})


app.post('/cart',(req,res)=>
{
    let newCart = {};
    newCart.CartId=nextcart++
    CartList.push(newCart)
    res.send(newCart)
})
app.get('/user/:UserId/cart',(req,res)=>
{
    const foundCart = CartList.filter((Cart) => {
        return Cart.UserId === parseInt(req.params.UserId)
    })
    res.send(foundCart)
})

app.delete('/user/:UserId/cart',(req,res)=>
{
    const foundCartIndex = CartList.indexOf(req.params.UserId);
    const foundCart = CartList.splice(foundCartIndex, 1);
    res.send(foundCart);
})

app.post('/cart/:CartId/cartItem',(req,res)=>
{
    let newItem = {};
    newItem.ItemId=ItemId++
    newItem.Item_quan=req.param("Item_quan")
    newItem.Item_Name=req.param("Item_Name")
    Cart_ItemList.push(newItem)
    res.send(newItem)
})



UserList.push(sampleUser);
CartList.push(sampleCart)
console.log(CartList)
Cart_ItemList.push(sampleItem)
//Store_ItemList.push(sampleStore)
app.listen(8080);
