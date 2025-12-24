const express = require('express');
const app = express();
//middleware handler
app.use(express.urlencoded({extended:true}))

let contacts = [];
let id =1;

 app.set('view engine' , 'ejs');

// using a add button

 app.post('/add' , (req,res) =>{
    contacts.push({ id:id++,name:req.body.name,num:req.body.num,email:req.body.email})
    res.redirect('/')
 })
// using an updating button 
 
app.post('/update/:id',(req,res) =>{
    const contact = contacts.find(t => t.id == req.params.id)
    if(contact){
        
        contact.name = req.body.name;
        contact.num = req.body.num;
        contact.email = req.body.email;
    }
    res.redirect('/')
})

 // using a delete button

  app.post('/delete/:id/' ,(req,res)=>{
    const id = parseInt(req.params.id)
    contacts = contacts.filter(t => t.id !== id)
    res.redirect('/')
  })

  // using a seartch button 

  app.get('/', (req, res) => {
  let results = contacts;
  if(req.query.q) {
    const q = req.query.q.toLowerCase();
    results = contacts.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.num.includes(q) ||
      c.email.toLowerCase().includes(q)
    );
  }
  res.render('contact', { contacts: results });
});


app.get('/', (req,res) =>{
    res.render('contact',{contacts:contacts});
})

app.listen(3000,(req,res)=>{
    console.log('server is running ')
})

