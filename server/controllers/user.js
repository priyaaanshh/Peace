import User from "../models/user.js";

// READ operation to fetch all users
export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        next(error);
    }
};

// READ operation to fetch a single user by ID
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
};

// UPDATE operation
export const updateUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
};

export const addEmptyAnswer = async (req, res, next) => {
    try {
        const user = await User.findById(req.body.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.answer.push([0, 0, 0, 0]);
        await user.save();

        return res.status(201).json({ lastIndexOfAnswerArray: user.answer.length - 1 });
    } catch (error) {
        next(error);
    }
};

export const updateAnswer = async (req, res, next) => {
    try {
        const user = await User.findById(req.body.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const { arrayIndex, zeroIndex } = req.body;
        if (
            arrayIndex >= 0 &&
            arrayIndex < user.answer.length &&
            zeroIndex >= 0 &&
            zeroIndex < user.answer[arrayIndex].length
        ) {
            await User.updateOne(
                { _id: user._id, "answer": { $elemMatch: { $exists: true } } },
                { $inc: { [`answer.${arrayIndex}.${zeroIndex}`]: 1 } }
            );
            return res.status(200).json({ message: 'Updated' });
        } else {
            return res.status(404).json({ message: 'Invalid array index' });
        }
        return user;
    } catch (error) {
        next(error);
    }
};


export const addAppointmentWithDoctor = async (req, res, next) => {
    try {
        const user = await User.findById(req.body.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.appointments.push({ doctor: req.body.doctor, date: req.body.date });
        await user.save();


        return res.status(201).json({ message: "Booked Appointment" });
    } catch (error) {
        next(error);
    }
};

// DELETE operation
export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
};

export const getTotalUserCount = async (req, res, next) => {
    try {
        const count = await User.countDocuments({});
        res.json({ count });
    } catch (error) {
        next(error);
    }
};

export const getCurrentMonthNewUserCount = async (req, res, next) => {
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    try {
        const count = await User.countDocuments({
            createdAt: {
                $gte: startOfMonth,         // gte :: greater than or equal to
                $lte: currentDate            //lte :: less than or equal to
            }
        });
        res.json({ count });
    } catch (error) {
        next(error);
    }
};
