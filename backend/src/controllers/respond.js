const respondError = (res, error) => {
    console.log(error);
    res.status(500).json({
        ok: false,
        error: 'Internal Server Error',
        data: []
    })
}

module.exports = respondError;