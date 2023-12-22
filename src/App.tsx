import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";

import { ThemeProvider } from "@/providers/ThemeProvider";
import { HelpDeskRouter } from "@/router/App.routes";

const App = () => (
	<ThemeProvider defaultTheme='system' storageKey='nua_theme'>
		<BrowserRouter basename='/'>
			<HelpDeskRouter />
		</BrowserRouter>
		<Toaster richColors position='top-center' />
	</ThemeProvider>
);

export default App;
