const mongoose = require('mongoose');
const glob = require( 'glob' );
const path = require( 'path' );


//const url =  sails.config.datastores.default.mongoUrl+"?ssl=true&authSource=admin";
const url =  sails.config.datastores.default.mongoUrl;
// &replicaSet="+ sails.config.datastores.default.replicaSet;
mongoose.pluralize(null);

let globOptions = {
  cwd: './api/connection/mongoose/models'
};


glob.sync( '*.js' , globOptions).forEach( ( file ) => {
  let model = file.slice(0, -3);
  let modelPath = path.resolve(globOptions.cwd, file);
  sails.log('Registering model `'+ model +'` in Mongoose');
  global[model] = require(modelPath);
  global[model] = mongoose.model(model.charAt(0).toLowerCase() + model.slice(1), require(modelPath));
});


(async () => {
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  global['mongoose'] = mongoose;
  sails.mongoose = mongoose;
  // await captureMediaChangeStream();
})().catch(err => {
  sails.log(err);
});


