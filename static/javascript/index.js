let draggedCard = null;
let insertedByCard = false; // Track if card was inserted by card dragover

// Make all cards draggable
document.querySelectorAll('.card').forEach(card => {
    card.setAttribute('draggable', 'true');
    
    card.addEventListener('dragstart', function(e) {
        draggedCard = this;
        this.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        insertedByCard = false;
    });
    
    card.addEventListener('dragend', function(e) {
        this.classList.remove('dragging');
        document.querySelectorAll('.parent-cards, .parent-guess').forEach(container => {
            container.classList.remove('drag-over');
        });
        insertedByCard = false;
    });
    
    // This handles inserting between cards
    card.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (this === draggedCard) return;
        
        const rect = this.getBoundingClientRect();
        const midpoint = rect.top + rect.height / 2;
        
        insertedByCard = true; // Mark that we've inserted
        
        // Insert above or below based on mouse position
        if (e.clientY < midpoint) {
            this.parentNode.insertBefore(draggedCard, this);
        } else {
            this.parentNode.insertBefore(draggedCard, this.nextSibling);
        }
    });
    
    // Prevent container drop from firing when dropping on a card
    card.addEventListener('drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
    });
});

// Setup drop zones for containers
document.querySelectorAll('.parent-cards, .parent-guess').forEach(container => {
    container.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('drag-over');
    });
    
    container.addEventListener('dragleave', function(e) {
        if (e.target === this) {
            this.classList.remove('drag-over');
        }
    });
    
    container.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('drag-over');
        
        // Only append if we're dropping on empty space (not already inserted by card)
        if (!insertedByCard && (e.target === this || e.target.tagName === 'H2')) {
            this.appendChild(draggedCard);
        }
        
        insertedByCard = false;
    });
});