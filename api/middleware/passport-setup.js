const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../sequelize-models/User')


passport.serializeUser((user, done) => {
    done(null, user)
})
passport.deserializeUser((user, done) => {
    User.findByPk(id).then((user) => {
        done(null, user)
    })
        .catch((error) => done(error))
})

const getProfile = (profile) => {
    const { id, displayName, emails, provider } = profile
    if (emails && emails.length) {
        const email = emails[0].value
        return {
            google_id: id,
            name: displayName,
            email,
            provider
        }
    }
    return null
}

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.Client_Id,
            clientSecret: process.env.Client_Secret,
            callbackURL: "http://localhost:3000/googleAuth/google/callback"
        },


        //  Passport verify callback
        async (accessToken, refreshToken, profile, done) => {
            console.log("one", profile);
            try {
                console.log("two", profile.displayName);

                const existingGoogleUser = await User.findOne({
                    where: { google_id: profile.id }
                });
                console.log("three", existingGoogleUser);
                if (!existingGoogleUser) {
                    const existingEmailUser = await User.findOne({
                        where: { email: getProfile(profile).email }
                    });
                    // Create user if he is not registered already
                    if (!existingEmailUser) {
                        const newUser = await User.create(getProfile(profile));
                        return done(null, newUser);
                    }
                    return done(null, existingEmailUser);
                }
                return done(null, existingGoogleUser);
            } catch (e) {
                throw new Error(e);
            }
        }
    )
);