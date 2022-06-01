import { isValidCPF } from '@brazilian-utils/brazilian-utils';

/* eslint-disable no-template-curly-in-string */
export function validateNumberLen(len: number) {
  return async (_: any, v: string) => {
    if (!v) return;
    if (v.replace(/\D/g, '').length === len) {
      return;
    }

    throw new Error('Preencha completamente ou deixe vazio');
  };
}

export function fixRequiredMaskInput(required: boolean) {
  return async (_: any, v: string) => {
    if (!required) {
      return;
    }

    if (!v) {
      throw new Error("'${name}' is required");
    }

    if (v.replace(/\D/g, '').length === 0) {
      throw new Error("'${name}' is required");
    }
  };
}

export async function validateCPF(_: any, v: string) {
  if (!v) {
    return;
  }

  if (isValidCPF(v)) {
    return;
  }

  throw new Error('CPF inválido');
}
