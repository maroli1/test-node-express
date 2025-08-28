function validateUserId(req, res, next) {
    const userId = Number(req.params.id);
    if (isNaN(userId) || userId <= 0) {
        return res.status(400).json({ error: "ایدی نامعتبر اید بزرگتر از صفر باشد" });
    }
    next();
}
module.exports = validateUserId;