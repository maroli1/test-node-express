function validateUserId(req, res, next) {
    const userId = Number(req.params.id);
    if (isNaN(userId) || userId <= 0) {
        return res.status(400).json({ error: "ایدی نامعتبر اید بزرگتر از صفر باشد" });
    }
    next();
}

function validateEmail(req, res, next) {
    const email = req.body.email;
    if (!email || typeof email !== "string" || !email.includes("@")) {
        return res.status(400).json({ error: "ایمیل نامعتبر است" });
    }
    next();
}

module.exports = { validateUserId, validateEmail };