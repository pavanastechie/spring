define([
    'app/signin/models/credentials'
    ,'app/signin/authentication-ds'
], function(Credential, authenticationService) {

    var test401Response = {
        status: 401,
        responseText: '{"mailbox":"","password":"","success":false,"redirectUrl":"","message":"Invalid mailbox or password."}'
    };

    var authService;

    describe("Authentication Data Service Tests", function() {
        beforeEach(function() {
            authService = authenticationService;
            this.credential = new Credential();
            this.credential.set('mailbox', "test@domain");
            this.credential.set('password', "password");

            this.server = sinon.fakeServer.create();
        });

        afterEach(function() {
            this.server.restore();
        });

        it("should process HTTP 401 on bad credentials and return JSON to callback", function() {
            // Set how the fake server will respond
            // This reads: a POST request for /ajax/authenticate
            // will return a 401 response of type
            // application/json with the given JSON response body
            this.server.respondWith("POST", WEBMAIL.contextPath +"ajax/authenticate",[
                test401Response.status, {"Content-Type" : "application/json"},
                test401Response.responseText
            ]);

            var callback = sinon.spy();

            authService.authenticate(this.credential, callback);
            this.server.respond();
            expect(callback.called).toBeTruthy();
        });


    });
});