import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-6">Página não encontrada</h2>
      <p className="text-muted-foreground mb-8">
        A página que você está procurando não existe ou foi movida.
      </p>
      <Link 
        href="/" 
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
      >
        Voltar para a página inicial
      </Link>
    </div>
  );
} 