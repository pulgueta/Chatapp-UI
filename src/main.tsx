import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { Loading } from "@/pages/Loading";

import "./globals.css";

createRoot(document.getElementById("root") as HTMLDivElement).render(
	<StrictMode>
		<Suspense fallback={<Loading />}>
			<App />
		</Suspense>
	</StrictMode>
);
