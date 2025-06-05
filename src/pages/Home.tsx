import InsertTransaction from '@/components/InsertTransaction';
import TransactionList from '@/components/TransactionList';

export default function Home() {
  return (
    <main className="p-6">
      <InsertTransaction />
      <TransactionList />
    </main>
  );
}
