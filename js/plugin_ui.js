var colors = {
    "-1": "#58bc8a",
    "0": "#ffeb3c",
    "1": "#ff8b66"
};

var featureList = document.getElementById("features");

chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    chrome.storage.local.get(['results', 'legitimatePercents', 'isPhish'], function (items) {
        // Check if the necessary data is present
        if (!items.results || !items.legitimatePercents || !items.isPhish) {
            console.error("Data is undefined or missing.");
            return;
        }

        var tabId = tabs[0].id;

        // Check if the tabId exists in the results, isPhish, and legitimatePercents
        if (!(tabId in items.results) || !(tabId in items.isPhish) || !(tabId in items.legitimatePercents)) {
            console.error("Tab data not found.");
            return;
        }

        var result = items.results[tabId];
        var isPhish = items.isPhish[tabId];
        var legitimatePercent = items.legitimatePercents[tabId];

        for (var key in result) {
            var newFeature = document.createElement("li");
            newFeature.textContent = key;
            newFeature.style.backgroundColor = colors[result[key]];
            featureList.appendChild(newFeature);
        }

        $("#site_score").text(parseInt(legitimatePercent) + "%");

        if (isPhish) {
            $("#res-circle").css("background", "#ff8b66");
            $("#site_msg").text("Warning!! You're being phished.");
            $("#site_score").text(parseInt(legitimatePercent) - 20 + "%");
        }
    });
});
