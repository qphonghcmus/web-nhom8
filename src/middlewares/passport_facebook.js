var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
const userModel = require('../models/user.model');

module.exports = function (app) {
    app.use(passport.initialize());
    app.use(passport.session());

    var fs = new FacebookStrategy({
        clientID: "672764693183159",
        clientSecret: "9d6ec0cecf7627b6b920459438e39a9a",
        callbackURL: "http://localhost:5000/login/fb/cb",
        profileFields: ['displayName', 'email'],
    }, (accessToken, refreshToken, profile, done) => {
        userModel.singleByEmail(profile._json.email)
            .then(docs => {
                if (docs.length == 0) {
                    var endDate = new Date();
                    var startDate = new Date();
                    var numberOfDaysToAdd = 7;
                    endDate.setDate(endDate.getDate() + numberOfDaysToAdd);
                    var entity = {
                        hoTen: profile._json.name,
                        email: profile._json.email,
                        NgayDK: startDate,
                        NgayHetHan: endDate,
                        NgayHetHan_Temp: endDate,
                        confirmed: true,
                        permission: 0
                    }
                    userModel.add(entity)
                        .then(rows => {
                            var user = rows;
                            return done(null, user);
                        })
                        .catch(e => {
                            return done(e);
                        })
                }
                else {
                    var user = docs[0];
                    return done(null, user);
                }
            })
            .catch(err => {
                return done(err);
            })
    });

    passport.use(fs);

    passport.serializeUser((user, done) => {
        return done(null, user);
    });

    passport.deserializeUser((user, done) => {
        return done(null, user);
    });
}