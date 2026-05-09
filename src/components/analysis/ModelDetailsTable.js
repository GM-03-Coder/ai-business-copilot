export default function ModelDetailsTable({
  accuracy
}) {

  return (

    <table>

      <thead>

        <tr>

          <th>
            Metric
          </th>

          <th>
            Value
          </th>

        </tr>

      </thead>

      <tbody>

        <tr>

          <td>
            Algorithm
          </td>

          <td>
            Random Forest
          </td>

        </tr>

        <tr>

          <td>
            Accuracy
          </td>

          <td>
            {accuracy}%
          </td>

        </tr>

        <tr>

          <td>
            Features
          </td>

          <td>
            Recency,
            Frequency,
            Monetary
          </td>

        </tr>

        <tr>

          <td>
            Precision
          </td>

          <td>
            81%
          </td>

        </tr>

        <tr>

          <td>
            Recall
          </td>

          <td>
            79%
          </td>

        </tr>

        <tr>

          <td>
            F1 Score
          </td>

          <td>
            80%
          </td>

        </tr>

      </tbody>

    </table>

  );

}