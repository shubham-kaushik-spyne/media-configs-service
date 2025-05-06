const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
  notificationType: {
    required: true,
    type: String
  },
  from: {
    required: true,
    type: String
  },
  to: {
    required: true,
    type: String
  },
  cc: {
    type: [String], 
    required: false
  }
}, { timestamps: true });


/* {
---------- email notification schema ----------------
1. enterpriseCreation
{
notificationType: "enterpriseCreation",
from: "spyneOwner",
to: ["enterpriseOwner"],
cc: []
}

2. sendContractNotification
{
notificationType: "sendContractNotification",
from: "spyneOwner",
to: ["enterpriseOwner"],
cc: ["All the emails in the CC"]
}

3. raiseException
{
notificationType: "raiseException",
from: "spyneOwner",
to: ["spyneFinanceTeam", "spyneLegalTeam", "ankit.khandelwal@spyne.ai"],
cc: [""]  
}

4. contractRejection
{
notificationType: "contractRejection",
from:"spyneFinanceTeam",
to:["creatorOfContract"],
cc:[""]
}

5. stageChangeNotification
{
notificationType: "stageChangeNotification",
from: "spyneOwner",
To: ["spyneFinanceTeam", "spyneSalesTeam"]
}

6. contractClosedNotification
{
notificationType: "contractClosedNotification",
from: "spyneOwner",
to: ["spyneOnboardingTeam","spyneCustomerSuccessTeam","spyneSalesTeam"]
}
---------- email notification schema ----------------





---------- team emails ------------------------------
{
spyneOwner:"email@spyne.ai",
spyneFinanceTeam: ["Array of emails of finance team"],
spyneOnboardingTeam: ["Array of emails of Onboarding team"],
spyneCustomerSuccessTeam: ["Array of emails of CS team"],
spyneSalesTeam: ["Array of emails of sales team"],
}
---------- team emails ------------------------------




---------- ENUM FOR THE EMAIL OWNERS ----------------
{

spyneOwner: "email.spyne.ai",
spyneFinanceTeam: ["array of email ID's for finance team"],
spyneOnboardingTeam: ["array of email ID's for onboarding team"],
spyneCustomerSuccessTeam: ["array of email ID's for Customer SuccessTeam team"],
spyneSalesTeam: ["array of email ID's for Spyne sales team"]
creatorOfContract: "Fetch the contract creator data from the API"  (REQUIRED AT ONE PLACE ONLY)
enterpriseOwner: "Get the enterprise owner details using the enterpriseId "
ccOfEnterprise: "Get all the CC emails for the particular enterprise."

}
---------- ENUM FOR THE EMAIL OWNERS ----------------


*/