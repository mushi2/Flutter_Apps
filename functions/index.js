const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const braintree = require('braintree');

const gateway = new braintree.BraintreeGateway({
    environment: braintree.environment.Sandbox,
    merchantId: 'xgp6d5mzjh5qsvxr',
    publicKey: 'wdf24372c4v5b8gk',
    privateKey: 'e1890e177e650a218ae8e27e4b66bdc8'
});

exports.paypalPayment = functions.https.onRequest(async (req, res) => {
    const nonceFromTheClient = req.body.payment_method_nonce;
    const deviceData = req.body.device_data;

    gateway.transaction.sale({
        amount: '1000',
        paymentMethodNonce: 'fake-paypal-one-time-nonce',
        deviceData: deviceData,
        options:{
            submitForSettlement: true
        }
    }, (err, result) => {
        if(err != null){
            console.log(err);
        }else{
            res.json(
                {
                    result:'success'
                }
            );
        }
    }
    );
});