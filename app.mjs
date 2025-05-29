import express from 'express';
import fetch from "node-fetch";

const app = express();

app.get('', async (req, res) => {
    try {
        const response = await fetch('https://api.api-futebol.com.br/v1/campeonatos/14', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer live_2a6ecb947849b118e38bd1f1a3aa62'
            }
        });

        if (!response.ok) {
            const text = await response.text();
            console.error('Status:', response.status);
            console.error('Resposta:', text);
            return res.status(response.status).json({
                error: 'Erro na requisição',
                status: response.status,
                resposta: text
            });
        }

        const data = await response.json();
        console.log(data);
        res.json(data);

    } catch (error) {
        console.error('Erro:', error);
        res.status(500).json({ error: 'Erro ao buscar os dados', detalhe: error.message });
    }
});

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));