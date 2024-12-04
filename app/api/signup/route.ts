import bcrypt from 'bcryptjs';
import { NextResponse } from "next/server";

import { dbConnect } from "@/config/db";
import { UserRequestBody } from "@/interface";
import Users from "@/models/Users";

/* Super User Registration */
export async function POST(req: Request) {
  try {
    /* call or caching database connection */
    await dbConnect();

    /* get the info from request body */
    const body: UserRequestBody = await req.json();
    const { first_name, last_name, email, phone, password } = body;

    /* validate the existing user using email */
    const user_exist = await Users.findOne({ email });
    if (user_exist) {
      return NextResponse.json(
        {
          success: false,
          message: `Email ${email} already associated with another user.`
        },
        { status: 400 }
      );
    }

    /* validate the existing user using phone */
    const existing_phone = await Users.findOne({ phone });
    if (existing_phone) {
      return NextResponse.json(
        {
          success: false,
          message: `Phone no. ${phone} already associated with another user.`
        },
        { status: 400 }
      );
    }

    /* generate the user id brfore store information */
    const userIdCreate = `${first_name.substring(0, 2).toUpperCase()}-${phone.toString().slice(-4)}`;

    /* hashing password brfore store information */
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    /* save new user information */
    const new_user = new Users({
      first_name,
      last_name,
      email,
      phone,
      user_id: userIdCreate,
      password: hashedPassword
    });
    await new_user.save();

    return NextResponse.json(
      {
        success: true,
        user_id: userIdCreate,
        message: `User successfully created.`
      },
      { status: 200 }
    );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch the resource."
      },
      { status: 500 }
    );
  }
}