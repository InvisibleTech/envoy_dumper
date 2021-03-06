const express = require('express');
const { middleware, errorMiddleware } = require('@envoy/envoy-integrations-sdk');

const app = express();
app.use(middleware());
app.use(errorMiddleware());

app.post('/dump_payload', async (req, res) => {
    const envoy = req.envoy; // our middleware adds an "envoy" object to req.
    console.log(">>>>>>>>>>>>>>>>  Envoy :");
    console.log(JSON.stringify(envoy));
    console.log(">>>>>>>>>>>>>>>>  Envoy payload:");
    console.log(JSON.stringify(envoy.payload));
    console.log(">>>>>>>>>>>>>>>>  Envoy meta ");
    console.log(JSON.stringify(envoy.meta));

    res.send({"msg": "Dumped"});
});

app.get('/alive', (req, res) => {
    res.send({'status': 'I am alive'});
});

const listener = app.listen(process.env.PORT || 0, () => {
  console.log(`Listening on port ${listener.address().port}`);
});