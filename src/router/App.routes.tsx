import { PropsWithChildren, Suspense, lazy } from "react";

import { Navigate, Route, Routes } from "react-router-dom";

import { Loading } from "@/pages/Loading";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { PrivateRoute } from "@/components/PrivateRoute";

const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Tickets = lazy(() => import("@/pages/Tickets"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));

const LazyComponent = ({ children }: PropsWithChildren) => (
	<Suspense fallback={<Loading />}>{children}</Suspense>
);

export const HelpDeskRouter = () => {
	return (
		<>
			<div className='grid grid-cols-[100px_1fr] md:grid-cols-[200px_1fr] lg:grid-cols-[400px_1fr]'>
				<Sidebar />
				<Routes>
					<Route path='/' element={<Navigate to='/dashboard' />} />
					<Route
						path='/login'
						element={<LazyComponent children={<Login />} />}
					/>
					<Route
						path='/register'
						element={<LazyComponent children={<Register />} />}
					/>
					<Route
						path='/dashboard'
						element={
							<LazyComponent
								children={
									<PrivateRoute>
										<Dashboard />
									</PrivateRoute>
								}
							/>
						}
					/>
					<Route
						path='/dashboard/:id'
						element={
							<LazyComponent
								children={
									<PrivateRoute>
										<Tickets />
									</PrivateRoute>
								}
							/>
						}
					/>
					<Route path='*' element={<Navigate to='/dashboard' />} />
				</Routes>
			</div>
		</>
	);
};
