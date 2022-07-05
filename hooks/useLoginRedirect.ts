/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";

import { useAppSelector } from "@/hooks/useRedux";

export default function useLoginRedirect() {
  const router = useRouter();
  const { loginDetails }: any = useAppSelector((state) => state.loginDetails);

  useEffect(() => {
    if (
      loginDetails !== null &&
      loginDetails?.token !== null &&
      router.route === "/auth/login"
    ) {
      toast.info("You're already logged in");
      router.push("/delivery-details");
    }
  }, []);

  useEffect(() => {
    if (loginDetails === null && router.route === "/delivery-details") {
      toast.info("You need to log in");
      router.push("/auth/login");
    }
  }, []);
}
