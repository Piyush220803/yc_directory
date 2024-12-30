import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY =
  defineQuery(`*[_type == "startup" && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search ] | order(_createdAt desc) { 
  _id,
    title,
    slug,
    _createdAt,
    author -> {
      _id, name, bio
    },
    views,
    description,
    category,
    image
}`);

// order(_createdAt desc) the newest one appear on top
// defineQuery() (line 4) search the result by type, title, category, author, and if not found then the results are display in desending order

export const STARTUP_BY_ID_QUERY =
  defineQuery(`*[_type == "startup" && _id == $id][0]{
  _id,
    title,
    slug,
    _createdAt,
    author -> {
      _id, name, username, image, bio
    },
    views,
    description,
    category,
    image,
    pitch,
}`);

// In this STARTUP_BY_ID_QUERY we need all the detail about the startup so we added here pitch , username image etc here.

export const STARTUPS_VIEWS_QUERY =
  defineQuery(`*[_type == "startup" && _id == $id][0]{
  _id, views
  }
`);

export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(`
*[_type == "author" && id == $id][0]{
    _id,
    id,
    name,
    username,
    email,
    image,
    bio
}
  `);

export const AUTHOR_BY_ID_QUERY = defineQuery(`
    *[_type == "author" && _id == $id][0]{
        _id,
        id,
        name,
        username,
        email,
        image,
        bio
    }
    `);

export const STARTUPS_BY_AUTHOR_QUERY =
  defineQuery(`*[_type == "startup" && author.ref == id] | order(_createdAt desc) { 
    _id,
      title,
      slug,
      _createdAt,
      author -> {
        _id, name, bio
      },
      views,
      description,
      category,
      image
  }`);

export const PLAYLIST_BY_SLUG_QUERY =
  defineQuery(`*[_type == "playlist" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  select[]->{
    _id,
    _createdAt,
    title,
    slug,
    author->{
      _id,
      name,
      slug,
      image,
      bio
    },
    views,
    description,
    category,
    image,
    pitch
  }
}`);
