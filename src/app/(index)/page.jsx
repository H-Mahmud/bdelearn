import { HomeView } from 'src/sections/home/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'BD E-Learn | Source of Income E-Learning Platform',
  description:
    '',
};

export default function HomePage() {
  const data = {
    courses: [
      {
        title: 'Facebook Marketing',
        coverUrl: '/assets/temp-images/facebook-marketing.jpg'
      },
      {
        title: 'Digital Marketing',
        coverUrl: '/assets/temp-images/digital-marketing.jpg'
      },
      {
        title: 'Product Sales & Buy',
        coverUrl: '/assets/temp-images/buy-sale.jpg'
      },
      {
        title: 'Lead Generation',
        coverUrl: '/assets/temp-images/lead-generation.jpg'
      },
      {
        title: 'Quran Sikha',
        coverUrl: '/assets/temp-images/quran-sikha.jpg'
      },
      {
        title: 'Spoken English',
        coverUrl: '/assets/temp-images/digital-marketing.jpg'
      },
      {
        title: 'Photo Editing',
        coverUrl: '/assets/temp-images/buy-sale.jpg'
      },
      {
        title: 'Video Editing',
        coverUrl: '/assets/temp-images/facebook-marketing.jpg'
      },
      {
        title: 'Computer Training',
        coverUrl: '/assets/temp-images/lead-generation.jpg'
      },
    ]
  }
  return <HomeView data={data} />;
}
