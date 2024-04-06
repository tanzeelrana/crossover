import React from 'react';

interface TableColumn {
  header: string;
  accessor: string;
  accessor2?: string;
}

interface TableProps {
  data: any[]; 
  columns: TableColumn[];
  onRowClick?: (row: any) => void;
}

const Table: React.FC<TableProps> = ({ data, columns, onRowClick }) => {
  const getNestedValue = (obj: any, accessor: string, accessor2?: string) => {
    const keys = accessor.split('.');
    let value = obj;
    keys.forEach(key => {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        value = undefined;
      }
    });
    return value;
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-full overflow-hidden overflow-x-scroll">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                onClick={() => onRowClick && onRowClick(row)}
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={`px-6 py-4 whitespace-nowrap text-sm text-center text-grey-500`}
                  >
                    {column.header === 'Author' ? (
                      <div>
                        {getNestedValue(row, column.accessor)}
                          <img
                            className="ml-2 inline-block h-10 w-10 rounded-full ring-2 ring-white"
                            src={getNestedValue(row, column.accessor2!)}
                            alt="Author"
                          />
                      </div>
                    ) : (
                      getNestedValue(row, column.accessor)
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
