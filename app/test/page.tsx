"use client";

import { SignJWT, jwtVerify } from "jose";
import React from "react";

export default function Test() {
  const token = async () => {
    const t = await new SignJWT({
      username: "uhuyyyy",
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("30s")
      .sign(new TextEncoder().encode("dimas12"));
    console.log(t);
  };

  const verify = async () => {
    const token =
      "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InVodXl5eXkiLCJpYXQiOjE3MDg2NjA2NjIsImV4cCI6MTcwODY2MDY5Mn0._drO_LN0GldqQ1Ttlb6e__lsH6uk2Ni6pokDjsheLVo";
    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode("dimas12")
      );
      console.log(payload);
      return payload;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return (
    <div>
      <button onClick={token}>Token</button>
      <button onClick={verify}>verify</button>
    </div>
  );
}
