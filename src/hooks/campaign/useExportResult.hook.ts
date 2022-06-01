import { useMemo } from 'react';

import { campaignService } from '../../services/Campaigns.service';
import { makeUseList } from '../hookMakers/makeUseList.hook';

export interface IChallengeResultCSV {
  readonly Nome: string;
  readonly Departamento: string;
  readonly Tentativas: string;
  readonly Acertou: boolean;
  readonly IMPD: string;
}

const _useExportResult = makeUseList(campaignService.listResults);

export function useExportResult() {
  const state = _useExportResult();

  const data = useMemo(
    () =>
      state.elements.map(r => ({
        Nome: r.userName,
        Departamento: r.departmentName,
        Tentativas: `${r.tries}/3`,
        Acertou: r.correct,
        IMPD: `${r.impd}%`,
      })),
    [state.elements]
  );

  return {
    data,
    download: state.list,
    loading: state.listLoading,
    error: state.listError,
  };
}
