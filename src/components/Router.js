import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "pages/LoginPage";
import RegisterPage from "pages/RegisterPage";
import AuthRoute from "components/auth/AuthRoute";
import Dashboard from "pages/Dashboard";
import ResetPasswordPage from "pages/ResetPasswordPage";
import VerifyEmailPage from "pages/VerifyEmailPage";
// import ProfilePage from "pages/ProfilePage";
import RefreshLoginModal from "components/auth/RefreshLoginModal";
import DocumentRequest from "pages/DocumentRequest";

const Router = () => (
	<BrowserRouter>
		<RefreshLoginModal />
		<Routes>
			<Route path="/auth/resetpassword/:token" component={ResetPasswordPage} />
			<Route path="/auth/resetpassword" component={ResetPasswordPage} />
			<Route path="/verify/email/:token" component={VerifyEmailPage} />
			<Route path="/login" component={LoginPage} />
			<Route path="*/register" component={RegisterPage} />
			{/* <AuthRoute path="/profile" component={ProfilePage} /> */}
			<Route path="/documentrequest" component={DocumentRequest} />
			<AuthRoute path="/" component={Dashboard} allowUnverified />
		</Routes>
	</BrowserRouter>
);

export default Router;
