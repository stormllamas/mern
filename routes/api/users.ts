import User from "../../models/User";
import { Router } from "express";
import gravatar from "gravatar";
import bcrypt from "bcryptjs";
import { check, validationResult } from "express-validator";

const router = Router();

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req: any, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        res.status(400).json({ errors: [{ msg: "User already exists" }] });
        return;
      }

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      user.save();

      res.send("User route");
    } catch (error: unknown) {
      console.error(error);
      res.status(500).send("Server error");
    }
  }
);

export default router;
