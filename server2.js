// Setup the server
const express = require('express'); // require the Express Server module
const port = process.env.PORT || 3000; // Use Heroku port or local port 3000
var app = express();
app.use(express.static(__dirname + '/public')); // this middleware sets up the server for us!\


var getKairos = (callback) => {

// *** KAIROS See if the uploaded photo matches anything in the Kairos Gallery
var Kairos = require('kairos-api'); // Load this in from NPM
var client = new Kairos('89b85235', '7afdc8672469bc634354e561d61f7491'); // My user ID and Key

var results = {};
var params = {
//app_id: '89b85235',
//app_key: '7afdc8672469bc634354e561d61f7491',
gallery_name: 'gallerytest2',
image: 'http://www.cavoom.com/file-upload/uploads/temp.jpg'

};

client.recognize(params) // Detect if there are faces in the photo
.then(function(result) // When the result comes back, perform some logic
    {
        //console.log({result});
        if(!!result.body.images[0].transaction.confidence){
            
            results = {result};
            console.log('Confidence level: ', (result.body.images[0].transaction.confidence * 100).toFixed(1),'%');
            //console.log(result.body.images[0].transaction)
            //console.log(JSON.stringify(result, undefined, 2))
                callback(result)
                } else {
                    console.log(JSON.stringify(result, undefined, 2))
                    callback(result)
                }
                
    }
    
    )

.catch(function(err) { // Catch problems with this code
console.log(JSON.stringify(err, undefined, 2))

});
// ********** END KAIROS  ***********  

};

// Now call getKairos Results and spin up the server
getKairos ((theBigResult)=> {
console.log('spinning up the servers');
var stuff = theBigResult.body.images[0].transaction;
var subject = theBigResult.body.images[0].transaction.subject_id;
// New Home Page with Template
app.get('/', (req, res) => {
    res.send(subject);
    // Must wrap {stuff} in curly brackets when sending for print to web??
    // Not sure why

   });
    

// Start Listening
app.listen(port,()=>{
    console.log('The server is now up and running on port: ',port);
}); // Port 3000 is a good port for local development - starts the listeer on port 3000

})