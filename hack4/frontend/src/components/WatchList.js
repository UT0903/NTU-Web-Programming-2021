import constants from '../constants';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useState, useEffect, useCallback } from "react";  
import { STATSCOUNT_QUERY, SUBSCRIPTION } from '../graphql';
// Look at this file and see how the watchList is strucutred


export default function WatchList() {
    const { loading, error, previousData, data, subscribeToMore } = useQuery(STATSCOUNT_QUERY, {
        variables: {severity: 1, locationKeywords: constants.watchList},
    });
    // TODO
    // query countStats
    // save the result in a counts variable
    console.log('data', data)
    const counts = data;

    // TODO
    // use subscription
    useEffect(() => {
        try {
          subscribeToMore({
            document: SUBSCRIPTION,
            //variables: {},
            updateQuery: (prev, { subscriptionData }) => {
                console.log(prev, subscriptionData)
              if (!subscriptionData.data) return prev;
              const newData = JSON.parse(JSON.stringify(prev))
              for(let i = 0; i < constants.watchList.length; i++){
                const retPeople = subscriptionData.data.people.filter((person)=>person.location.description.includes(constants.watchList[i]))
                if(retPeople){
                    newData.statsCount[i] = retPeople.length
                } 
              }
              return newData;
            },
          });
        } catch (e) {}
      }, [subscribeToMore]);
    // DO NOT MODIFY BELOW THIS LINE
    return (
        <table>
        <tbody>
            <tr>
                <th>Keyword</th>
                <th>Count</th>
            </tr>
            {
                constants.watchList.map(
                    (keyword, idx) => 
                    <tr key={keyword}>
                        <td>{keyword}</td>
                        {/* You might need to see this */}
                        <td id={`count-${idx}`}>{!counts || ! counts.statsCount || counts.statsCount[idx]}</td>
                    </tr>
                )
            }
        </tbody>
        </table>
    );
}