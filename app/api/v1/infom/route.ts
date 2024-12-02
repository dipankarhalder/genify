import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { dbConnect } from "@/config/db";
import Users from "@/models/Users";
import { verifyToken } from "@/lib/validateToken";

export async function GET() {
    try {
      /* call or caching database connection */
      await dbConnect();

      const tokenCookies = await cookies();
      const getToken = tokenCookies.get("token");

      if (getToken) {
        /* verifing the token */
        const validatedToken = await verifyToken(getToken.value);
  
        if ('success' in validatedToken && !validatedToken.success) {
          /* if token is expired or invalid */
          return NextResponse.json(
            {
              success: false,
              message: validatedToken.message,
            },
            { status: 401 }
          );
        }
      } else {
        /* if the token is not found */
        return NextResponse.json(
          {
            success: false,
            message: 'The user token is not found. Please login again.',
          },
          { status: 401 }
        );
      }

      let user_list = await Users.find();
      return NextResponse.json(
        {
          success: true,
          user_id: user_list
        },
        { status: 200 }
      );
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