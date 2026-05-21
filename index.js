const express = require('express');

const app = express();

const PORT = 3000;

app.use(express.json());

let products = [
    { id:1, name: 'Laptop', price:1000},
    { id:2, name: 'Phone', price:500},
    { id:3, name: 'Tablet', price:300}
];

// Get all products
app.get('/api/products',(req,res)=>{
    res.json(products);
});
app.get('/api/products/:id',(req,res)=>{
    const productId = parseInt(req.params.id);
    const product = products.find(p=>p.id === productId);
    if(product){
        res.json(product);
    }else{
        res.status(404).json({message: 'Product not found'});
    }
});

app.post('/api/products/', (req,res)=>{
    const {name,price} = req.body;
    const newProduct = {
        id: products.length + 1,
        name,
        price
    };
    products.push(newProduct);
    res.status(200).json(newProduct);
});

app.put('/api/products/:id',(req,res)=>{
    const productId = parseInt(req.params.id);
    const {name,price} = req.body;
    const product = products.find(p=>p.id === productId);
    console.log(product);
    if(product){
        product.name = name;
        product.price = price;
        res.json(product);
    }else{
        res.status(404).json({message: 'Product not found'});
    }
});

//DELETE product by ID
app.delete('/api/products/:id',(req,res)=>{
    const productID = parseInt(req.params.id);
    const productIndex = products.findIndex(p=>p.id === productID);
    if(productIndex != -1){
        products.splice(productIndex,1);
        res.json({message : 'Product deleted successfully'});
    }else{
         res.status(404).json({message: 'Product not found'});
    }
})

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});