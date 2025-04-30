import { swagger } from '@elysiajs/swagger';

export const swaggerPlugin = swagger({
  path: '/docs',
  documentation: {
    info: {
      title: 'ElysiaJS + BunJS',
      version: '1.0.0'
    }
  }
});