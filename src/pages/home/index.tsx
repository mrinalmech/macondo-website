import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { graphql } from 'gatsby';
import { FileSystemNode } from 'gatsby-source-filesystem';
import { IGatsbyImageData } from 'gatsby-plugin-image';

import Page from '../../components/layouts/Page';
import SEO from '../../components/atoms/Seo';

import Hero from '../../pageComponents/home/Hero';
import Features from '../../pageComponents/home/Features';

import { ImageLoadedContext } from '../../contexts/ImageLoadedContext';
import { selectAppLoaded, setAppLoaded } from '../../store/appSlice';
import { RootDispatch } from '../../store/createStore';
import { useSiteMetadata } from '../../hooks/useSiteMetadata';

interface Props {
  data: {
    loadingImgs: {
      nodes: FileSystemNode[];
    };
    ogImg: {
      nodes: {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData;
        };
      }[];
    };
    logoImg: {
      nodes: {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData;
        };
      }[];
    };
    locales: {
      edges: {
        node: {
          ns: string;
          data: string;
          language: string;
        };
      }[];
    };
  };
}

export default function Home({ data }: Props) {
  const dispatch = useDispatch<RootDispatch>();
  const appLoaded = useSelector(selectAppLoaded);

  const imgsToBeLoaded = data.loadingImgs.nodes;
  const loadedImgDictionary = useRef({});

  const imageLoaded = (name: string) => {
    loadedImgDictionary.current = {
      ...loadedImgDictionary.current,
      [name]: true,
    };

    const loadedImgs = Object.keys(loadedImgDictionary.current);

    if (loadedImgs.length >= imgsToBeLoaded.length && appLoaded === false) {
      dispatch(setAppLoaded(true));
    }
  };

  return (
    <ImageLoadedContext.Provider value={imageLoaded}>
      <Page>
        <Hero />
        <Features />
      </Page>
    </ImageLoadedContext.Provider>
  );
}

export const Head = ({ data }: Props) => {
  const { siteUrl } = useSiteMetadata();

  const schemaJSON = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Macondo Games',
    url: 'https://www.macondogames.com',
    description:
      'Macondo Games is a studio located in Goa, India working on their first title, a 2d run and gun shooter Global Steel.',
    email: 'info@macondogames.com',
  } as { [prop: string]: string };

  const logoImg = data.logoImg.nodes[0].childImageSharp.gatsbyImageData;
  const logoImgUrl = logoImg?.images?.fallback?.src;

  if (logoImgUrl) {
    schemaJSON.logo = `${siteUrl}${logoImgUrl}`;
  }

  const ogImg = data.ogImg.nodes[0].childImageSharp.gatsbyImageData;
  const ogImgAlt = 'Side profile of three figures. Game logo on the left side of the image.';

  const dataLanguageNode = data.locales.edges.find(e => e.node.ns === 'index')?.node;

  if (dataLanguageNode) {
    const lang = dataLanguageNode.language;
    const data = JSON.parse(dataLanguageNode.data);

    schemaJSON.description = data['site_meta_desc'];

    const schema = JSON.stringify(schemaJSON);

    return (
      <SEO
        lang={lang}
        description={data['site_meta_desc']}
        ogImg={ogImg}
        ogImgAlt={data['og_img_alt']}
        schema={schema}
      />
    );
  }

  const schema = JSON.stringify(schemaJSON);

  return <SEO schema={schema} ogImg={ogImg} ogImgAlt={ogImgAlt} />;
};

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(
      filter: {
        ns: { in: ["home-hero", "home-features", "header", "footer", "index"] }
        language: { eq: $language }
      }
    ) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    loadingImgs: allFile(filter: { sourceInstanceName: { eq: "loadingHeroImages" } }) {
      nodes {
        name
      }
    }
    ogImg: allFile(filter: { sourceInstanceName: { eq: "homeImages" }, name: { eq: "og" } }) {
      nodes {
        name
        childImageSharp {
          gatsbyImageData(placeholder: NONE, layout: FIXED, width: 1200)
        }
      }
    }
    logoImg: allFile(filter: { sourceInstanceName: { eq: "homeImages" }, name: { eq: "logo" } }) {
      nodes {
        name
        childImageSharp {
          gatsbyImageData(placeholder: NONE)
        }
      }
    }
  }
`;
