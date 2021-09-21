const REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const get = async (endpoint: string, params: any = null) => {
	const url = new URL(`${REACT_APP_API_BASE_URL}${endpoint}`);
	const headers: any = {
		'Content-Type': 'application/json',
	};

	try {
		const response = await fetch(url.href, {
			method: 'GET',
			headers,
		});

		return await response.json();
	} catch (err) {
		console.error(err);
	}
};

export const post = async (endpoint: string, data: any, params?: any) => {
	let headers: any = {
		'Content-Type': 'application/json',
	};

	const url = new URL(`${REACT_APP_API_BASE_URL}${endpoint}`);

	if (params) {
		Object.keys(params).forEach((key) => {
			url.searchParams.append(key, params[key]);
		});
	}
	try {
		const response = await fetch(url.href, {
			method: 'POST',
			headers,
			body: data,
		});

		return await response.json();
	} catch (err) {
		console.error(err, '===asdasd');
	}
};

export const patch = async (endpoint: string, data: any) => {
	const url = new URL(`${REACT_APP_API_BASE_URL}${endpoint}`);

	try {
		const response = await fetch(url.href, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: data,
		});

		return await response.json();
	} catch (err) {
		console.error(err);
	}
};

export const deleteRequest = async (endpoint: string) => {
	const url = new URL(`${REACT_APP_API_BASE_URL}${endpoint}`);

	try {
		const response = await fetch(url.href, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		return await response.json();
	} catch (err) {
		console.error(err);
	}
};
