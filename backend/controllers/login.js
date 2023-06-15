const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const Users = require('../models/users');

module.exports = {
    

    loginUser: async (req, res) => {

        
        

        try {
            const user = await Users.findOne({ email: req.body.email });

            if (!user) {
                return res.status(400).json({ error: 'Invalid credentials'});
            }

            const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

            if (!isPasswordValid) {
                return res.status(400).json({ error: 'Invalid credentials'});
            }

            const token = jwt.sign(
                { userId: user._id, email: user.email}, process.env.TOKEN_SECRET,{expiresIn: '1h'}
            );

            res.status(200).json({token});
        } catch (error) {

            res.status(500).json({ error: 'Internal server error' });
            
        }



        
    }

  
}