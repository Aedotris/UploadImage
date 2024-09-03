"use client";
import Head from 'next/head';
import UploadImage from '@/components/UploadImage';

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Image Upload</title>
        <meta name="description" content="Upload your images easily" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <UploadImage />
      </main>
    </div>
  );
};

export default Home;
