import React from 'react'

function StationInfo({ station_info }) {
  const labels = [
    { label: '車站名稱', value: 'station_name' },
    { label: '車站位址', value: 'address' },
    { label: '詢問處位置', value: 'service_counter' },
    { label: '自行車進出', value: 'enable_bicycle' }
  ]
  console.log('station_info', station_info)
  return (
    <div className="station-info-container">
      <table className="station-info-table">
        <thead>
          <tr>
            <th colSpan="2">車站資訊</th>
          </tr>
        </thead>
        <tbody>
          {
            station_info && labels.map(({label, value}) => (
              <tr>
                <td id={'table-' + value + '-label'}>{label}</td>
                <td id={'table-' + value + '-value'}>{station_info[value]}</td>
              </tr>
            )

            )
            // generate multiple
            //   <tr>
            //     <td></td>
            //     <td></td>
            //   </tr>
            // coding here ...
          }
        </tbody>
      </table>
    </div>
  )
}

export default StationInfo
