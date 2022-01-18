if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }

const express = require('express')
// const router = require('./routes/inventory')
const mongoose = require('mongoose')
// const productRouter = require('./routes/inventory')
const Producto = require('./models/product')
const BalikO = require('./models/returns')
const methodOverride = require('method-override')
const bcrypt = require('bcrypt')
const passport = require('passport')
const PodO = require('./models/pod')
const flash = require('express-flash')
const session = require('express-session')
const app = express()
const multer = require('multer')
const SaleO = require('./models/sale') 
const fs = require('fs')
const fileUpload = require('express-fileupload')
const User = require('./models/user')

const Product = require('./models/product')
const Sale = require('./models/sale')
const Balik = require('./models/returns')
const Pod = require('./models/pod')



const user = []

mongoose.connect('mongodb://goRush:gsb2332065@cluster0-shard-00-00.rikek.mongodb.net:27017,cluster0-shard-00-01.rikek.mongodb.net:27017,cluster0-shard-00-02.rikek.mongodb.net:27017/inventory?ssl=true&replicaSet=atlas-tr9az4-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true});



app.set('view engine','ejs')


app.use(express.urlencoded({ extended: true}))
app.use(methodOverride('_method'))


//Login & Registration

  
const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

const users = []

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.get('/user', checkAuthenticated, (req, res) => {
  res.render('users/userprofile', { name: req.user.name })
})

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('users/login')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/user',
  failureRedirect: '/login',
  failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('users/register')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    res.redirect('/login')
  } catch {
    res.redirect('/register')
  }
})

app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}


//Product
app.post('/product', async (req,res) =>{
    const product = await Producto.find().sort({ createdAt: 'desc'})
      res.render('product/index', { products: product})
  })
app.get('/product', async (req,res) =>{
    const product = await Producto.find().sort({ createdAt: 'desc'})
      res.render('product/index', { products: product})
  })


  
  app.get('./product/new', function(req,res){
      res.render('product/new');
  });
  
  app.get('/product/new',(req,res)=>{
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
      res.redirect('/product')
  })

  
  
  
  
  
  function saveProductAndRedirect(path)   {
      return async (req,res) => {
          let product = req.product
              product._id = req.body._id
              product.title = req.body.title
              product.description = req.body.description
              product.sold = req.body.sold
              product.quantityonhand = req.body.quantityonhand
              product.payment = req.body.payment
              product.remarks = req.body.remarks
              product.restock = req.body.restock
              product.trackingNumber = req.body.trackingNumber
              product.trackingNumber2 = req.body.trackingNumber2
              product.trackingNumber3 = req.body.trackingNumber3
              product.trackingNumber4 = req.body.trackingNumber4
              product.trackingNumber5 = req.body.trackingNumber5
              product.trackingNumber6 = req.body.trackingNumber6
              product.trackingNumber7 = req.body.trackingNumber7
              product.trackingNumber8 = req.body.trackingNumber8
              product.trackingNumber9 = req.body.trackingNumber9
              product.trackingNumber10 = req.body.trackingNumber10
              product.trackingNumber11 = req.body.trackingNumber11
              product.trackingNumber12 = req.body.trackingNumber12
              product.trackingNumber13 = req.body.trackingNumber13
              product.trackingNumber14 = req.body.trackingNumber14
              product.trackingNumber15 = req.body.trackingNumber15
              product.trackingNumber16 = req.body.trackingNumber16
              product.trackingNumber17 = req.body.trackingNumber17
              product.trackingNumber18 = req.body.trackingNumber18
              product.trackingNumber19 = req.body.trackingNumber19
              product.trackingNumber20 = req.body.trackingNumber20
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
          sale._id = req.body._id
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
          balik._id = req.body._id
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

//POD
app.get('/pod', async (req,res) =>{
    const pod = await PodO.find().sort({ createdAt: 'desc'})
      res.render('pod/pod_index', { pods: pod})
  })

app.get('/podv2', async (req,res)=>{
    res.render('pod/pod_new_v2');
})

app.get('./pod/new', function(req,res){
    res.render('pod/pod_new');
});

app.get('/pod/new',(req,res)=>{
    res.render('pod/pod_new', {pod: new Pod() })
})

app.get('/pod/:id', async (req,res)=>{
    const pod = await Pod.findById(req.params.id)
    if (pod == null) res.redirect('/pod')
    res.render('pod/pod_show', { pod: pod})
})

app.get('/return/edit/:id', async (req,res)=>{
    const pod = await Pod.findById(req.params.id)
    if (pod == null) res.redirect('/pod')
    res.render('pod/pod_edit', { pod: pod})
})

app.post('/pod/new', async (req, res, next)=>{
    req.pod = new Pod()
    next()
}, savePodAndRedirect('new'))



app.put('/pod/:id', async (req, res, next)=>{
    req.pod = await Pod.findById(req.params.id)
    next()
}, savePodAndRedirect('edit'))


app.delete('/pod/:id', async (req,res)=>{
    await Pod.findByIdAndDelete(req.params.id)
    res.redirect('/pod')
})





function savePodAndRedirect(path)   {
    return async (req,res)=> {
        let pod = req.pod
        pod._id = req.body._id
        pod.podnumber = req.body.podnumber
        pod.poddate = req.body.poddate
        pod.podcreation = req.body.podcreation
        pod.trackingNumber = req.body.trackingNumber
        pod.trackingNumber2 = req.body.trackingNumber2
        pod.trackingNumber3 = req.body.trackingNumber3
        pod.trackingNumber4 = req.body.trackingNumber4
        pod.trackingNumber5 = req.body.trackingNumber5
        pod.trackingNumber6 = req.body.trackingNumber6
        pod.trackingNumber7 = req.body.trackingNumber7
        pod.trackingNumber8 = req.body.trackingNumber8
        pod.trackingNumber9 = req.body.trackingNumber9
        pod.trackingNumber10 = req.body.trackingNumber10
        pod.trackingNumber11 = req.body.trackingNumber11
        pod.trackingNumber12 = req.body.trackingNumber12
        pod.trackingNumber13 = req.body.trackingNumber13
        pod.trackingNumber14 = req.body.trackingNumber14
        pod.trackingNumber15 = req.body.trackingNumber15
        pod.trackingNumber16 = req.body.trackingNumber16
        pod.trackingNumber17 = req.body.trackingNumber17
        pod.trackingNumber18 = req.body.trackingNumber18
        pod.trackingNumber19 = req.body.trackingNumber19
        pod.trackingNumber20 = req.body.trackingNumber20
        pod.podaddress = req.body.podaddress
        pod.podprice = req.body.podprice
        pod.poddriver = req.body.poddriver
        pod.podcontactname = req.body.podcontactname
        pod.podarea = req.body.podarea
        try{
            returns = await pod.save()
            res.redirect(`/pod/${pod.id}`)
        } catch(e)  {
        res.render(`/pod/${path}`, { pods: pod})
        }
    }
}

//User view

app.get('/user/:id', async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user == null) res.redirect('/')
    res.render('userprofile', { user: user })
    
  })



//

app.get('/test', (req,res)=>{
    res.render('sale/test');
})

app.listen(process.env.PORT || 8000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});