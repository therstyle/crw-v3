import type { Detail } from '@/types/Detail';
import type { FeaturedBrand } from '@/types/FeaturedBrand';
import type { Stat } from '@/types/Stat';

export interface Entry {
  year: string;
  logo: string;
  company: string;
  title: string;
  details: Detail[];
  featured_brands?: FeaturedBrand[];
  stats: boolean | Stat[];
}
