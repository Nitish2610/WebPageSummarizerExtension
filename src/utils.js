import axios from "axios";
import * as cheerio from "cheerio";

const apiKey = API_KEY;
const apiHost="chatgpt-api8.p.rapidapi.com";
const apiUrl="https://chatgpt-api8.p.rapidapi.com/";

// Function to get the active tab's URL in the current window
export const getActiveTabURL = async () => {
	const tabs = await chrome.tabs.query({
		currentWindow: true,
		active: true,
	});
	return tabs[0];
};

// Function to fetch content from a given URL
export const getContent = async url => {
	const corsProxyUrl = "https://cors-anywhere.herokuapp.com/";  // Get access of cors from here https://cors-anywhere.herokuapp.com/corsdemo/ 
	                                                															   
	const { data } = await axios(corsProxyUrl + url);
	let content = "";
	const $ = cheerio.load(data);
	$("p").each((index, element) => {
		const text = $(element).text();
		 if(content.length<1000){
		 	content+=text;
		 }
	});
	return content;
};

// Function to ask a question to the GPT model
export const askGPT = async content => {
	try {
		const { data } = await axios.post(
			apiUrl,
			JSON.stringify([
				{
					role: "user",
					content,
				},
			]),
			{
				headers: {
					"content-type": "application/json",
					"X-RapidAPI-Key": apiKey,
					"X-RapidAPI-Host": apiHost,
				},
			}
		);

		return data.text; 
	} catch (error) {
		return "Unable to fetch data. Try after some time.";
	}
};