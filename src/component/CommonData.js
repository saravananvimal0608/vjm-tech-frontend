import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteDetails, fetchDetails } from '../slices/detailsSlice'
import { toast } from 'react-toastify'

const CommonData = ({ filteredData, loading, error, showDelete = false }) => {

  const dispatch = useDispatch()

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteDetails(id)).unwrap()
      toast.success("Deleted Successfully")
    } catch (err) {
      toast.error("Delete Failed")
    }
  }

  console.log(filteredData);

  return (
    <div>
      <div className="admin-stats-centered">
        <div className="premium-stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <h3>Total Tasks</h3>
            <p>{filteredData?.length || 0}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error">{error.message}</p>}

        {filteredData.length === 0 && !loading ? (
          <p className="loading title-color">No data found</p>
        ) : (
          filteredData.map((item) => (
            <div className="data-card" key={item?._id}>
              <p>
                <b>Link:</b>{" "}
                <a
                  href={item?.link?.startsWith("http") ? item?.link : `https://${item?.link}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {item?.link || "No Link"}
                </a>
              </p>

              <p>
                <b>Entry Date:</b>{" "}
                {item?.date
                  ? new Date(item.date).toLocaleDateString("en-GB")
                  : "No Date"}
              </p>

              <p>
                <b>Client Assigned Date:</b>{" "}
                {item?.assignedDate
                  ? new Date(item.assignedDate).toLocaleDateString("en-GB")
                  : "----"}
              </p>

              <p>
                <b>Client ph : </b>
                {item?.clientPhNo ? item?.clientPhNo : "-----"}
              </p>

              <p>
                <b>Developer : </b>
                {item?.userId?.name}
              </p>

              <p>
                <b>Task Size : </b>
                {item?.taskSize ? item?.taskSize : '-----'}
              </p>

              <p>
                <b>Received In : </b>
                {item?.receivedIn ? item?.receivedIn : '-----'}
              </p>

              <p>
                <b>Task Status : </b>
                {item?.completed
                  ? "Completed"
                  : item?.launchPending
                    ? "Launch Pending"
                    : "Pending"}
              </p>

              {showDelete && (
                <button
                  onClick={() => handleDelete(item._id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              )}

            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default CommonData
