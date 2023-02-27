// Importuje se exportovaná funkce ze souboru s propojením OpenAI
import { openai } from '@/utils/openai';

export default async function handler(req, res) {
	// Pokud metoda je jiná než POST, vrátí se error
	if (req.method === 'POST') {
		const { input } = req.body;
		if (!input) {
			res.status(400).json({ error: 'Struggle is missing' });
			return;
		}

		var text = `Act as a Jordan B. Peterson. Your goal is to write short motivation quote for someone with specific struggle. The person struggle is ${input}:`;
		var quote;
		var imgurl;

		try {
			const quoteres = await openai.createCompletion({
				model: 'text-davinci-003',
				prompt: text,
				temperature: 1,
				max_tokens: 250,
				top_p: 1,
				frequency_penalty: 0.1,
				presence_penalty: 0.1,
			});
			quote = quoteres.data?.choices?.[0].text;
			if (quote === undefined) {
				res.status(400).send({ error: 'Failed to get response from OPENAI' });
			}
		} catch (err) {
			res.status(400).send({ error: 'Failed to create quote' });
		}
		try {
			const imgres = await openai.createImage({
				prompt: `Person struggling with ${input}`,
				n: 1,
				size: "1024x1024",
			 });
			 imgurl = imgres.data.data[0].url;
		} catch (err) {
			res.status(400).send({ error: 'Failed to generate image' });
			return
		}

		res.status(200).send({ quote: quote, imgurl: imgurl });
		return;
	} else {
		res.status(405).json({ error: 'Wrong request method!' });
	}
}