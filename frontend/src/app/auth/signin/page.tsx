"use client";

import { Suspense } from "react";
import LoginForm from "@/components/auth/LoginForm";
import AlertMiddleware from "@/components/auth/alertMiddleware";

function SigninPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <AlertMiddleware />
        <LoginForm />
      </div>
    </Suspense>
  );
}

export default SigninPage;
