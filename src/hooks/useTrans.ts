// import useTranslation from 'next-translate/useTranslation';
import { useCallback } from 'react';

function useTrans() {
  // const { t: tran, lang } = useTranslation();
  const tran = useCallback((v) => {
    return v;
  }, []);
  const t = useCallback(
    (namespace?: string | undefined, key?: string | undefined) => {
      let result: string = '';
      if (key) {
        result = tran(`${namespace}:${key}`);
      } else {
        result = tran(`common:${namespace}`);
      }
      if (result === `common:${namespace}`) {
        result = key || namespace || '';
      }
      return result;
    },
    [tran]
  );
  return { t };
}

export default useTrans;
