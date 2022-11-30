import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix =
`Écrit moi une fable pour enfant à la façon de Jean de La Fontaine. La fable doit contenir une morale inclue à la fin de l'histoire. Les deux personnages sont : 
`
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.5,
    max_tokens: 700,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();
  console.log();


  res.status(200).json({ output: basePromptOutput });

};

export default generateAction;