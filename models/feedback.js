const feedback = require("../data/feedback.json");

const feedbackModel = {
    getFeedback: function (req, res) {
        if (feedback[req.params.course]) {
            if (feedback[req.params.course][req.params.kmom]) {
                return res.json({
                    data: feedback[req.params.course][req.params.kmom]
                });
            } else {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        detail: "Kmom was not found"
                    }
                });
            }
        } else {
            return res.status(500).json({
                errors: {
                    status: 500,
                    detail: "Course was not found"
                }
            });
        }
    }
};

module.exports = feedbackModel;
