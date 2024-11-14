import { config } from '@/config/config';
import jwt from 'jsonwebtoken';

// Helper function to call the Ghost Admin API
export async function callGhostAdminAPI(endpoint: string, method = 'GET', body: any = null) {
    const url = `${config.INTERNAL_GHOST_URL}/ghost/api/admin/${endpoint}`;
  
    // Split the key into ID and SECRET
    const [id, secret] = `${config.GHOST_ADMIN_API_KEY}`.split(':');
  
    // Create the token (including decoding secret)
    const token = jwt.sign({}, Buffer.from(secret, 'hex'), {
        keyid: id,
        algorithm: 'HS256',
        expiresIn: '1m',
        audience: `/admin/`
    });
    
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Ghost ${token}`, // Authentication via Admin API Key
      },
    };
  
    if (body) {
      options.body = JSON.stringify(body);
    }
  
    const response = await fetch(url, options);
  
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
  
    return response.json();
  }
  