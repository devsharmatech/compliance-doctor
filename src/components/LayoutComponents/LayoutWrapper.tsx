"use client"
import { RootState, Store } from "@/store/store";
import { Provider, useSelector } from "react-redux";
import { Navbar } from "./NavBar";
import Footer from "./Footer";
import { authApi } from "@/store/api-services/auth-api";
import { useEffect } from "react";
import { ProviderWrapper } from "./ProviderWrapper";

export const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {

  return (
    <div className="flex flex-col min-h-screen">
        <Provider store={Store}>
            <main className="flex-grow">
                <ProviderWrapper>
                    {children}
                </ProviderWrapper>
            </main>
        </Provider>
    </div>
  );
}