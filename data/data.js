const chance = require('chance')
const obj  = new chance();
const apiRoutes = require('../routes/apiRoutes')

var dataLength = 500;

function dataGenerator(dataLength){
    var array = [];
    for (var i = 0; i < dataLength; i++) {
            const categoryFetcher = (i)=>{
                  return i%2?'Work From Home':'Office';
            } 
            const jobTimingFetcher = (i)=>{
              return i%2?'Full':'Part';
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
              seats : obj.integer({min:1,max:15}),
              jobCategory : categoryFetcher(i),
              jobTimingFetcher : jobTimingFetcher(i)
            }
          array.push(object)
}
return array;

}

const data = dataGenerator(dataLength);

module.exports = data;