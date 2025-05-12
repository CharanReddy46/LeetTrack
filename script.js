document.addEventListener("DOMContentLoaded", function(){

    const searchButton = document.getElementById("search-button");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLabel = document.getElementById("easy-questions");
    const mediumLabel = document.getElementById("medium-questions");
    const hardLabel = document.getElementById("hard-questions");
    const cardStatsContainer = document.querySelector(".stats-cards");
    const acceptanceCard = document.querySelector(".acceptance-rate");
    const totalSolvedCard = document.querySelector(".totalsolved");
    const rankingCard = document.querySelector(".ranking");
    const statsDiv = document.querySelector(".stats-cards");

    function validateUsername(username){
        if(username.trim()===""){
            alert("Username should not be empty");
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching = regex.test(username);
        if(!isMatching){
            alert("Invalid Usename");
        }
        return isMatching;
    }

    // async function fetchUserDetails(username) {
    //     const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
    
    //     try {
    //         searchButton.textContent = "Searching...";
    //         searchButton.disabled = true;
    
    //         // Fetch the data from the API
    //         const response = await fetch(url);
            
    //         // Log the status and response for debugging
    //         console.log("Response status:", response.status); // Log the status
    //         console.log("Response headers:", response.headers); // Log headers
    //         const data = await response.json(); // Parse the response into JSON
    
    //         // Log the data to check what we got back
    //         console.log("Fetched data:", data);
            
    //         // Check if the data object is valid and has expected structure
    //         if (!data || data.status !== 'success') {
    //             throw new Error("Invalid or empty data received.");
    //         }
    
    //         // If everything is okay, process the data
    //         retrieveData(data);
    //     } catch (error) {
    //         // Log the actual error caught
    //         console.error("Error caught:", error);
            
    //         // Display an error message in the UI
    //         statsContainer.innerHTML = `<p>Error: ${error.message}</p>`;
    //     } finally {
    //         // Reset the button to its original state
    //         searchButton.textContent = "Search";
    //         searchButton.disabled = false;
    //     }
    // }
    


    async function fetchUserDetails(username) {
        const myHeaders = new Headers();

        const url = `https://leetcode-stats-api.herokuapp.com/${username}`

        try{
            searchButton.textContent = "Searching...";
            searchButton.disabled = true;
            const response = await fetch(url);
            if(!response.ok){
                throw new Error("Unable to fetch user detaile");
            }
            const data = await response.json();
            if(data.status!=='success'){
                console.error("Status is not success:", data.status);
                throw new Error('Error retrieving user details');
            }
            console.log(data);
            retrieveData(data);
        }
        catch(error){
            statsContainer.innerHTML=`<p>No User Found</p>`
        }
        finally{
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }
    }

    function retrieveData(data){
        const totalSolved = data.totalSolved;
        const easySolved = data.easySolved;
        const mediumSolved = data.mediumSolved;
        const hardSolved = data.hardSolved;
        const totalEasy = data.totalEasy;
        const totalMedium = data.totalMedium;
        const totalHard = data.totalHard;
        const acceptanceRate = data.acceptanceRate;
        const contributionPoints = data.contributionPoints;
        const ranking = data.ranking;
        const reputation = data.reputation;
        updateProgress(easySolved, totalEasy, easyLabel, easyProgressCircle);
        updateProgress(mediumSolved, totalMedium, mediumLabel, mediumProgressCircle);
        updateProgress(hardSolved, totalHard, hardLabel, hardProgressCircle);
        updateCards(acceptanceRate, totalSolved, ranking);
    }

    function updateProgress(solved, total, label, circle){
        const progressDegree = (solved/total)*100;
        circle.style.setProperty("--progress-degree", `${progressDegree}%`);
        label.textContent = `${solved}/${total}`
    }

    function updateCards(acceptanceRate, totalSolved, ranking){
        acceptanceCard.textContent = `Acceptance Rate: ${acceptanceRate}`;
        totalSolvedCard.textContent = `Total Questions Solved: ${totalSolved}`;
        rankingCard.textContent = `Ranking: ${ranking}`;
        statsDiv.classList.toggle("hidden");
    }

    searchButton.addEventListener('click', function(){
        const username = usernameInput.value;
        if(validateUsername(username)){
            fetchUserDetails(username);
        }
    })
})