import { openai } from '@/utils/openai';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const data = req.body;
		if (!data) {
			res.status(400).json({ error: 'Body is missing' });
			return;
		}
		if (!data.input) {
			res.status(400).json({ error: 'Data is missing' });
			return;
		}

		var text = `Create product description for a mug that cannot spill the water.`;
		
		try {
			const aires = await openai.createCompletion({
				model: 'text-davinci-003',
				prompt: text,
				temperature: 1,
				max_tokens: 250,
				top_p: 1,
				frequency_penalty: 0.1,
				presence_penalty: 0.1,
			});
			const suggestions = aires.data?.choices?.[0].text;
			if (suggestions === undefined) {
				res.status(400).send({ error: 'Failed to get response from OPENAI' });
			}
			res.status(200).send({ result: suggestions });
		} catch (err) {
			res.status(400).send({ error: 'Failed to fetch data' });
		}
	} else {
		res.status(405).json({ error: 'Wrong request method!' });
	}
}