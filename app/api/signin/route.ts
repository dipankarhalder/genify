import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { dbConnect } from "@/config/db";
import { UserRequestBody } from "@/interface";
import { expireTimer } from "@/utils";
import Users from "@/models/Users";

const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) {
  throw new Error("Please define the JWT_SECRET environment variable");
};

/* Super User login */
export async function POST(req: Request) {
  try {
    /* call or caching database connection */
    await dbConnect();

    /* get the info from request body */
    const body: UserRequestBody = await req.json();
    const { email, password } = body;

    /* validate the email is exist or not */
    let user: any = await Users.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: `Email ${email} is not associated with any account, Please enter correct email.`
        },
        { status: 400 }
      );
    }

    /* validating the password */
    const valid_password = await bcrypt.compare(password, user?.password);
    if (!valid_password) {
      return NextResponse.json(
        {
          success: false,
          message: 'Sorry! You have entered wrong password. Please try again.'
        }, { status: 400 }
      );
    }

    /* generate jwt token */
    const payload = {
      id: user._id,
      user_id: user.user_id,
      role: user.role
    };
    const token = jwt.sign(payload, JWT_SECRET, expireTimer);

    return NextResponse.json(
      {
        success: true,
        data: {
          token,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch users."
      },
      { status: 500 }
    );
  }
}