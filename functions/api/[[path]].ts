const LICENSE_WORKER_ORIGIN = 'https://silent-tooth-a403.llb1111xxx.workers.dev';

interface Env {
  LICENSE_WORKER_ORIGIN?: string;
}

export const onRequest = async ({ request, env }: { request: Request; env: Env }) => {
  const incoming = new URL(request.url);
  const workerOrigin = env.LICENSE_WORKER_ORIGIN || LICENSE_WORKER_ORIGIN;
  const upstream = new URL(`${incoming.pathname}${incoming.search}`, workerOrigin);

  try {
    return await fetch(new Request(upstream, request));
  } catch {
    return Response.json(
      { ok: false, message: '授权服务暂时不可用，请检查网络后重试' },
      { status: 502, headers: { 'Cache-Control': 'no-store' } },
    );
  }
};