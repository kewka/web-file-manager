import { Router } from 'express';

export default Router().get('/', (req, res) => {
    return res.json({ response: null });
});
