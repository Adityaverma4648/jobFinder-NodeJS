const chance = require('chance')
const obj  = new chance();
const apiRoutes = require('../routes/apiRoutes')

var dataLength = 500;

function dataGenerator(dataLength){
    var array = [];
   
    const skillStack = ['']

   

    for (var i = 0; i < dataLength; i++) {

         function skillGetter(){
            const array = [['Node JS','React JS','Mongo DB','Express JS'],['PHP','Laravel'],['HTML','CSS','JS'],['Flask','Angular JS'],['Photoshop','illustrator','AfterEffects']]
              var randomIndex = Math.random()*array.length;
             return array[randomIndex];
          }

          var object = {
              id : i+1,
              stipend : obj.integer({ min: 5000, max: 45000 }),
              email : obj.email({domain: 'email.com'}),
              companyName : obj.company(),
              address : obj.address({short_suffix: true}),
              jobType : obj.profession(),
              description :    obj.paragraph(),
              duration : obj.integer({min:3,max:12}),
              skillsReq :  skillGetter()
            }
          array.push(object)
    }
  return array;
}

const data = dataGenerator(dataLength);

module.exports = data;