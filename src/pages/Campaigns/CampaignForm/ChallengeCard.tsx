import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Typography, Button, Image } from 'antd';
import React, { useEffect, useState } from 'react';

import { IListChallengesOutput } from '../../../services/Challenge.service';
import { getThumb } from '../../../utils/Video.util';
import defaultThumb from '../../Challenges/CardChallenge/default-thumb.svg';

import { StyledChallengeCard } from './styles';

interface IChallengeCardProps {
  readonly challenge: IListChallengesOutput;
  readonly selected?: boolean;
  readonly index: number;
  onPreview: (challenge: IListChallengesOutput) => void;
  onAdd: (challenge: IListChallengesOutput) => void;
  onRemove: (challenge: IListChallengesOutput) => void;
}

export function ChallengeCard({
  index,
  challenge,
  onPreview,
  onAdd,
  onRemove,
  selected,
}: IChallengeCardProps) {
  const [thumb, setThumb] = useState(defaultThumb);

  useEffect(() => {
    async function fetch() {
      const thumb = await getThumb(challenge.media);
      setThumb(thumb);
    }

    fetch();
  }, [challenge.media]);

  const addButton = (
    <Button type='link' onClick={() => onAdd(challenge)}>
      <PlusOutlined /> Adicionar Desafio
    </Button>
  );

  const removeButton = (
    <Button type='link' onClick={() => onRemove(challenge)}>
      <MinusOutlined /> Remover Desafio
    </Button>
  );

  const actions = [selected ? removeButton : addButton];

  return (
    <StyledChallengeCard
      index={index}
      bodyStyle={{ height: 105 }}
      cover={
        <Image
          alt='cover'
          src={thumb}
          height='128px'
          preview={{
            visible: false,
            onVisibleChange: () => onPreview(challenge),
          }}
        />
      }
      style={{ width: '250px' }}
      actions={actions}
    >
      <Typography.Title level={5}>{challenge.title}</Typography.Title>
    </StyledChallengeCard>
  );
}
