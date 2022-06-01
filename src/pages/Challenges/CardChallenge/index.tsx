import { PlayCircleOutlined } from '@ant-design/icons';
import { Card as AntdCard } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { to } from '../../../utils/Async.util';

import defaultThumb from './default-thumb.svg';
import { CardContainer, Content, ChallengeThumb } from './styles';

interface ICard {
  readonly title?: string;
  readonly loading?: boolean;
  readonly subtitle?: string;
  readonly mediaUrl: string;
  readonly onClick?: () => void;
}

const { Meta } = AntdCard;

const CardChallenge: React.FC<ICard> = ({
  title,
  subtitle,
  mediaUrl,
  onClick,
  loading,
}) => {
  const [thumb, setThumb] = useState('');

  useEffect(() => {
    async function getThumb() {
      const id = mediaUrl.substring(mediaUrl.lastIndexOf('/') + 1);
      const url = `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${id}`;
      const [error, response] = await to(axios.get(url));
      if (error) {
        return setThumb(defaultThumb);
      }
      setThumb(response.data.thumbnail_url);
    }
    getThumb();
  }, [mediaUrl]);

  return (
    <CardContainer onClick={onClick}>
      <AntdCard
        loading={loading}
        cover={<ChallengeThumb alt={title} src={thumb} />}
        actions={[
          <div>
            <PlayCircleOutlined /> Assitir
          </div>,
        ]}
      >
        <Content>
          <Meta title={title} description={subtitle} />
        </Content>
      </AntdCard>
    </CardContainer>
  );
};

export default CardChallenge;
