function loadPage(page) {
    fetch(page)
        .then(response => response.text())
        .then(html => {
            document.getElementById('content').innerHTML = html;
        })
        .catch(error => {
            console.error('Error loading page:', error);
        });
}
// Function to display investor profiles and handle matching
function displayInvestors(investors) {
    const investorCards = document.getElementById('investorCards');
    investorCards.innerHTML = ''; // Clear previous content

    // Assuming `investors` is an array of investor objects
    investors.forEach(investor => {
        const div = document.createElement('div');
        div.classList.add('investor-card');
        div.innerHTML = `
            <h3>${investor.name}</h3>
            <p>${investor.interest.join(', ')}</p>
            <button class="messageBtn" onclick="redirectToMessage('${investor.email}')">Message</button>
        `;
        investorCards.appendChild(div);
    });

    // Initialize Tinder-like functionality
    initTinderFunctionality(investors);
}

// Function to initialize Tinder-like swipe functionality
function initTinderFunctionality(investors) {
    let currentInvestorIndex = 0;

    function showInvestor() {
        const investorCards = document.getElementById('investorCards');
        investorCards.innerHTML = ''; // Clear previous content

        if (investors.length > 0) {
            const investor = investors[currentInvestorIndex];
            const div = document.createElement('div');
            div.classList.add('investor-card');
            div.innerHTML = `
                <h3>${investor.name}</h3>
                <p>${investor.interest.join(', ')}</p>
                <button class="messageBtn" onclick="redirectToMessage('${investor.email}')">Message</button>
            `;
            investorCards.appendChild(div);
        } else {
            investorCards.innerHTML = '<p>No investors available.</p>';
        }
    }

    document.getElementById('likeBtn').addEventListener('click', () => {
        alert('You liked ' + investors[currentInvestorIndex].name);
        currentInvestorIndex = (currentInvestorIndex + 1) % investors.length;
        showInvestor();
    });

    document.getElementById('dislikeBtn').addEventListener('click', () => {
        alert('You disliked ' + investors[currentInvestorIndex].name);
        currentInvestorIndex = (currentInvestorIndex + 1) % investors.length;
        showInvestor();
    });

    showInvestor();
}

// Function to redirect to the chat page with the email parameter
function redirectToMessage(email) {
    // Assuming the chat page is at /chat/ and expects an email parameter
    window.location.href = `/chat/${encodeURIComponent(investor.email)}/`;
}

// Function to handle sending a chat message
function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    const message = chatInput.value.trim();
    
    if (message === '') {
        alert('Message cannot be empty.');
        return;
    }
    
    chatInput.value = '';
    
    const div = document.createElement('div');
    div.textContent = 'You: ' + message;
    chatMessages.appendChild(div);

    // Optionally, you could add functionality to send the message to a server here
    // For example, using fetch() to POST the message to an endpoint
}