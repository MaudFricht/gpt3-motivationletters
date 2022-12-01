import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateAction = async (req, res) => {
  //Get a description of the company requested skills
  const skillsDescriptionPrompt =
  `Make a summary of this company value proposition and skills they value. Use new words.

  Company Name: ${req.body.userInputCompany}
  Company Mission: ${req.body.userInputMission}
  Job offer Requested skills: ${req.body.userInputOffer}
  Who is the company and what kind of employee are they trying to recruit?
  `
  // Run first prompt
  console.log(`API: ${skillsDescriptionPrompt}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${skillsDescriptionPrompt}\n`,
    temperature: 0.4,
    max_tokens: 700,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();
  console.log();

  // I build Prompt #2.
  const offerDetailPrompt =
  `Write a convincing motivation letter in the style of Paul Graham, the co-founder of Y-Combinator.for a startup company that includes the problem the company is solving, the help I can bring to the team and the value I will create. Write why I am the best candidate and why I want to work for this company. Don't talk too much about the past experiences but highlight the skills.
  Company Name: ${req.body.userInputCompany}  
  Company:  ${basePromptOutput}
  
  Candidate description: ${req.body.userInputJob}
  Candidate main skills: ${req.body.userInputSkills}
  Candidate past experiences: ${req.body.userInputExp}

  Motivation Letter:
  `
  // I call the OpenAI API a second time with Prompt #2
  const secondPromptCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${offerDetailPrompt}`,
    // I set a higher temperature for this one. Up to you!
    temperature: 0.85,
		// I also increase max_tokens.
    max_tokens: 1500,
  });
  
  // Get the output
  const secondPromptOutput = secondPromptCompletion.data.choices.pop();

  // Send over the Prompt #2's output to our UI instead of Prompt #1's.
  res.status(200).json({ output: secondPromptOutput });
};

export default generateAction;