import dbConnect from '../../../utils/mongoDb';
import Product from '../../../models/Product';

export default async function handler(req, res) {     
    const {method, cookies} = req;

    const token = cookies.token;

    dbConnect();

    if(method === "GET"){
        try {
            const product = await Product.find()
            res.status(201).json(product);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    if(method === "POST"){
        if (!token || token !== process.env.TOKEN) {
            return res.status(401).json('you are not authenticated')
        }
        try {
            const product = await Product.create(req.body);
            res.status(201).json(product);

        } catch (error) {
            res.status(500).json(error);
        }
    }

  }
   