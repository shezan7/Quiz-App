exports.checkUser = (access) => {
    return roleValid = async (req, res, next) => {
        // console.log("one", access)
        if (req.user.access) {
            // console.log("two", req.user)
            if (req.user.access.findIndex(element => element === access) === -1) {
                // console.log("three", req.user.access)
                res.status(401).json({
                    status: "Failed",
                    message: "Unauthorized! You have no access"
                })
            }
            else {
                // console.log("four", req.user.access)
                return next();
            }
        }
        else {
            res.status(401).json({
                status: "Failed",
                message: "Not Permitted!!"
            })
        }
    }
}