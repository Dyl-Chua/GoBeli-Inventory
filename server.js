const express = require('express')
// const router = require('./routes/inventory')
const mongoose = require('mongoose')
// const productRouter = require('./routes/inventory')
const Producto = require('./models/product')
const BalikO = require('./models/returns')
const methodOverride = require('method-override')
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const app = express()
const multer = require('multer')
const SaleO = require('./models/sale') 

const Product = require('./models/product')
const Sale = require('./models/sale')
const Balik = require('./models/returns')

mongoose.connect('mongodb://goRush:gsb2332065@cluster0-shard-00-00.rikek.mongodb.net:27017,cluster0-shard-00-01.rikek.mongodb.net:27017,cluster0-shard-00-02.rikek.mongodb.net:27017/inventory?ssl=true&replicaSet=atlas-tr9az4-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true});

// document.getElementById("add_more_fields").addEventListener("click", addItems);
// var additional_item = document.getElementById('additional_item');
// var countadd = 0;

app.set('view engine','ejs')


app.use(express.urlencoded({ extended: true}))
app.use(methodOverride('_method'))

app.get('/', async (req,res) =>{
  const product = await Producto.find().sort({ createdAt: 'desc'})
    res.render('product/index', { products: product})
})

app.get('/product/new', function(req,res){
    res.render('product/new');
});

app.get('/new',(req,res)=>{
    res.render('product/new', {product: new Product() })
})

app.get('/product/:id', async (req,res)=>{
    const product = await Product.findById(req.params.id)
    if (product == null) res.redirect('/')
    res.render('product/show', { product: product})
})

app.get('/product/edit/:id', async (req,res)=>{
    const product = await Product.findById(req.params.id)
    if (product == null) res.redirect('/')
    res.render('product/edit', { product: product})
})

app.post('/product/new', async (req, res, next)=>{
    req.product = new Product()
    next()
}, saveProductAndRedirect('new'))



app.put('/product/:id', async (req, res, next)=>{
    req.product = await Product.findById(req.params.id)
    next()
}, saveProductAndRedirect('edit'))


app.delete('/product/:id', async (req,res)=>{
    await Product.findByIdAndDelete(req.params.id)
    res.redirect('/')
})





function saveProductAndRedirect(path)   {
    return async (req,res) => {
        let product = req.product
            product.title = req.body.title
            product.description = req.body.description
            product.sold = req.body.sold
            product.quantityonhand = req.body.quantityonhand
            product.payment = req.body.payment
            product.remarks = req.body.remarks
            product.restock = req.body.restock
        try{
        product = await product.save()
        res.redirect(`/product/${product.id}`)
    } catch(e)  {
    res.render(`/product/${path}`, { product: product})
    }
    }
}

//Render Header and Footer
app.get('/header', (req,res)=> {
    res.render('/product/_header.ejs');
});

app.get('/footer', (req,res)=> {
    res.render('/product/_footer.ejs');
});

//POD Tab

app.get('/pod', function(req,res){
    res.render('pod/pod_index');
});

//Sales Tab
app.get('/sale', async (req,res) =>{
    const sale = await SaleO.find().sort({ createdAt: 'desc'})
      res.render('sale/sales_index', { sales: sale})
  })
  
  app.get('./sale/new', function(req,res){
      res.render('sale/sales_new');
  });
  
  app.get('/sale/new',(req,res)=>{
      res.render('sale/sales_new', {sale: new Sale() })
  })
  
  app.get('/sale/:id', async (req,res)=>{
      const sale = await Sale.findById(req.params.id)
      if (sale == null) res.redirect('/sale')
      res.render('sale/sales_show', { sale: sale})
  })
  
  app.get('/sale/edit/:id', async (req,res)=>{
      const sale = await Sale.findById(req.params.id)
      if (sale == null) res.redirect('/sale')
      res.render('sale/sales_edit', { sale: sale})
  })
  
  app.post('/sale/new', async (req, res, next)=>{
      req.sale = new Sale()
      next()
  }, saveSaleAndRedirect('new'))
  
  
  
  app.put('/sale/:id', async (req, res, next)=>{
      req.sale = await Sale.findById(req.params.id)
      next()
  }, saveSaleAndRedirect('edit'))
  
  
  app.delete('/sale/:id', async (req,res)=>{
      await Sale.findByIdAndDelete(req.params.id)
      res.redirect('/sale')
  })
  
  
  
  
  
  function saveSaleAndRedirect(path)   {
      return async (req,res)=> {
          let sale = req.sale
          sale.salesnumber = req.body.salesnumber
          sale.salesdescription = req.body.salesdescription
          sale.salesproduct = req.body.salesproduct
          sale.salesquantity = req.body.salesquantity
          sale.priceperunit = req.body.salespriceperunit
          sale.salespayment = req.body.salespayment
          try{
              sales = await sale.save()
              res.redirect(`/sale/${sale.id}`)
          } catch(e)  {
          res.render(`/sale/${path}`, { sales: sale})
          }
      }
  }

//Returns

app.get('/return', async (req,res) =>{
    const balik = await BalikO.find().sort({ createdAt: 'desc'})
      res.render('return/returns_index', { baliks: balik})
  })
  
  app.get('./return/new', function(req,res){
      res.render('return/returns_new');
  });
  
  app.get('/return/new',(req,res)=>{
      res.render('return/returns_new', {balik: new Balik() })
  })
  
  app.get('/return/:id', async (req,res)=>{
      const balik = await Balik.findById(req.params.id)
      if (balik == null) res.redirect('/return')
      res.render('return/returns_show', { balik: balik})
  })
  
  app.get('/return/edit/:id', async (req,res)=>{
      const balik = await Balik.findById(req.params.id)
      if (balik == null) res.redirect('/return')
      res.render('return/returns_edit', { balik: balik})
  })
  
  app.post('/return/new', async (req, res, next)=>{
      req.balik = new Balik()
      next()
  }, saveReturnAndRedirect('new'))
  
  
  
  app.put('/return/:id', async (req, res, next)=>{
      req.balik = await Balik.findById(req.params.id)
      next()
  }, saveReturnAndRedirect('edit'))
  
  
  app.delete('/return/:id', async (req,res)=>{
      await Balik.findByIdAndDelete(req.params.id)
      res.redirect('/return')
  })
  
  
  
  
  
  function saveReturnAndRedirect(path)   {
      return async (req,res)=> {
          let balik = req.balik
          balik.balikproduct = req.body.balikproduct
          balik.balikreason = req.body.balikreason
          balik.balikdatetogorush = req.body.balikdatetogorush
          balik.balikreasondatetoorgin = req.body.balikdatetoorgin
          try{
              returns = await balik.save()
              res.redirect(`/return/${balik.id}`)
          } catch(e)  {
          res.render(`/return/${path}`, { baliks: balik})
          }
      }
  }

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});