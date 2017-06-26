// See if the uploaded photo matches anything in the Kairos Gallery

// var website = require('./../server2');

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

                } else {
                    console.log(JSON.stringify(result, undefined, 2))
                }
                
    }
    
    )

.catch(function(err) { // Catch problems with this code
console.log(JSON.stringify(err, undefined, 2))

});
