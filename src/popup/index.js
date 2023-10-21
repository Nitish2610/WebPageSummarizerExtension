import { getActiveTabURL, getContent, askGPT } from "../utils";

const getSummary = async content => {
	const question = `Provide summary. The content of a website is as follows - ${content}`;
	return await askGPT(question);
};

const getMajorPoints = async content => {
	const question = `Provide major points. The content of a website is as follows - ${content}`;
	return await askGPT(question);
};

const onBtnClick = async getData => {

	const getSummaryBtn = document.getElementById("get-summary");
	const getMajorPointsBtn = document.getElementById("get-major-points");

	const result = document.getElementsByClassName("result")[0];
	const loader = document.getElementById("loader");
	const text = document.getElementById("text");

	getSummaryBtn.disabled = true;
	getMajorPointsBtn.disabled = true;

	result.style.display = "none";
	text.innerText = "";
	loader.style.display = "block";

	const activeTab = await getActiveTabURL();
	const url = activeTab.url;

	const content = await getContent(url);

	const data = await getData(content);

	loader.style.display = "none";
	text.innerText = data;
	result.style.display = "block";

	getSummaryBtn.disabled = false;
	getMajorPointsBtn.disabled = false;
};

// Add an event listener for when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", async () => {
	const getSummaryBtn = document.getElementById("get-summary");
	const getMajorPointsBtn = document.getElementById("get-major-points");

	const result = document.getElementsByClassName("result")[0];
	const copyTextBtn = document.getElementById("copy-btn");
	const text = document.getElementById("text");

	getSummaryBtn.addEventListener("click", () => {
		onBtnClick(getSummary);
	});

	getMajorPointsBtn.addEventListener("click", () => {
		onBtnClick(getMajorPoints);
	});

	// Add click event listener to the copy button for copying text
	copyTextBtn.addEventListener("click", () => {
		result.classList.add("active");
		copyTextBtn.disabled = true;
		navigator.clipboard.writeText(text.innerText);
		setTimeout(() => {
			copyTextBtn.disabled = false;
			result.classList.remove("active");
		}, 2000);
	});
});
