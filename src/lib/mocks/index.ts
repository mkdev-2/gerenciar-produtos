import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export async function initializeMSW() {
  if (process.env.NODE_ENV !== 'development') {
    console.log('[MSW] Ignorando inicialização no modo não-desenvolvimento');
    return;
  }
  
  try {
    const worker = setupWorker(...handlers);
    await worker.start({
      onUnhandledRequest: 'bypass',
    });
    
    console.log('[MSW] Servidor de mock inicializado');
  } catch (error) {
    console.error('[MSW] Erro ao inicializar:', error);
  }
}