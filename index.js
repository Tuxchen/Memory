class MemoryGamePlugin extends Layer {
    constructor() {
        super("Memory", "fas fa-brain", 400);

        this.symbols = ['🍎', '🚀', '🐱', '🎵', '🌟', '⚽', '🧩', '🐶'];
        this.cards = [];
        this.flipped = [];
        this.matchedCount = 0;

        const body = document.createElement("div");
        body.classList.add("text-center");

        // Spielcontainer
        this.grid = document.createElement("div");
        this.grid.style.display = "grid";
        this.grid.style.gridTemplateColumns = "repeat(4, 60px)";
        this.grid.style.gap = "10px";
        this.grid.style.justifyContent = "center";
        this.grid.style.marginBottom = "15px";

        // Neustart-Button
        this.restartBtn = this.getButton("🔁 Spiel neu starten");
        this.restartBtn.style.display = "none";
        this.restartBtn.addEventListener("click", () => this.resetGame());

        body.append(this.grid);
        body.append(this.restartBtn);
        this.setBody(body);

        this.initGame();
    }

    initGame() {
        // Reset
        this.grid.innerHTML = "";
        this.flipped = [];
        this.matchedCount = 0;
        this.restartBtn.style.display = "none";

        // Karten vorbereiten
        const allSymbols = [...this.symbols, ...this.symbols];
        const shuffled = allSymbols.sort(() => Math.random() - 0.5);

        shuffled.forEach(symbol => {
            const card = document.createElement("button");
            card.classList.add("stylish");
            card.textContent = "❓";
            card.style.fontSize = "24px";
            card.dataset.symbol = symbol;
            card.disabled = false;

            card.addEventListener("click", () => this.flipCard(card));
            this.grid.appendChild(card);
        });

        this.cards = Array.from(this.grid.children);
    }

    flipCard(card) {
        if (this.flipped.length >= 2 || card.disabled) return;

        card.textContent = card.dataset.symbol;
        card.disabled = true;
        this.flipped.push(card);

        if (this.flipped.length === 2) {
            const [first, second] = this.flipped;

            if (first.dataset.symbol === second.dataset.symbol) {
                this.matchedCount += 1;
                this.flipped = [];

                if (this.matchedCount === this.symbols.length) {
                    this.showInfo("🎉 Gewonnen!");
                    this.restartBtn.style.display = "inline-block";
                }
            } else {
                setTimeout(() => {
                    first.textContent = "❓";
                    second.textContent = "❓";
                    first.disabled = false;
                    second.disabled = false;
                    this.flipped = [];
                }, 800);
            }
        }
    }

    resetGame() {
        this.initGame();
    }
}

// Plugin starten
const memoryPlugin = new MemoryGamePlugin();
memoryPlugin.build();