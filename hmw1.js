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


// let CartList=[];
// const sampleCart=
//     {
//
//         "CartId":nextuser
//
//     }
let CartList=[];
const sampleCart=
    {
        "CartId": 0,
        "UserId": 0,
        "ItemId": 0

        // "Cart":  [{"Description":"Coke",ItemId:0,Item_quan: 1},
        // {"Description":"Pepsi",ItemId:1,Item_quan: 1}]
        //let CartList = {};
        //"CartId":"nextuser";
        //CartList.CartID = CartList.length
        //CartList.UserId = req.param.UserId

    }
// const sampleitems=
//     {
//         "Description":"samplename",
//         "ItemId":"sampleId",
//         "Item_quan": "samplequan"
// }

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
    // req.body.User.UserId=nextuser++
    // UserList.push(req.body.User)
    // res.send(req.body.User)

    let newUser = {};
    newUser.UserId=nextuser++
    newUser.FirstName= req.param("FirstName")
    newUser.LastName=req.param("LastName")
    newUser.Email=req.param("Email")
    //newUser.Cart=req.param("Cart")
    UserList.push(newUser)
    res.send(newUser)
})

// app.get('/cart',(req,res)=>{
//     res.send(CartList)
// })
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

app.get('/StoreItem',(req,res)=>
{
    res.send(Store_ItemList)
})
// app.delete('/cart', (req, res) =>
// {
//     const foundItemIndex = CartList.indexOf(req.params.ItemId);
//     const foundItem = CartList.splice(foundItemIndex, 1);
//     res.send(foundItem ? foundItem : 404);
// });
// app.post('/cart',(req,res)=>{
//     // req.body.User.UserId=nextuser++
//     // UserList.push(req.body.User)
//     // res.send(req.body.User)
//
//     let newItem = {};
//     newItem.FirstName= req.param("FirstName")
//     newUser.LastName=req.param("LastName")
//     newUser.Email=req.param("Email")
//     //newUser.Cart=req.param("Cart")
//     UserList.push(newUser)
//     res.send(newUser)
// })

// app.post('/user',(req,res)=>{
//     UserList.push(req.body.User)
//     res.send(UserList)
// })
//Gets the user’s cart


//delete cart
// app.delete('/cart',(req,res)=>{
//     const
// })


// //Add a new item to the cart
// app.post('/cart/:CartId/cartItem',(req,res)=>{
//     // Cart_ItemList.push(req.body.cart)
//     UserList.find(User=>User.UserId === req.param.CartId)
//     res.send(req.param.CartId)
// })
// // app.put('/Item:id',(req,res)=>{
// //     let founditem= Cart_ItemList.splice(req.params.id,1,req.body);
// //     res.send(founditem || 404);
// // })
// //delete item
//
//
//
// //get all details
// app.get('/store',(req,res)=>{
//     res.send(Store_ItemList)
// })
// //Get all items that satisfy the regular expression query
// app.get('/store',(req,res)=>{
//     res.send(Store_ItemList.filter((store)=>{
//         return store.item===req.query.item;
//     }))
// })

UserList.push(sampleUser);
CartList.push(sampleCart)
console.log(CartList)
Cart_ItemList.push(sampleItem)
Store_ItemList.push(sampleStore)
app.listen(8080);
