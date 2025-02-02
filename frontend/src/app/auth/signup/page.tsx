"use client";

import { Suspense } from "react";
import RegisterForm from "@/components/auth/RegisterForm";
import AlertMiddleware from "@/components/auth/alertMiddleware";

function SignupPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <AlertMiddleware />
        <RegisterForm />
      </div>
    </Suspense>
  );
}

export default SignupPage;
