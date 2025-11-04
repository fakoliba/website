class CustomRAG {
    constructor() {
        this.endpoint = '/api/query';
        this.history = [];
    }

    async query(question) {
        try {
            const response = await fetch(this.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    question,
                    history: this.history
                })
            });

            const result = await response.json();
            this.history.push({ question, answer: result.answer });
            return result;
        } catch (error) {
            console.error('RAG Query Error:', error);
            throw error;
        }
    }
}