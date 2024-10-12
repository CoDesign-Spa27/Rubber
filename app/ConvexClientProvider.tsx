"use client";

import { store } from "@/store/store";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode } from "react";
import { Provider } from "react-redux";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return <ConvexProvider client={convex} >
    <Provider store={store}>
      
    {children}
    </Provider>
    </ConvexProvider>;
}