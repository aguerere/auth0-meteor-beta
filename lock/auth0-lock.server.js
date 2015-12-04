// Write your package code here!
if (Meteor.isServer) {
    Meteor.startup(function () {
    });

    // Register the Auth0 login handler for Meteor
    Accounts.registerLoginHandler(function (options) {
        if (!options.auth0)
            return undefined; // Do not handle

        if (!_.contains(Accounts.oauth.serviceNames(), 'auth0')) {
            return {
                type : "auth0",
                error: new Meteor.Error(
                    Accounts.LoginCancelledError.numericError,
                    "No registered oauth service found for: Auth0")
            }
        }

        // Do nothing if the profile is not received
        if (!options.auth0.profile || !options.auth0.profile.user_id)
            return null;

        // Accounts.updateOrCreateUserFromExternalService expects the unique user id
        // to be stored in the 'id' property of serviceData
        options.auth0.profile.id = options.auth0.profile.user_id;


        return Accounts.updateOrCreateUserFromExternalService("auth0", options.auth0.profile, options.auth0.token);
    });

    Accounts.addAutopublishFields({
        forLoggedInUser: ['services.auth0'],
        forOtherUsers: [
            'services.auth0.id', 'services.auth0.name'
        ]
    });

    Meteor.methods({
        'getAuth0Attributes': function () {
            return {
                AUTH0_CLIENTID: process.env.AUTH0_CLIENTID,
                AUTH0_DOMAIN  : process.env.AUTH0_DOMAIN
            };
        }
    });
}
