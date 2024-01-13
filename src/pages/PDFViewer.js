import React, { useEffect, useRef } from "react";
import Layout from "components/layout/Layout";
import WebViewer from "@pdftron/webviewer";

const PDFViewer = () => {
	const viewerDiv = useRef(null);


	useEffect(() => {
		WebViewer({
			path: '/public',
			initialDoc: "/statement.pdf",
			licenseKey: "demo:1705106612291:7f6eb60903000000009980cbbe3fa4805a79f378f3a90724238516e2da"
		}, viewerDiv.current).then(instance => { });
	}, []);

	return (
		<Layout navLinks={[]}>
			<div className="container py-5">
				<h1>Create a new Financial Statement</h1>
				<div className="webviewer" ref={viewerDiv}></div>
			</div>
		</Layout>
	);
};

export default PDFViewer;
