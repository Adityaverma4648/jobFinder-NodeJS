require("dotenv").config();
const express = require('express');
const hbs = require('hbs');
const path =  require('path');

// express instance
const app = express();
// DB connect 
const connectDB = require("./config/connect");
// PORT decision
const PORT = process.env.PORT||5000;


//  path to static directory-----------------------------------------------------------------------------------------------------------------------------------------
// const staticPath  = path.join(__dirname, './public');

//  serving static files using built in middleware;
          // app.use(express.static(staticPath));
// -------------------------------------------------------------------------------------------------------------------------------------------------



//  handle bars template engine - dynamic sites are served.............................. --------------------------------------------------------------------------------
//   engine set to hbs it may be pug,handlebars
app.set('view engine','hbs');

//  rendering partials - compoenents in node js 
const partials = path.join(__dirname,'./views/partials');
hbs.registerPartials(partials);

//  block ends here-----------------------------------------------------------------------------
const jsn = [{id:1,name:"Aditya verma"},{id:2,name:"name2"}]

app.get("/",(req,res)=>{
    res.render('index.hbs')
})

// app.use('/api',apiRoutes);



const start = async ()=>{
   try {
       await connectDB(process.env.MONGODB_URI);
      app.listen(PORT,console.log(`SERVER STARTED AT ${PORT}`));
   } catch (error) {
       console.log(`Connection failed : ${error}`)
   }

}
start();


