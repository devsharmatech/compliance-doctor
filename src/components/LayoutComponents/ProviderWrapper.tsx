"use client";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "./NavBar";
import Footer from "./Footer";
import { authApi } from "@/store/api-services/auth-api";
import { useEffect, useRef } from "react";
import { OverlayLoader } from "../ui";
import { setAuth } from "@/store/slices/auth-slice";

export const ProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  const [useIngress, { isLoading }] = authApi.useIngressMutation();
  const { token, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const retryCount = useRef(0);
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 2000; // milliseconds

  useEffect(() => {
    if (token || isAuthenticated) return;

    const browser = navigator.userAgent;
    const isMobile = /Mobi|Android/i.test(browser);

    const fetchData = async () => {
      try {
         
        const payload = await useIngress({ browser, isMobile }).unwrap();
        dispatch(setAuth(payload));
      } catch (error) {
        console.error(`Ingress attempt ${retryCount.current + 1} failed`, error);
        if (retryCount.current < MAX_RETRIES) {
          retryCount.current += 1;
          setTimeout(fetchData, RETRY_DELAY);
        } else {
          console.error("Max retry attempts reached. Ingress failed.");
        }
      }
    };

    fetchData();
  }, [token, isAuthenticated, useIngress, dispatch]);

  if (isLoading) return <OverlayLoader />;

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};
