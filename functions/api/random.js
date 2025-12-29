// functions/api/random.js
import verses from '../../data/verses.json';

export async function onRequest() {
  try {
    if (!Array.isArray(verses) || verses.length === 0) {
      return new Response(JSON.stringify({ error: 'Ingen vers funnet' }), { 
        status: 500, 
        headers: { 'Content-Type':'application/json' } 
      });
    }

    const random = verses[Math.floor(Math.random() * verses.length)];
    return new Response(JSON.stringify(random), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { 
      status: 500, 
      headers: { 'Content-Type':'application/json' } 
    });
  }
}