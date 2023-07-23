import React from "react";

export default function WorkUpdate({ update }) {
	if (update?.length === 0) {
		return <div></div>;
	}

	return (
		<div>
			<p>Next Steps:</p>

			{update?.length > 0 && (
				<ul>
					{update?.map((update) => {
						return <li>{update}</li>;
					})}
				</ul>
			)}
		</div>
	);
}
