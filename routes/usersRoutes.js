const express= require('express');
const { registerUser, loginUser, login2FA, refreshToken, TwoFAGenerate, validate, logoutUser, verifyCurrentUser, verifyAdmin, verifyModerator } = require('../controllers/usersControllers');
const ensureAuthenticated = require('../middleware/ensureAuthenticated');
const authorize = require('../middleware/authorize');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/login/2fa', login2FA);
router.post('/refresh-token', refreshToken);
router.get('/2fa/generate', ensureAuthenticated, TwoFAGenerate);
router.post('/2fa/validate',ensureAuthenticated, validate);
router.get('/logout',ensureAuthenticated, logoutUser);
router.get('/current',ensureAuthenticated, verifyCurrentUser);
router.get('/admin',ensureAuthenticated,authorize, verifyAdmin);
router.get('/moderator',ensureAuthenticated,authorize, verifyModerator);

module.exports = router;