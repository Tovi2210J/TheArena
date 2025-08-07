const gameList = document.getElementById('game-list');

fetch('/games')
    .then(response => response.json())
    .then(games => {
        games.forEach(gameId => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = `/game/${gameId}`;
            link.textContent = gameId;
            listItem.appendChild(link);
            gameList.appendChild(listItem);
        });
    });
