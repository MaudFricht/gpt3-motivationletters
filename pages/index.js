import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import rocket from '../assets/rocket.png';
import { useState } from 'react';

const Home = () => {
  const [userInputJob, setUserInputJob] = useState('');
  const [userInputSkills, setUserInputSkills] = useState('');
  const [userInputCompany, setUserInputCompany] = useState('');
  const [userInputExp, setUserInputExp] = useState('');
  const [userInputOffer, setUserInputOffer] = useState('');
  const [userInputMission, setUserInputMission] = useState('');
  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    console.log("Calling OpenAI...");
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInputJob, userInputCompany, userInputOffer, userInputSkills }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text);

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  };

  const onUserChangedJob = (event) => {
    setUserInputJob(event.target.value);
    
  };

  const onUserChangedSkills = (event) => {
    setUserInputSkills(event.target.value);
    
  };

  const onUserChangedCompany = (event) => {
    setUserInputCompany(event.target.value);

  };

  const onUserChangedOffer = (event) => {
    setUserInputOffer(event.target.value);

  };
  const onUserChangedMission = (event) => {
    setUserInputMission(event.target.value);

  };

  const onUserChangedExp = (event) => {
    setUserInputExp(event.target.value);

  };


  return (
    <div className="root">
      <Head>
        <title>Your perfect motivation letter</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Generate your ideal motivation letter</h1>
          </div>
          <div className="header-subtitle">
            <h2>Fill some informations and get your perfect motivation letter in a few seconds.</h2>
          </div>
          
        </div>

        <div className="prompt-container">
          <div className='prompt-group'>
            <label>Who are you?</label> 
            <textarea
            className="prompt-box"
            placeholder="Enter your main job and years of experience"
            value={userInputJob}
            onChange={onUserChangedJob}/>
            
            <textarea
            className="prompt-box"
            placeholder="Your main skills"
            value={userInputSkills}
            onChange={onUserChangedSkills}/>
            
            <textarea
            className="prompt-box"
            placeholder="Your mains past experiences related to the job"
            value={userInputExp}
            onChange={onUserChangedExp}/>
          </div>
          
          <div className='prompt-group'>
            <label>What is the job you want?</label> 
            <textarea
            className="prompt-box"
            placeholder="The name of the company you apply for"
            value={userInputCompany}
            onChange={onUserChangedCompany}/>
            
            <textarea
            className="prompt-box"
            placeholder="The company main mission"
            value={userInputMission}
            onChange={onUserChangedMission}/>

            <textarea
            className="prompt-box"
            placeholder="The skills requested by the company for this job offer"
            value={userInputOffer}
            onChange={onUserChangedOffer}/>
            
          </div>

          <div className="prompt-buttons">
            <a className={isGenerating ? 'generate-button loading' : 'generate-button'}
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
              {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
              </div>
            </a>
          </div>


          {apiOutput && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Your letter</h3>
              </div>
            </div>
            <div className="output-content">
              {isGenerating ? <span className="loader"></span> : <p>{apiOutput}</p>}
            </div>
          </div>
          )}


          
        </div>

      </div>

    </div>
  );
};

export default Home;
