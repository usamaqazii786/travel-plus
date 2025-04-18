import PageMetaData from '@/components/PageMetaData';
import { getAllCustomers } from '@/helpers/data';
import AllDataTables from './components/AllDataTables';
import { useEffect, useState } from 'react';
const DataTables = () => {
  const [customers, setCustomers] = useState();
  useEffect(() => {
    ;
    (async () => {
      const data = await getAllCustomers();
      setCustomers(data);
    })();
  }, []);
  return <>
      <PageMetaData title="Data Tables" />
      {customers && <AllDataTables customers={customers} />}
    </>;
};
export default DataTables;