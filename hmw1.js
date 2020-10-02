"use strict"

const express=require('express');
// const { getMaxListeners } = require('process');
const app = express();
app.use(express.json());

let CartList=[];
let UserList=[];
let Cart_ItemList=[];
let Store_ItemList=[];

const sampleUser=
    {   //size of array
        
         CartList:[],

        "UserId": UserList.length,
        "FirstName": "SampleFirst",
        "LastName": "SampleLast",
        "Email": "SampleEmail",

        // "Cart":[{"Description":"Coke",ItemId:0,Item_quan: 1},
        //   {"Description":"Pepsi",ItemId:1,Item_quan: 1}]
    }



const sampleCart=
    {
        "CartId": CartList.length,
        "UserId": UserList.length,
        //"ItemId": 0

    }


const sampleItem=
    {   CartId: CartList.length,
        ItemId: Cart_ItemList.length,
        Item_quan: "SampleQuan",
        Item_Name: "SampleName"
    }

const sampleStore=
    {
        StoreItemId: "SampleStore"

    }



//Creates a new user
app.post('/user',(req,res)=>{
    
    let newUser = {};
    newUser.UserId=UserList.length
    newUser.FirstName= req.param("FirstName")
    newUser.LastName=req.param("LastName")
    newUser.Email=req.param("Email")
    //newUser.Cart=req.param("Cart")
    UserList.push(newUser)
    res.send(newUser)
})
//Gets the user info given the id
app.get('/user/:UserId',(req,res)=>{
    const foundUser=UserList.find((User)=>
    {return User.UserId==req.params.UserId})
    res.send(foundUser?foundUser:404)
})

//post a cart
app.post('/cart',(req,res)=>
{
    let newCart = {};
    newCart.CartId=CartList.length
    CartList.push(newCart)
    res.send(newCart)
})
//get user's cart
app.get('/user/:UserId/cart',(req,res)=>
{
    const foundCart = CartList.filter((Cart) => {
        return Cart.UserId === parseInt(req.params.UserId)
    })
    res.send(foundCart)
})

//delete the whole cart
app.delete('/user/:UserId/cart',(req,res)=>
{
    const foundCartIndex = CartList.indexOf(req.params.UserId);
    const foundCart = CartList.splice(foundCartIndex, 1);
    res.send(foundCart);
})

//post new items to the cart
app.post('/cart/:CartId/cartItem',(req,res)=>
{
    let newItem = {};
    newItem.ItemId=Cart_ItemList.length
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
