import axios from 'axios';

import defaultThumb from '../pages/Challenges/CardChallenge/default-thumb.svg';

import { to } from './Async.util';

export async function getThumb(mediaUrl: string): Promise<string> {
  const id = mediaUrl.substring(mediaUrl.lastIndexOf('/') + 1);
  const url = `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${id}`;
  const [error, response] = await to(axios.get(url));
  if (error) {
    return defaultThumb;
  }

  if (!response.data.thumbnail_url) {
    await new Promise(resolve => {
      setTimeout(resolve, 1000);
    });

    return getThumb(mediaUrl);
  }

  return response.data.thumbnail_url;
}
