import verses from './data/verses.json';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Handle API route
    if (url.pathname === '/api/random') {
      try {
        if (!Array.isArray(verses) || verses.length === 0) {
          return new Response(JSON.stringify({ error: 'Ingen vers funnet' }), { 
            status: 500, 
            headers: { 'Content-Type': 'application/json' } 
          });
        }

        const random = verses[Math.floor(Math.random() * verses.length)];
        return new Response(JSON.stringify(random), {
          status: 200,
          headers: { 
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*'
          }
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { 
          status: 500, 
          headers: { 'Content-Type': 'application/json' } 
        });
      }
    }
    
    // Let Assets handle static files
    return env.ASSETS.fetch(request);
  }
};
