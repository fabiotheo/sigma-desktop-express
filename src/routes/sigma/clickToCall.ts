import {Router} from 'express';
import {tokens} from "../../constants/tokens.js";
import {ErrorResponse, ResponseData} from "../../@types/responses.js";

const clickToCallRoutes = Router();

clickToCallRoutes.get('/', async (req, res) => {
    console.log(req);
    const { telefone, ramal, token } = req.query;
    if (!telefone ||!ramal ||!token) {
        return res.status(400).json({ error: 'Você deve fornecer corretamente os parametros telefone, ramal e token' });
    }

    if (typeof token !== 'string') {
        return res.status(400).json({ error: 'Token deve ser um string' });
    }

    const findToken = tokens.find(t => t.token === token);
    console.log({ tokens });
    if (!findToken) {
        return res.status(401).json({ error: 'Token inválido' });
    }

    const response = fetch(`${findToken.server}/segwaredial/?telefone=${telefone}&ramal=${ramal}&token=${token}&tech=PJSIP`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const responseData = await response;

    if (!responseData.ok) {
        try {
            const errorData = await responseData.json() as ErrorResponse;
            return res.status(errorData.statusCode).json({ error: errorData.message, reason: errorData.reason });
        } catch {
            return res.status(responseData.status).json({ error: responseData.statusText });
        }
    }

    const data = await responseData.json() as ResponseData;
    console.log(data);
    return res.status(200).json(data);

})

export default clickToCallRoutes;
