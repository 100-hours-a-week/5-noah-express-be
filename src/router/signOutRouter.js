const express = require('express');

const router = express.Router();

router.delete('/', (request, response) => {
    if (request.session.userId) {
        request.session.destroy(() => {
            console.log('세션 삭제');

            response.sendStatus(200);
        });
    } else {
        response.sendStatus(200);
    }
});

module.exports = router;
