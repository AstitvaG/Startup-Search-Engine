var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});
passport.use(
    new GoogleStrategy(
        {
            clientID: "122868526299-9lvnl131gjii2c1ri99neo2j4rq6tvip.apps.googleusercontent.com",
            clientSecret: "yHsATwJ7OyeHdss6YghHjN6s",
            callbackURL: "http://localhost:4000/auth/google/callback"
        },
        function (accessToken, refreshToken, profile, done) {
            var userData = {
                email: profile.emails[0].value,
                name: profile.displayName,
                picture: encodeURI(profile._json.picture),
                token: accessToken,
            };
            // console.log("Profile:",profile)
            done(null, userData);
        }
    )
);

