import { getHistoryTableData } from '@/lib/stats'
import React from 'react'
import { useSelector } from 'react-redux';
import OverallStats from './OverallStats';
import Table from './DataTable';

export default function History() {
  const {history} = useSelector(state => state.history);
  const data = getHistoryTableData(history)
  
  return (
    <div className='w-full flex flex-col gap-4'>
      <OverallStats data={data} />
      <Table data={data} />
    </div>
  )
}
