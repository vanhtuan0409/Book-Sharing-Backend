var passport = require('passport'),
FacebookStrategy = require('passport-facebook').Strategy;

function findById(id, fn) {
    User.findOne(id).then(function (user) {
        return fn(null, user);
    }).catch(function(error){
        return fn(error, null);
    });
}

function findByFacebookId(id, fn) {
  User.findOne({
    facebookId: id
}).then(function (user) {
    return fn(null, user);
}).catch(function(error){
    return fn(error, null);
});
}

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new FacebookStrategy({
  clientID: "868507116576768",
  clientSecret: "04136abb6b35ae4a8aa394cf0f4250ba",
  callbackURL: "http://localhost:1337/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'gender','emails', 'profileUrl', 'picture.type(large)', 'name', 'friends']
}, function (accessToken, refreshToken, profile, done) {
    findByFacebookId(profile.id, function (err, user) {
        if (!user) {
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                url: profile.photos[0].value,
                facebookId: profile.id
            })
            .then(function (user) {
                return done(null, user, {
                    message: 'Logged In Successfully'
                });
            }).catch(function(err){
                return done(err, null, {
                    message: 'There was an error logging you in with Facebook'
                });
            }); 
        } else {
            return done(null, user, {
                message: 'Logged In Successfully'
            });
        }
    });
}));