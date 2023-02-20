// Importuje se exportovaná funkce ze souboru s propojením OpenAI
import { openai } from '@/utils/openai';

export default async function handler(req, res) {
	// Pokud metoda je jiná než POST, vrátí se error
	if (req.method === 'POST') {
		// Do data se deklaruje obsah v těle requestu
		const data = req.body;

		// Pokud chybí data vrátí se error
		if (!data) {
			res.status(400).json({ error: 'Body is missing' });
			return;
		}
		// Pokud chybí input vrátí se error
		if (!data.input) {
			res.status(400).json({ error: 'Data is missing' });
			return;
		}

		// Vytvoří se proměnná pro promt, který se poté posílá OpenAI, 
		// pokud chceme udělat string ve kterém se nachází zakomponovaný input,
		// co nám poslal uživatel z frontendu musí se místo klasických uvozovek použít backticky
		// a slova se vnořují dovnitř pomocí dollaru a závorek - ${data.input}
		var text = `I want you to act as a Jordan Peterson and your job is to make some short quote about life experience that could motivate person doing ${data.input}.`;
		
		// Teď se pokusí zavolat na OpenAI API s definovaným nastavením
		// Pokud uspěje, ale navrátí se nic vrátí error
		// Pokud uspěje a vrátí něco, tato honota se pošle na frontend
		// Pokud to trvá moc dlouho, nebo nastane error, vrátí error
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