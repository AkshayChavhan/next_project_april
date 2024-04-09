import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helper/mailer";


connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token } = reqBody;
        console.log("token => ", token);

        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } })
        if (!user) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 })
        }
        console.log("user => ", user);
        user.isVerified = true
        user.verifyToken = null
        user.verifyTokenExpiry = null
        await user.save();
        return NextResponse.json({
            message: "Email verified successfully.",
            success: true
        }, { status: 500 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}