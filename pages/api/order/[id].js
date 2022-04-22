import dbConnect from '../../../utils/mongoDb';
import Order from '../../../models/Order';

export default async function handler(req, res) {   

    const {method, query:{id}} = req;

    dbConnect();

    if(method === "GET"){
       
    }

    if(method === "PUT"){
       
    }
    if(method === "DELETE"){
      
    }

  }

