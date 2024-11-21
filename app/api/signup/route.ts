import bcrypt from 'bcryptjs';
import { NextResponse } from "next/server";

import { dbConnect } from "@/config/db";
import { UserRequestBody } from "@/interface";
import { user_role } from "@/config/constant";
import Users from "@/models/Users";

/* Super User Registration */
export async function POST(req: Request) {
  try {
    /* call or caching database connection */
    await dbConnect();

    /* get the info from request body */
    const body: UserRequestBody = await req.json();
    const { first_name, last_name, email, phone, role, password } = body;

    /* validate the user role */
    if (role !== user_role.super) {
      return NextResponse.json(
        {
          success: false,
          message: `Sorry! we are not allow you to create the user`
        },
        { status: 400 }
      );
    }

    /* validate the existing user using email */
    let user_exist = await Users.findOne({ email });
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
    let existing_phone = await Users.findOne({ phone });
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
    const userIdCreate = `${role.substring(0, 2)}-${first_name.substring(0, 2).toUpperCase()}-${phone.toString().slice(-4)}`;

    /* hashing password brfore store information */
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    /* save new user information */
    const new_user = new Users({
      first_name,
      last_name,
      email,
      phone,
      role,
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