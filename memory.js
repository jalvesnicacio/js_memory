// Define as imagens do jogo
const images = ["image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg", "image5.jpg", "image6.jpg", "image7.jpg", "image8.jpg", "image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg", "image5.jpg", "image6.jpg", "image7.jpg", "image8.jpg"];

// Embaralha as imagens
function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

// Cria as divs do jogo
function createGrid() {
	const container = document.querySelector(".grid-container");
	for (let i = 0; i < images.length; i++) {
		const item = document.createElement("div");
		item.classList.add("grid-item");
		item.setAttribute("data-index", i);
		container.appendChild(item);
		item.addEventListener("click", handleCardClick);
	}
}

// Trata o clique na carta
function handleCardClick(event) {
	const clickedCard = event.target;
	if (clickedCard.classList.contains("matched")) {
		return;
	}
	clickedCard.classList.add("selected");
	clickedCard.style.backgroundImage = `url(images/${images[clickedCard.dataset.index]})`;

	// Verifica se duas cartas foram selecionadas
	const selectedCards = document.querySelectorAll(".selected");
	if (selectedCards.length === 2) {
        console.log("Duas cartas selecionadas");
		const card1 = selectedCards[0];
		const card2 = selectedCards[1];
		if (images[card1.dataset.index] === images[card2.dataset.index]){
            // As cartas são iguais
            card1.classList.remove("selected");
            card2.classList.remove("selected");
            card1.classList.add("matched");
            card2.classList.add("matched");
            if (document.querySelectorAll(".matched").length === images.length) {
                alert("Você ganhou!");
            }
        } 
    } else if (selectedCards.length > 2) {
        // Mais de duas cartas foram selecionadas, deseleciona todas
        console.log("Mais de duas cartas foram selecionadas, deseleciona todas");
        selectedCards.forEach((card) => {
            card.classList.remove("selected");
            card.style.backgroundImage = "";
        });
    }
}

// Embaralha as imagens e cria as divs do jogo
shuffle(images);
createGrid();