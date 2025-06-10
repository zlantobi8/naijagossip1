"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Footer from '@/app/Footer';
import Image from 'next/image';
import styles from './detail.module.css';
import Link from 'next/link';

import Nav1 from '@/app/components/Nav1';
const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');

const DetailPage = () => {
  const params = useParams();
  const slug = params.slug;

  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const query = encodeURIComponent(`{
    "sportsPost": *[_type == "sportsPost"] | order(date desc) {
      _id, title, "image": image.asset->url, category, categoryClass, description, author, readingTime, date
    },
    "educationPost": *[_type == "educationPost"] | order(date desc) {
      _id, title, "image": image.asset->url, category, categoryClass, description, author, readingTime, date
    },
    "politicsPost": *[_type == "politicsPost"] | order(date desc) {
      _id, title, "image": image.asset->url, category, categoryClass, description, author, readingTime, date
    },
    "technologyPost": *[_type == "technologyPost"] | order(date desc) {
      _id, title, "image": image.asset->url, category, categoryClass, description, author, readingTime, date
    },
    "healthPost": *[_type == "healthPost"] | order(date desc) {
      _id, title, "image": image.asset->url, category, categoryClass, description, author, readingTime, date
    },
    "celebrityPost": *[_type == "celebrityPost"] | order(date desc) {
      _id, title, "image": image.asset->url, category, categoryClass, description, author, readingTime, date
    },
    "mainPost": *[_type == "mainPost"] | order(date desc) {
      _id, title, "image": image.asset->url, category, categoryClass, description, author, readingTime, date
    }
  }`);

  const url = `https://oja7rnse.api.sanity.io/v2023-01-01/data/query/production1?query=${query}`;


  useEffect(() => {
    if (!slug) return;

    fetch(url, {
      headers: {
         Authorization: process.env.NEXT_PUBLIC_API_AUTH,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const {
          mainPost = [],
          sportsPost = [],
          educationPost = [],
          politicsPost = [],
          technologyPost = [],
          healthPost = [],
          celebrityPost = [],
        } = data.result || {};

        const allPosts = [
          ...mainPost,
          ...sportsPost,
          ...educationPost,
          ...politicsPost,
          ...technologyPost,
          ...healthPost,
          ...celebrityPost,
        ];

        const matchedPost = allPosts.find((p) => slugify(p.title) === slug);

        if (!matchedPost) {
          setError('Article not found.');
          setLoading(false);
          return;
        }

        setPost(matchedPost);

        const related = allPosts
          .filter((p) => slugify(p.title) !== slug && p.category === matchedPost.category)
          .slice(0, 6);

        setRelatedPosts(related);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load article.');
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div className="preloader" id="preloader">
    <div className="preloader-inner">
      <div className="spinner">
        <div className="dot1"></div>
        <div className="dot2"></div>
      </div>
    </div>
  </div>;
  if (error) return <p>{error}</p>;
  if (!post) return null;

  return (
    <>
      <Head>
        <title>{post.title}</title>

      </Head>

      <Nav1 />
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{post.title}</h1>

        <div className={styles.meta}>
          <span><i className="fas fa-user" /> {post.author || 'Anonymous'}</span>
          <span><i className="fas fa-calendar" /> {post.date || '--'}</span>
        </div>

        <Image
          src={post.image}
          alt={post.title}
          width={800}
          height={450}
          className={styles.hero}
        />

        <p className={styles.content}>{post.description}</p>

        <p className={styles.author}>Written by {post.author || 'Anonymous'}</p>
        <div className={styles.share}>
          <a href="#"><i className="fab fa-facebook" /></a>
          <a href="#"><i className="fab fa-twitter" /></a>
          <a href="#"><i className="fab fa-whatsapp" /></a>
        </div>
        <h3>Related Posts</h3>
        <div className="row">
          {relatedPosts.map((related) => (
            <div className="col-lg-4 col-md-6 col-12 mb-4" key={related._id}>
              <div
                className="my-related-card p-2"
                onClick={() => router.push(`/detail/${slugify(related.title)}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className="my-related-thumb position-relative">
                  <Image
                    src={related.image || '/assets/img/placeholder.png'}
                    alt={related.title || 'Related Post'}
                    width={400}
                    height={200}
                    className="card-img-top"
                  />
                  <a
                    className={`my-related-tag ${related.categoryClass || 'bg-secondary'}`}
                    href="#"
                  >
                    {related.category || 'General'}
                  </a>
                </div>

                <div className="my-related-details mt-2">
                  <h6 className="my-related-title">
                    <Link href={`/${slugify(related.title)}/detail`} className="text-dark">
                      {related.title}
                    </Link>
                  </h6>
                  <div className="my-related-meta">
                    <ul className="list-unstyled mb-0">
                      <li>
                     <i className="fas fa-clock me-1"></i>


                        {related.date || ''}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>

      <Footer />
    </>
  );

};

export default DetailPage;
