import axios from "axios";

const pay = async (data) => {
	const key =
		"sk_test_51MzPn6ECpT6ND4zo8vk7nXcJnuRCvoYpJ8bf5ct1rvBWXzFFUVNbeLl8G0azQyNskSblztUOuq7ioGDBcZPOOyjW00tbE0q4fG";
	return await axios.post("http://localhost:5005/stripe/payment", data, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${key}`,
		},
	});
};

export default { pay };
