import { HomePage, homeMetadata } from '@/components/home/HomePage';
import { id } from '@/content/id';

export const metadata = homeMetadata(id);

export default function Page() {
  return <HomePage t={id} />;
}
