import React, { useState } from 'react';

const VoiceInput = ({ addTask }) => {
	const [isListening, setIsListening] = useState(false);
	const [language, setLanguage] = useState('en-US');

	const handleVoiceInput = () => {
		// Check for Web Speech API support
		const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

		if (!SpeechRecognition) {
			alert('Web Speech API is not supported in this browser.');
			return;
		}

		const recognition = new SpeechRecognition();
		recognition.lang = language; // Use the selected language
		recognition.interimResults = false;
		recognition.maxAlternatives = 1;

		recognition.onstart = () => {
			setIsListening(true);
		};

		recognition.onend = () => {
			setIsListening(false);
		};

		recognition.onresult = (event) => {
			const transcript = event.results[0][0].transcript;
			addTask(transcript);
		};

		recognition.start();
	};

	return (
		<div className="my-4">
			<div className="flex items-center gap-4 mb-4">
				<label htmlFor="language">Select Language:</label>
				<select
					id="language"
					value={language}
					onChange={(e) => setLanguage(e.target.value)}
					className="border p-2 rounded"
				>
					<option value="en-US">English</option>
					<option value="ru-RU">Russian</option>
				</select>
			</div>
			<button
				onClick={handleVoiceInput}
				className={`border-none rounded-full bg-blue-600 w-32 h-14 text-white text-lg font-medium cursor-pointer ${isListening ? 'bg-red-600' : ''
					}`}
			>
				{isListening ? 'Listening...' : 'Voice Add'}
			</button>
		</div>
	);
};

export default VoiceInput;
