const adminUser = {}

adminUser.Admin = async (req, res, next) => {
    if (req.user.rol != 'admin') {
        return res
            .status(401)
            .json({
                ok: false,
                message: 'Unauthenticated',
                data: []
            })
    }

    next()
}

module.exports = adminUser;
