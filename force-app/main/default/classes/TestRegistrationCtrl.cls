/**
 * Created by tsellers on 11/09/2017.
 * update for SFDX 
 */

@IsTest
private class TestRegistrationCtrl {
    static testMethod void testCtrl() {

        RegistrationCtrl.OrgDetails orgDetails = (RegistrationCtrl.OrgDetails)JSON.deserialize(RegistrationCtrl.getOrgDetails(), RegistrationCtrl.OrgDetails.class);
        System.assert(UserInfo.getOrganizationId() == orgDetails.orgId);
    }
}