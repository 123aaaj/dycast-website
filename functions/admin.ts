export const onRequest = async ({ request }: { request: Request }) => {
  const incoming = new URL(request.url);
  const upstream = new URL('/admin', 'https://silent-tooth-a403.llb1111xxx.workers.dev');
  upstream.search = incoming.search;

  try {
    return await fetch(new Request(upstream, request));
  } catch {
    return new Response('授权管理页面暂时不可用，请稍后重试。', {
      status: 502,
      headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
    });
  }
};
