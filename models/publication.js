const {
    Shema,
    model
} = require("mongoose");

const PublicationsShema = Shema({
    user: {
        type: Shema.objectId,
        ref: "user"
    },
    text: {
        type: String,
        required: true
    },
    file: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now
    }

})

module.exports = model("Publications", PublicationsShema, "Publications");