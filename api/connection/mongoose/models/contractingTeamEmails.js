const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  spyneOwner:{
    type: String,
    required: true
  },
  spyneSupportTeam:{
    type:String,
    required: true
  },
  spyneFinanceTeam:{
    type: [String],
    required: true
  },
  spyneSalesTeam:{
    type:[String],
    required: true
  },
  spyneOnboardingTeam:{
    type: [String],
    required: true
  },
  spyneCustomerSuccessTeam:{
    type:[String],
    required: true
  },
  spyneFinanceTeam:{
    type:[String],
    required:true
  },
  spyneLegalTeam:{
    type:[String],
    required:true
  }
}, { timestamps: true });
