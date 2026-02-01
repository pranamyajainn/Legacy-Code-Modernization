import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { Orchestrator } from './core/orchestrator';

const app = new Hono();

app.use('/*', cors());

app.get('/', (c) => {
    return c.text('Legacy Code Modernization API');
});

app.post('/api/projects/:id/run', async (c) => {
    const projectId = c.req.param('id');
    const orchestrator = Orchestrator.getInstance();
    const jobId = orchestrator.createJob(projectId);

    // Start async
    setTimeout(() => orchestrator.runJob(jobId), 100);

    return c.json({ jobId });
});

app.get('/api/projects/:id/status', (c) => {
    // For demo simplicity, we assume one job per project or pass jobId
    // Here we'll just find the latest job for this project or return a mock
    const orchestrator = Orchestrator.getInstance();
    // In a real app we'd look up by ID. For now let's just use the query param or last job
    const jobId = c.req.query('jobId');
    if (!jobId) return c.json({ error: 'Missing jobId' }, 400);

    const job = orchestrator.getJob(jobId);
    if (!job) return c.json({ error: 'Job not found' }, 404);

    return c.json(job);
});

app.get('/api/projects/:id/agents', (c) => {
    const jobId = c.req.query('jobId');
    if (!jobId) return c.json({ error: 'Missing jobId' }, 400);

    const orchestrator = Orchestrator.getInstance();
    const events = orchestrator.getEvents(jobId);
    return c.json(events);
});

const port = 3001;
console.log(`Server is running on port ${port}`);

serve({
    fetch: app.fetch,
    port
});
