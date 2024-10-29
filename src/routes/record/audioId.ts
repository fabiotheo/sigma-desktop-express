import {Router} from 'express';
import { Readable } from 'stream';
import {tokens} from "../../constants/tokens.js";

const audioIdRouter = Router();

audioIdRouter.get('/', async (req, res) => {
    const { id, token } = req.query;

    if (!id ||!token) {
        return res.status(400).json({ error: 'Você deve fornecer corretamente os parametros id e token' });
    }

    if (typeof token !== 'string') {
        return res.status(400).json({ error: 'Token deve ser um string' });
    }

    const findToken = tokens.find(t => t.token === token);
    if (!findToken) {
        return res.status(401).json({ error: 'Token inválido' });
    }

    try {
        const response = await fetch(`${findToken.server}/records/?id=${id}`, {
            method: 'GET',
        });

        if (!response.ok) {
            return res.status(response.status).json({ error: 'Erro ao obter o arquivo de áudio' });
        }

        // Extrai os cabeçalhos relevantes e os adiciona à resposta do Express
        const contentType = response.headers.get('Content-Type');
        const contentLength = response.headers.get('Content-Length');
        const acceptRanges = response.headers.get('Accept-Ranges');

        res.setHeader('Content-Type', contentType || 'application/octet-stream');
        res.setHeader('Content-Length', contentLength || '0');
        if (acceptRanges) {
            res.setHeader('Accept-Ranges', acceptRanges);
        }

        // Verifica se response.body não é nulo antes de continuar
        if (response.body) {
            // Converte o ReadableStream para um Node.js Readable stream
            const nodeStream = Readable.from(response.body);
            nodeStream.pipe(res);
        } else {
            res.status(500).json({ error: 'Erro ao processar a resposta do servidor' });
        }
    } catch (error) {
        console.error('Erro ao processar a requisição:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }

})



export default audioIdRouter;
