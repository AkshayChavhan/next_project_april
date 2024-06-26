import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helper/mailer";



connect();

// http://localhost:3001/api/users/signup
// Method:- POST
// {
//     "username":"akshay",
//     "password":"12345",
//     "email":"akshay@gmail.com"
// }
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        // validation part remaining for email and password

        const { username, email, password } = reqBody;
        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json({
                error: "User already exists"
            }, { status: 400 })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = await new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save();
        console.log("savedUser => ", savedUser);

        // send verification mail
        await sendEmail({ email , emailType:"VERIFY", userId:savedUser._id})

        return NextResponse.json({
            message: "User Registered Successfully.",
            success: true,
            savedUser
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}


