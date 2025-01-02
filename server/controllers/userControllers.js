const User = require("../models/userModel");
const HttpError = require("../models/errorModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// FOR AVATAR CHANGE/FILE UPLOAD STUFF
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

// ======= REGISTER NEW USER
// POST: api/users/register
// UNPROTECTED
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, confirm_password } = req.body;
    if (!name || !email || !password) {
      return next(new HttpError("Fill in all fields.", 422));
    }

    const newEmail = email.toLowerCase();

    const emailExist = await User.findOne({ email: newEmail });
    if (emailExist) {
      return next(new HttpError("Email already exists.", 422));
    }

    if (password.trim().length < 6) {
      return next(
        new HttpError("Password should be at least 6 characters.", 422)
      );
    }

    if (password != confirm_password) {
      return next(new HttpError("Passwords do not match.", 422));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email: newEmail,
      password: hashedPassword,
    });

    res.status(201).json(`New User ${newUser.email} registered.`);
  } catch (error) {
    return next(new HttpError("User registeration failed.", 422));
  }
};

// ======= LOGIN A REGISTERED USER
// POST: api/users/login
// UNPROTECTED
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new HttpError("Fill in all fields.", 422));
    }

    const Email = email.toLowerCase();

    const user = await User.findOne({ email: Email });
    if (!user) {
      return next(new HttpError("Invalid credentials.", 422));
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return next(new HttpError("Invalid credentials.", 422));
    }

    const { _id: id, name } = user;

    // INSTALL JSON WEB TOKEN USING NPM INSTALL JSONWEBTOKEN
    const token = jwt.sign({ id, name }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ token, id, name });
  } catch (error) {
    return next(
      new HttpError("User Login failed. Please check your credentials.", 422)
    );
  }
};

// ======= USER PROFILE PATH
// POST: api/users/:id
// PROTECTED
const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");

    if (!user) {
      return next(new HttpError("User not found.", 404));
    }

    res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};

const changeAvatar = async (req, res, next) => {
  try {
    if (!req.files.avatar) {
      return next(
        new HttpError('Please upload a file with the "avatar" field.', 422)
      );
    }

    // Find user in the database
    const user = await User.findById(req.user.id);

    if (!user) {
      return next(new HttpError("User not found.", 404));
    }

    // Delete old avatar if it exists
    if (user.avatar) {
      fs.unlink(path.join(__dirname, "..", "uploads", user.avatar), (err) => {
        if (err) {
          return next(new HttpError(err));
        }
      });
    }

    const { avatar } = req.files;

    // Check file size
    if (avatar.size > 500000) {
      return next(
        new HttpError("Profile picture too big. Should be less than 500kb", 422)
      );
    }

    let fileName;
    fileName = avatar.name;

    let splittedFilename = fileName.split(".");
    let newFilename =
      splittedFilename[0] +
      uuid() +
      "." +
      splittedFilename[splittedFilename.length - 1];
    avatar.mv(
      path.join(__dirname, "..", "uploads", newFilename),
      async (err) => {
        if (err) {
          return next(new HttpError(err));
        }

        const updatedAvatar = await User.findByIdAndUpdate(
          req.user.id,
          { avatar: newFilename },
          { new: true }
        );
        if (!updatedAvatar) {
          return next(new HttpError(`Avatar couldn't be changed.`, 422));
        }

        res.status(200).json(updatedAvatar);
      }
    );

    // INSTALL PACKAGE USING 'NPM INSTALL EXPRESS-FILEUPLOAD'
    // INSTALL UUID USING NPM INSTALL UUID
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

// const changeAvatar = async (req, res, next) => {
//     try {
//     //    if(!req.files.avatar){
//     //     return next(new HttpError('Pls select an image.', 422))
//     //    }

//     if (!req.files || !req.files.avatar) {
//         return next(new HttpError('Please select an image.', 422));
//       }

//       const {avatar} = req.files;
//        //find user from DB
//        const user = await User.findById(req.user.id)

//        if (!user) {
//         return next(new HttpError('User not found.', 404));
//       }

//        //delete old avatar if exists
//        if (user.avatar) {
//         fs.unlink(path.join(__dirname, '..', 'uploads', user.avatar), (err)=> {
//             if(err){
//                 return next(new HttpError(err))
//             }
//         })
//        }

//        // CHECK FILE SIZE
//        if(avatar.size > 500000){
//         return next(new HttpError('Profile picture too big. Should be less than 500kb'), 422)
//        }

//        let fileName;
//        fileName = avatar.name;
//        let splittedFileName = fileName.split('.')
//        let newFileName = splittedFileName[0] + uuid() + '.' + splittedFileName[splittedFileName.length - 1]
//        avatar.mv(path.join(__dirname, '..', 'uploads', newFileName), async (err)=> {
//         if(err){
//             return next(new HttpError(err))
//         }

//         const updatedAvatar = await User.findByIdAndUpdate(req.user.id, {avatar: newFileName}, {new: true})
//         if (!updatedAvatar){
//             return next(new HttpError(`Avatar couldn't be changed.`, 422))
//         }

//         res.status(200).json(updatedAvatar)
//        })

//         
//     } catch (error) {
//         return next(new HttpError(error));
//     }
// }




// ======= EDIT USER DETAILS (FROM PROFILE)
// POST: api/users/edit-user
// PROTECTED
const editUser = async (req, res, next) => {
  try {
    const {name, email, currentPassword, newPassword, confirmNewPassword} = req.body
    if(!name || !email || !currentPassword || !newPassword) {
        return next (
            new HttpError("Fill in all fields.", 422)
        )
    }

    //GET USER FROM DB
    const user = await User.findById(req.user.id)
    if(!user){
        return next (
            new HttpError("User not found", 404)
        )
    }


    // MAKE SURE NEW EMAIL DOESN'T ALREADY EXIST
    const emailExist = await User.findOne({email});
    // WE WANT TO UPDATE OTHER DETAILS WITH/WITHOUT CHANGING THE MAIL (WHICH IS A UNIQUE ID BECAUSE WE USE IT TO LOGIN)
    if(emailExist && (emailExist._id != req.user.id)) {
        return next (
            new HttpError("Email already exists", 422)
        )
    }

    //COMPARE CURRENT PASSWORD TO DB PASSWORD
    const validateUserPassword = await bcrypt.compare(currentPassword, user.password);
    if(!validateUserPassword){
        return next (
            new HttpError("Invalid current password", 422)
        )
    }

    // COMPARE NEW PASSWORD
    if(newPassword !== confirmNewPassword){
        return next (
            new HttpError("New Pasword doesn't match", 422)
        )
    }

    //hash new password
    const salt = await bcrypt.genSalt(10)
    const Hash = await bcrypt.hash(newPassword, salt)

    //
    const newInfo = await User.findByIdAndUpdate(req.user.id, {name, email, password: Hash}, {new: true})

    res.status(200).json(newInfo);



  } catch (error) {
    return next(
      new HttpError(error)
    );
  }
};

// ======= GET USER
// POST: api/users/authors
// UNPROTECTED
const getAuthors = async (req, res, next) => {
  try {
    const authors = await User.find().select("-password");
    res.json(authors);
  } catch (error) {
    return next(new HttpError(error));
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  changeAvatar,
  editUser,
  getAuthors,
};
