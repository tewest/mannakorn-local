// functions/api/random.js
export async function onRequest() {
  try {
    const url = new URL('../../data/verses.json', import.meta.url);
    const res = await fetch(url);
    const verses = await res.json();

    if (!Array.isArray(verses) || verses.length === 0) {
      return new Response(JSON.stringify({ error: 'Ingen vers funnet' }), { status: 500, headers: { 'Content-Type':'application/json' } });
    }

    const random = verses[Math.floor(Math.random() * verses.length)];
    return new Response(JSON.stringify(random), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { 'Content-Type':'application/json' } });
  }
}