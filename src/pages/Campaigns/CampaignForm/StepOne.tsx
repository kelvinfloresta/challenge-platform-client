import { Form, Drawer, Spin, Tabs } from 'antd';
import _uniqBy from 'lodash/uniqBy';
import React, { useEffect, useMemo, useState } from 'react';

import { useChallengeList } from '../../../hooks/challenge/challenge.hook';
import { IListChallengesOutput } from '../../../services/Challenge.service';

import { ChallengeCard } from './ChallengeCard';
import { ICampaignFormInstance } from './ICampaignForm';
import PreviewChallenge from './PreviewChallenge';
import { Segment } from './Segment';
import { CardList } from './styles';

const { TabPane } = Tabs;

export const StepOne = () => {
  const {
    elements: challenges,
    list: challengesList,
    listLoading: challengesLoading,
  } = useChallengeList();
  const form = Form.useFormInstance<ICampaignFormInstance>();
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const [preview, setPreview] = useState<IListChallengesOutput | null>(null);

  function updateSelected(challengeId: string) {
    setSelected(selected => ({
      ...selected,
      [challengeId]: !selected[challengeId],
    }));
  }

  useEffect(() => {
    form
      .getFieldValue('challenges')
      .forEach((el: any) => updateSelected(el.challengeId));
  }, [form]);

  useEffect(() => {
    const sub = challengesList().subscribe();
    return () => sub.unsubscribe();
  }, [challengesList]);

  const onAdd = ({ id, title }: IListChallengesOutput) => {
    const oldChallenges = form.getFieldValue('challenges');
    const newChallenges = [...oldChallenges, { challengeId: id, title }];
    form.setFieldsValue({ challenges: newChallenges });
    updateSelected(id);
  };

  const onRemove = ({ id }: IListChallengesOutput) => {
    const oldChallenges = form.getFieldValue('challenges');
    const newChallenges = oldChallenges.filter(
      (el: any) => el.challengeId !== id
    );
    form.setFieldsValue({ challenges: newChallenges });
    updateSelected(id);
  };

  const segments = useMemo(
    () => _uniqBy(challenges, 'segment').map(challenge => challenge.segment),
    [challenges]
  );

  return (
    <Spin spinning={challengesLoading}>
      <Tabs>
        {segments.map(segment => (
          <TabPane tab={Segment[segment]} key={segment}>
            <CardList>
              {challenges
                .filter(x => x.segment === segment)
                .map((challenge, i) => (
                  <ChallengeCard
                    key={challenge.id}
                    index={i}
                    challenge={challenge}
                    onPreview={setPreview}
                    onAdd={onAdd}
                    onRemove={onRemove}
                    selected={selected[challenge.id]}
                  />
                ))}
            </CardList>
          </TabPane>
        ))}
      </Tabs>

      <Drawer
        title='Pré-Visualização'
        visible={preview !== null}
        size='large'
        onClose={() => setPreview(null)}
        headerStyle={{
          backgroundColor: '#f0f0ef',
          borderRadius: 0,
          paddingTop: '2rem',
        }}
        bodyStyle={{ backgroundColor: '#f0f0ef' }}
        width='60vw'
      >
        <PreviewChallenge challenge={preview} />
      </Drawer>
    </Spin>
  );
};

export default StepOne;
