/**
 * Created by tsellers on 09/09/2017.
 * Update for SFDX
 */

public with sharing class RegistrationCtrl {

    @AuraEnabled
    public static String getOrgDetails() {

        OrgDetails od = new OrgDetails();
        od.orgId = UserInfo.getOrganizationId();

        return JSON.serialize(od);
    }

    public class OrgDetails {
        @AuraEnabled
        public String orgId {get; set;}

    }
}