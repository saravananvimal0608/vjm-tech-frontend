import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { allData, } from '../slices/detailsSlice'
import CommonData from './CommonData'

const LaunchPendingTask = () => {
  const dispatch = useDispatch()
  const { datas, loading, error } = useSelector(
    (state) => state.details
  )

  useEffect(() => {
    dispatch(allData())
  }, [dispatch])

  const filteredData = datas.filter((d) => d.launchPending === true)

  return (
    <div className="w-full">
      <CommonData
        filteredData={filteredData}
        loading={loading}
        error={error}
      />
    </div>
  )
}

export default LaunchPendingTask
