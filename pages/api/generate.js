import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateAction = async (req, res) => {
  //Get a description of the company requested skills
  const skillsDescriptionPrompt =
  `Make a summary of the skills requested by this job offer.
  Company main mission
  Job offer:  ${req.body.userInputOffer}
  `
  // Run first prompt
  console.log(`API: ${skillsDescriptionPrompt}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${skillsDescriptionPrompt}\n`,
    temperature: 0.5,
    max_tokens: 700,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();
  console.log(basePromptOutput);

  // I build Prompt #2.
  const offerDetailPrompt =
  `Write a motivation letter for a startup company that includes the problem the company is solving, the help I can bring to the team and the value I will create. Tell why I am the best candidate, why I'm interested in product management and why I want to work for this company. 

  Company Name: ${req.body.userInputCompany}
  Company Main Mission: ${req.body.userInputMission}
  
  Job offer Requested skills: ${basePromptOutput}
  
  Candidate description: ${req.body.userInputJob}
  Candidate main skills to highligh: ${req.body.userInputSkills}
  Candidate main past experiences: ${req.body.userInputExp}
  `
  // I call the OpenAI API a second time with Prompt #2
  const secondPromptCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${offerDetailPrompt}`,
    // I set a higher temperature for this one. Up to you!
    temperature: 0.85,
		// I also increase max_tokens.
    max_tokens: 1250,
  });
  
  // Get the output
  const secondPromptOutput = secondPromptCompletion.data.choices.pop();

  // Send over the Prompt #2's output to our UI instead of Prompt #1's.
  res.status(200).json({ output: secondPromptOutput });
};

export default generateAction;