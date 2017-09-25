/**
 * Created by tsellers on 08/09/2017.
 */
({
    doInit: function(cmp, event, helper) {

        helper.getDetails(cmp);

    },
    register: function(cmp) {
        cmp.set("v.isProcessing", true);

        var urlEvent = $A.get("e.force:navigateToURL");
        var regStatus = cmp.get("v.registrationStatus");

        var clientId = cmp.get("v.client_id");
        var redirectURI = cmp.get("v.redirect_uri");
        var registrationHost = cmp.get("v.registration_server");

        var target = encodeURI("https://login.salesforce.com/services/oauth2/authorize?response_type=code&client_id="+clientId+ "&redirect_uri="+registrationHost+redirectURI);
        
        urlEvent.setParams({
            "url": target
        });

        urlEvent.fire();
        var xhttp = new XMLHttpRequest();
        var count = 0;
        var intervalId = setInterval(function() {

            var orgDetails = cmp.get("v.orgDetails");
            // call onto our Heroku app to get registration status
            var registrationHost = cmp.get("v.registration_server");
            xhttp.open("GET", registrationHost+"/status?org_id="+orgDetails.orgId, true);
            xhttp.send();
            // populate our registation status view
            xhttp.onreadystatechange = function() {

                if(this.readyState == 4 && this.status == 200) {
                    count++;
                    cmp.set("v.registrationStatus",JSON.parse(this.responseText));
                    var regStatus = cmp.get("v.registrationStatus");
                    if(regStatus.registered || count > 9) {
                        clearInterval(intervalId);
                        cmp.set("v.isProcessing", false);
                    }
                }
            }
        }, 1000);
    },
    deregister : function(cmp, event, helper) {
        helper.deregister(cmp)
    }
})