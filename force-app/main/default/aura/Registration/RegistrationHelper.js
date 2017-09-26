/**
 * Created by tsellers on 09/09/2017.
 */
({
    getDetails : function(cmp) {
        
        var action = cmp.get("c.getOrgDetails");

        action.setCallback(this, function(response) {

            if(response.getState() === "SUCCESS") {

                var orgDetails = JSON.parse(response.getReturnValue());
                console.log(`~~ ${JSON.stringify(orgDetails)}`);
                cmp.set("v.orgDetails", orgDetails);
                var xhttp = new XMLHttpRequest();
                var registrationHost = cmp.get("v.registration_server");
                // call onto our Heroku app to get registration status
                xhttp.open("GET", registrationHost+"/status?org_id="+orgDetails.orgId, true);
                xhttp.send();
                // populate our registation status view
                xhttp.onreadystatechange = function() {
                    if(this.readyState == 4 && this.status == 200) {
                        cmp.set("v.registrationStatus",JSON.parse(this.responseText));
                    }
                }
            } else {
                console.log('Our response wasnt a success :( ...'+response.getState());
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }

            }
        });
        $A.enqueueAction(action);
    },
    deregister : function (cmp) {
        var orgDetails = cmp.get("v.orgDetails");
        var xhttp = new XMLHttpRequest();
        var registrationHost = cmp.get("v.registration_server");
        // call onto our Heroku app to get registration status
        xhttp.open("GET", registrationHost+"/ct/deregister?org_id="+orgDetails.orgId, true);
        xhttp.send();
        xhttp.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200) {
                cmp.set("v.registrationStatus",JSON.parse(this.responseText));
            }
        }
    }

})