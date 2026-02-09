import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { allData } from "../slices/detailsSlice"
import CommonData from "./CommonData"

const CompletedTask = () => {

    const dispatch = useDispatch()

    const { datas, loading, error } = useSelector(
        (state) => state.details
    )

    useEffect(() => {
        dispatch(allData())
    }, [dispatch])

    const filteredData = datas.filter(
        (d) => d.completed === true
    )

    return (
        <div className="w-full">
            <CommonData
                filteredData={filteredData}
                loading={loading}
                error={error}
                showDelete={true}
            />
        </div>
    )
}

export default CompletedTask
