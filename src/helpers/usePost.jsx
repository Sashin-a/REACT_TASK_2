// export default useFetch;
import { useState, useEffect } from 'react';

export function usePost(uri, payload) {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState();
	const [error, setError] = useState();

	useEffect(() => {
		if (!uri) return;
		fetch(`http://localhost:4000/${uri}`, {
			method: 'POST',
			body: JSON.stringify(payload),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((data) => data.json())
			.then(setData)
			.then(() => setLoading(false))
			.catch(setError);
	}, [uri, payload]);
	return { loading, data, error };
}
