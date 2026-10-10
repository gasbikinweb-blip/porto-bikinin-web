import { HomePage, homeMetadata } from '@/components/home/HomePage';
import { en } from '@/content/en';

export const metadata = homeMetadata(en);

export default function Page() {
  return <HomePage t={en} />;
}
